# Code Review: feat/HELLOKITTY-1563

**Diff:** `origin/master...origin/feat/HELLOKITTY-1563` (merge-base `c6b74d8e3`)
**Пакеты:** `@alfalab/core-components-icon-view` (minor), `@alfalab/core-components-file-upload-item` (patch)
**Intent:** добавление fallback-обработки "битого" (нерендерящегося/недекодируемого) изображения — новый колбэк `onImageBrokenChange` в `BaseShape`/`SuperEllipse` (icon-view) и fallback-иконка `DocumentImageOff` в `FileUploadItem` при битом `imageUrl`.

## Summary

APPROVE (с некритичными замечаниями)

Найдено 3 замечания, все не блокирующие merge (P2), но стоит учесть перед мерджем:
- 2 P2 (код)
- 1 P2 (состояние ветки относительно master)

## Findings

### P2 — Новый публичный колбэк `onImageBrokenChange` в зависимостях эффекта может вызвать бесконечный цикл ре-рендера/повторной загрузки изображения

`packages/icon-view/src/components/base-shape/use-check-image-is-broken.ts:11-30`

```ts
useEffect(() => {
    let isActive = true;
    setIsBrokenImage(false);
    onImageBrokenChange?.(false);
    if (!imageUrl) { ... }
    checkImageIsBroken({ imageUrl, onResolve: (isBroken) => {
        if (!isActive) return;
        setIsBrokenImage(isBroken);
        onImageBrokenChange?.(isBroken);
    }});
    ...
}, [imageUrl, onImageBrokenChange]);
```

**Почему это проблема:** `onImageBrokenChange` — новый публичный проп `BaseShape`/`SuperEllipse` и одновременно элемент массива зависимостей эффекта. Если потребитель библиотеки передаёт не мемоизированную функцию (инлайн-стрелку, замыкание, пересоздаваемое на каждом рендере — обычный паттерн, например `onImageBrokenChange={(broken) => { setBroken(broken); doSomethingElse(); }}`), то при первом успешном срабатывании `onResolve` эффект вызывает `onImageBrokenChange(isBroken)` → родитель обновляет своё состояние → ре-рендерится → создаёт новую ссылку на колбэк → зависимость эффекта меняется → эффект перезапускается → заново сбрасывает состояние в `false` и вызывает колбэк снова → новый ре-рендер родителя → новая ссылка → и так по кругу.

В самом PR (`file-upload-item/src/components/status-control/index.tsx`) проблема не проявляется, т.к. туда передаётся стабильный `setIsBrokenImage` из `useState` напрямую — но это защищает только внутреннего потребителя, а не внешних пользователей `icon-view` как независимого пакета.

**Влияние:** для внешнего потребителя с типичным неоптимизированным колбэком — бесконечный ре-рендер и постоянная повторная загрузка/декодирование одного и того же изображения (лишний трафик, нагрузка на CPU, потенциальное "зависание" вкладки).

**Рекомендация:** не включать `onImageBrokenChange` в зависимости эффекта напрямую — хранить актуальную ссылку в `ref` (обновляемом в отдельном эффекте/при каждом рендере без ре-триггера) и вызывать через него, либо явно задокументировать требование передавать мемоизированный колбэк. Стоит также рассмотреть добавление unit-теста на этот сценарий (сейчас `use-check-image-is-broken.test.ts` мокает колбэк как стабильный `jest.fn()` и не проверяет случай меняющейся ссылки).

**Confidence:** high

---

### P2 — Приоритет fallback-иконки битого изображения над `showRestore` не покрыт тестами и может быть неочевидным поведением

`packages/file-upload-item/src/components/status-control/extension-icon/index.tsx:56-65`

```tsx
if (imageUrl && !isBrokenImage) {
    return null;
}

if (imageUrl && isBrokenImage && !CustomIcon) {
    return <DocumentImageOffMIcon />;
}

if (CustomIcon) {
    return <CustomIcon />;
}

if (isInitialStatus(uploadStatus)) {
    return <PaperclipMIcon />;
}

if (showRestore) {
    return <DocumentOffMIcon />;
}
```

**Почему это проблема:** до PR ветка `showRestore` вообще не могла столкнуться с `imageUrl`-веткой (`if (imageUrl) return null` стояло безусловно первым). Теперь при одновременном `imageUrl` (битый) + `showRestore=true` + без `customIcon` новая проверка `imageUrl && isBrokenImage && !CustomIcon` срабатывает раньше проверки `showRestore` — компонент покажет иконку "битого изображения" (`DocumentImageOffMIcon`), а не иконку "требуется восстановление" (`DocumentOffMIcon`). Это новая комбинация состояний (`showRestore` + broken image), которую до этого PR нельзя было получить, и она не описана ни в PR, ни в changeset, ни в тестах.

**Влияние:** если `showRestore` семантически важнее для пользователя (например, файл нужно перезагрузить), новая приоритизация может скрыть эту подсказку в пользу менее актуальной иконки "картинка не загрузилась". Возможно, поведение и является желаемым — но это не подтверждено явно.

**Рекомендация:** явно проверить у автора/дизайнера, какой приоритет должен быть у этой комбинации состояний, и добавить тест-кейс для неё в `extension-icon/index.test.tsx` (сейчас там только 3 кейса: valid image, broken image без showRestore/CustomIcon приоритета, broken image + CustomIcon).

**Confidence:** medium

---

### P2 — Ветка отстала от `master` на 85 коммитов, включая два коммита, менявших этот же файл

`packages/file-upload-item/src/components/status-control/extension-icon/index.tsx`

**Почему это проблема:** point дивергенции ветки (merge-base `c6b74d8e3`) на 85 коммитов раньше текущего `master`. Среди коммитов, попавших в `master` уже после дивергенции, два напрямую меняют тот же файл `extension-icon/index.tsx`, в который HELLOKITTY-1563 вносит правки:
- `206c63f30` — добавил обработку `zip`/`rar`/`7z` → `DocumentArchiveMIcon` (в diff HELLOKITTY-1563 этой ветки switch/case вообще нет — на момент дивергенции её ещё не было);
- `41bcea683` (`fix(file-upload-item): fixed the display of empty`, #2342) — заменил `useContext(FileUploadItemContext)` на `useFileUploadItemContext()` и добавил `// eslint-disable-next-line complexity` к этой же функции.

Обе стороны (master и HELLOKITTY-1563) меняют одну и ту же деструктуризацию из контекста и тело `ExtensionIcon` — при мердже/ребейзе это почти наверняка даст конфликт именно в затронутых PR строках, а не смёрджится автоматически "по-тихому". Риск в первую очередь не "автоматическая потеря кода", а то, что при разрешении конфликта человеком легко упустить одну из веток изменений (например, забыть про `zip/rar/7z`-case или про `useFileUploadItemContext`), и это не будет заметно в diff самого PR до ребейза.

**Влияние:** при мердже без ребейза/актуализации ветки — риск потери поддержки иконки архивов (`zip/rar/7z`) или отката на прямой `useContext` вместо `useFileUploadItemContext` в этом компоненте.

**Рекомендация:** перед мерджем ребейзнуть/смёрджить `master` в ветку и убедиться, что итоговая версия `extension-icon/index.tsx` содержит одновременно: логику `isBrokenImage`/`DocumentImageOffMIcon` из этого PR, `zip/rar/7z`-case и `useFileUploadItemContext()` из master.

**Confidence:** high

## Positive observations

- Новая логика в `icon-view` хорошо декомпозирована: чистая функция `checkImageIsBroken` (side-effect-обёртка над `Image`/`createImageBitmap`/`decode()`) отделена от React-хука `useCheckImageIsBroken`, обе части покрыты отдельными unit-тестами, включая явную проверку stale-результата при смене `imageUrl` во время в процессе проверки (`use-check-image-is-broken.test.ts`, кейс "should ignore stale check result after image change").
- `checkImageIsBroken` корректно предусматривает и happy path (`createImageBitmap`), и fallback (`decode()`), и явную ошибку загрузки (`onerror`) — три независимых теста на каждый путь.
- Changeset оформлен корректно: правильные npm-имена пакетов, `minor` для аддитивного пропа в `icon-view`, `patch` для `file-upload-item` (без изменения публичного контракта), текст на русском языке.
- Новый проп `isBrokenImage`/`setIsBrokenImage` добавлен в контекст с корректными default-значениями, согласованными с остальными полями `TFileUploadItemContext`.
- `new Image()`/`createImageBitmap` вызываются только внутри `useEffect`, что безопасно для SSR (эффекты не выполняются при `renderToString`).
