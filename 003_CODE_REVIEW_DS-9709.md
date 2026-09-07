# Code Review: feat/DS-9709 (AccountSelect)

Ветка добавляет новый компонент `@alfalab/core-components-account-select` — поле выбора счёта/карты с возможностью добавления новой карты (номер + срок действия + CVC) прямо внутри `Select`.

Ревью выполнено скиллом `core-components-code-review`, диапазон `master...feat/DS-9709` (39 изменённых файлов, из них по существу — новый пакет `packages/account-select`).

## Summary

**REQUEST_CHANGES**

Найдено 4 замечания:
- 2 P1
- 1 P2
- 1 P3

## Findings

### P1 — Поля ввода новой карты скрыты от screen reader через `aria-hidden`, оставаясь в таб-порядке

`packages/account-select/src/components/multi-step-card-input/index.tsx:304-309`

```tsx
<div
    className={styles.multistepCardInputWrapper}
    aria-hidden='true'
    onBlur={handleWrapperBlur}
    onClick={handleClick}
>
    <div className={styles.inputs}>
        <input ref={numberRefCallback} ... />
        {needExpiryDate && <input ref={expiryRefCallback} ... tabIndex={isCardNumberValid ? 0 : -1} ... />}
        {needCVC && <input ref={cvvRefCallback} ... tabIndex={isCardNumberValid ? 0 : -1} ... />}
    </div>
</div>
```

**Почему это проблема:** контейнер, оборачивающий три реальных `<input>` для номера карты/срока действия/CVC, помечен `aria-hidden='true'`. Это исключает все три поля из accessibility-дерева — скринридер не объявит их и не прочитает `placeholder`/значение. При этом сами инпуты остаются фокусируемыми мышью и табом (у `expiryInput`/`cvvInput` явно выставлен `tabIndex={0}` при валидном номере карты, `numberRef` фокусируется программно через `numberRef.current?.focus()` в нескольких эффектах). В результате получаются классические "фантомные" элементы: фокус в них попадает, но ассистивные технологии их не видят и не объявляют — стандартное нарушение WCAG 4.1.2 (aria-hidden-focus).

**Влияние:** пользователь скринридера, выбравший пункт "Добавить карту" (единственный сценарий, ради которого добавлен `cardAddingProps`), не может воспользоваться вводом данных карты — поля для него как будто не существуют, при этом фокус клавиатурой всё равно туда проваливается, что дезориентирует навигацию.

**Рекомендация:** убрать `aria-hidden='true'` с обёртки; если требуется скрыть какой-то декоративный элемент — вешать `aria-hidden` точечно на него, а не на контейнер с реальными полями ввода. Дополнительно (см. следующий finding) — обеспечить полям доступное имя.

**Confidence:** high

---

### P1 — `validateCardNumber` требует ровно 16 цифр, но `CARD_MASK` форматирует 19-значные карты — ввод карт UnionPay/Maestro невозможно завершить

`packages/account-select/src/utils/validate/index.ts:3-7`, `packages/account-select/src/constants.ts:24-81`

```ts
// constants.ts — маска явно поддерживает 19-значные карты
if (/^62/.test(digits) /* UnionPay */ || /^(5[06-9]|6)/.test(digits) /* Maestro */) {
    return [/* 19 позиций под цифры */];
}

// validate/index.ts — валидация жёстко требует 16 цифр
export const validateCardNumber = (value: string): boolean => {
    const digits = value.replace(/\s/g, '');
    return digits.length === 16 && isNumericString(digits);
};
```

Это подтверждается и собственным тестом компонента (`packages/account-select/src/utils/validate/index.test.ts:14-17`):
```ts
it('should return false for card number longer than 16 digits', () => {
    expect(validateCardNumber('12345678901234567')).toBe(false);
    expect(validateCardNumber('123456789012345678')).toBe(false);
});
```

**Почему это проблема:** `CARD_MASK` в `constants.ts` явно распознаёт номера, начинающиеся с `62` (UnionPay) и с `5[06-9]`/`6` (Maestro), и форматирует их как 19-значные (маска на 19 позиций). Но `validateCardNumber`, используемый и в `submitIfComplete` (`multi-step-card-input/index.tsx:145`), и в `getValidationErrors` (`useValidationError.ts:18`), безусловно требует ровно 16 цифр. Любая реальная 19-значная карта этих платёжных систем при полном вводе всегда провалит `validateCardNumber` → `isCardValid` всегда `false` → `submitIfComplete` всегда переводит на `setStep(1)` и никогда не вызовет `onSubmit`.

**Влияние:** основной сценарий компонента ("добавление новой карты") принципиально не работает для карт UnionPay и части Maestro/6xx-карт — пользователь не может завершить ввод, форма всегда возвращает на первый шаг с ошибкой "Номер карты введён неверно", независимо от корректности введённых данных.

**Рекомендация:** привести `validateCardNumber` в соответствие с `CARD_MASK` — учитывать длину 19 цифр для тех же BIN-диапазонов (либо, если 19-значные карты сознательно не поддерживаются, убрать соответствующую ветку из `CARD_MASK`, чтобы UI не позволял ввести то, что заведомо не пройдёт валидацию).

**Confidence:** high

---

### P2 — Проп `client` не влияет на первый (в т.ч. серверный) рендер `AccountSelectResponsive` для значения `'mobile'`

`packages/account-select/src/Component.responsive.tsx:9-19`

```tsx
export const AccountSelectResponsive = forwardRef<HTMLInputElement, AccountSelectResponsiveProps>(
    ({ breakpoint, client, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(breakpoint);

        if (isDesktop || client === 'desktop') {
            return <AccountSelectDesktop ref={ref} {...restProps} />;
        }

        return <AccountSelectMobile ref={ref} {...restProps} />;
    },
);
```

**Почему это проблема:** JSDoc у `client` (`types.ts:74-77`) прямо говорит: "Версия, которая будет использоваться при серверном рендеринге" — то есть проп существует специально для управления первым/серверным рендером. Но `client` не передаётся вторым аргументом в `useIsDesktop` (сравни с эталонным паттерном в `Button.responsive`/`Select.responsive`, `references/platform-and-performance.md`: `useIsDesktop(breakpoint, defaultMatchMediaValue)`, где `defaultMatchMediaValue` вычисляется из `client`). Внутри `useIsDesktop` при отсутствии второго аргумента `client` берётся из `CoreConfigContext`, дефолт которого — `'desktop'` (`packages/config/src/CoreConfigContext.ts:9-12`). В итоге `isDesktop` на первом рендере равен `true` по умолчанию независимо от переданного в `AccountSelectResponsive` пропа `client`, а условие `if (isDesktop || client === 'desktop')` может только дополнительно форсировать desktop, но никогда не форсирует mobile — значение `client='mobile'` нигде не проверяется и полностью игнорируется.

**Влияние:** потребитель, который в SSR-контексте (например, по User-Agent) явно передал `client='mobile'`, чтобы получить корректную мобильную разметку на сервере, всё равно получит десктопную версию при первом рендере — ровно то поведение, для предотвращения которого проп документирован. После монтирования `useMatchMedia` скорректирует состояние по реальному viewport, что даст лишний ре-рендер/визуальный скачок на мобильных клиентах.

**Рекомендация:** передавать `client` в `useIsDesktop` как `defaultValue`, по аналогии с `Button`/`Select`: `useIsDesktop(breakpoint, client === undefined ? undefined : client === 'desktop')`.

**Confidence:** high

---

### P3 — Публично экспортируемый `AccountSelectProps` не включает `breakpoint`/`client`, в отличие от конвенции проекта

`packages/account-select/src/index.ts:1-2`, `packages/account-select/src/types.ts:56-78`

```ts
// index.ts — наружу уходит только AccountSelectProps
export { AccountSelectResponsive as AccountSelect } from './Component.responsive';
export type { AccountSelectProps } from './types';

// types.ts — breakpoint/client есть только в AccountSelectResponsiveProps, который не экспортируется
export interface AccountSelectResponsiveProps extends AccountSelectProps {
    breakpoint?: number;
    client?: 'desktop' | 'mobile';
}
```

**Почему это проблема:** в аналогичных компонентах (`packages/button/src/typings.ts`, `packages/select/src/typings.ts`) единственный экспортируемый тип (`ButtonProps`/`SelectProps`) уже включает `breakpoint`/`client`, так как именно он используется потребителями как публичный контракт responsive-компонента. В `account-select` эти поля вынесены в отдельный `AccountSelectResponsiveProps`, который не экспортируется из пакета — потребитель, использующий `AccountSelectProps` для типизации (например, в обёртке или `Pick`/`Omit`), не увидит `breakpoint`/`client` в типе, хотя рантайм-компонент их поддерживает.

**Влияние:** несогласованность с публичным контрактом остальных компонентов библиотеки; не ломает JSX-использование напрямую (TS проверяет пропсы по фактическому типу `forwardRef`, а не по имени экспорта), но мешает типизации на стороне потребителя.

**Рекомендация:** экспортировать `AccountSelectResponsiveProps` как основной публичный тип (или переименовать/объединить с `AccountSelectProps`), как это сделано в `button`/`select`.

**Confidence:** medium

## Positive observations

- Changeset оформлен по спецправилу для нового компонента: `major` bump, версия пакета `0.0.0`, в тексте есть фраза "новый компонент AccountSelect".
- Все три `index.module.css` пакета корректно импортируют `@alfalab/core-components-vars/src/index.css`.
- Хорошее unit-покрытие утилит (`validate`, `parse-date`, `formaters`) и сценариев desktop-версии (переключение шагов, сохранение состояния полей при клике на шеврон).
- Новый пакет корректно зарегистрирован в `tsconfig.react-docgen-typescript.json`, `tsconfig.test.json`, `.vscode/settings.json`.
