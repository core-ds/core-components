---
description: Public API compatibility and breaking-change checklist for core-components — read from SKILL.md step 4
---

# Public API и breaking changes

Компонент в `packages/<name>` — это публичный контракт: его props, типы и экспорты используются множеством потребителей библиотеки вне этого репозитория. Оценивай изменение не по тому, компилируется ли код, а по тому, ломает ли оно код существующих потребителей.

## Что считается breaking change

Смотри на `typings.ts` изменённого компонента (и на публичные `index.ts`-экспорты пакета) и проверяй:

- **удаление prop** — потребитель, передававший его, получит TS-ошибку или проп молча перестанет действовать;
- **переименование prop** — эквивалентно удалению + добавлению нового;
- **сужение union-типа** (например, удаление одного из вариантов `view?: 'a' | 'b' | 'c'`) — ломает потребителей, использовавших удалённый вариант;
- **изменение типа prop** на несовместимый (например, `string` → `string[]`, `(value: string) => void` → `(value: string, meta: Meta) => void`);
- **смена `default value`** — при том же коде потребителя рендер/поведение изменится без его ведома;
- **prop стал обязательным** (`prop?:` → `prop:`) — ломает всех, кто его не передавал;
- **изменение поведения существующего prop** без изменения его типа (тип совпадает, но семантика другая) — самый незаметный вид breaking change, типизация его не ловит;
- **удаление/переименование экспортируемого компонента или типа** из `index.ts` пакета;
- **изменение CSS class name или DOM-структуры**, если они задокументированы как часть публичного контракта (а не приватная деталь реализации).

Аддитивные изменения — новый **опциональный** prop, новый вариант union-типа, новый именованный экспорт при сохранении старого — не breaking.

## Правило changeset

- Changeset (`.changeset/*.md`) обязателен для PR, меняющих публикуемый код пакета (`packages/<name>/src/**`, кроме `*.stories.tsx`/`*.mdx`). Не нужен для PR, которые трогают только Storybook-документацию или служебные скрипты/тулинг репозитория — они не влияют на опубликованные версии пакетов.
- Тип bump должен соответствовать характеру изменения:
  - **major** — для любого breaking change из списка выше;
  - **minor** — для аддитивных изменений публичного API (новый prop, новый экспорт);
  - **patch** — для bugfix без изменения контракта, для "мягкого" deprecation (см. ниже), для чисто внутреннего рефакторинга.
- **Major changeset обязан содержать инструкцию миграции** — не просто "breaking change в Button", а конкретное "используйте `view='outlined'` вместо `view='tertiary'`". Changeset без миграционной инструкции при breaking change — сам по себе finding (P2: авторам будущих апдейтов будет сложнее мигрировать).
- Breaking change **без changeset вообще**, либо с changeset неверного типа (например, `patch` при фактическом removal) — P1: это будет означать, что потребители не получат корректный major-бамп версии и словят breaking change как обычный minor/patch апдейт.

## Мягкий deprecation ≠ breaking removal

Проект различает два разных действия, и путать их — источник ложных findings:

1. **Пометка API как deprecated** (JSDoc `@deprecated` в комментарии, без изменения рантайм-поведения) — не breaking change, поведение для существующих потребителей не меняется, обычно оформляется `patch` changeset'ом. Это нормальный, не блокирующий шаг перед будущим removal.
2. **Фактическое удаление/сужение API** — breaking change, требует `major` changeset и миграционной инструкции (см. выше).

Не отмечай finding'ом сам факт появления `@deprecated` в JSDoc — это не проблема, а ожидаемая практика проекта. Finding уместен, только если deprecated API удаляется без `major` bump, либо если `@deprecated`-пометка не сопровождается пояснением, чем заменить.

## Реальные примеры из истории проекта

### Breaking removal (major) — `fix(button): delete deprecated view=tertiary` (`76e56e25d`)

```diff
// packages/button/src/typings.ts
- view?: 'accent' | 'primary' | 'secondary' | 'outlined' | 'transparent' | 'text' | 'tertiary';
+ view?: 'accent' | 'primary' | 'secondary' | 'outlined' | 'transparent' | 'text';
```

Сопровождается `.changeset/shiny-adults-cover.md`:

```markdown
---
'@alfalab/core-components-button': major
'@alfalab/core-components': major
---

##### Button

- Удален `view='tertiary'` у компонента `Button`, используйте `view='outlined'`.
```

Это эталон: сужение union-типа → `major` bump на пакет и на корневой `@alfalab/core-components` → миграционная инструкция прямо в changeset.

### Мягкий deprecation (patch) — `fix(shared): getColorVar is deprecated` (`c92eb6932`)

```diff
// packages/shared/src/get-color-var/get-color-var.ts
  * - HEX: #444fff
+ *
+ * @deprecated Используйте getColorVar из ds-helpers
  */
 export const getColorVar = ({
```

Сопровождается `.changeset/little-boats-spend.md` с bump `patch` — поведение функции не изменилось, только помечена как deprecated с указанием замены. Никакого breaking change здесь нет, несмотря на слово "deprecated" в сообщении коммита.

## Проверочный чек-лист (severity)

| Ситуация | Severity |
|---|---|
| Prop удалён/переименован/union сужен/стал обязательным без `major` changeset | **P1** |
| Изменено поведение существующего prop при неизменном типе, без changeset/упоминания в PR | **P1** |
| `major` changeset есть, но без миграционной инструкции | **P2** |
| Новый обязательный prop добавлен к существующему компоненту | **P1** (breaking для всех текущих использований) |
| PR меняет `packages/*/src` без changeset вообще | **P1**, если меняет поведение/API; **P2**, если только внутренний рефакторинг без внешнего эффекта |
| `@deprecated` в JSDoc без изменения поведения, есть `patch` changeset | не finding |
| Аддитивный prop/экспорт с `minor` changeset | не finding |
