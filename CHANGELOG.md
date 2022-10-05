## 33.0.0
<time>30.09.2022</time>

### Мажорные изменения

`vars`

- [#282](https://github.com/core-ds/core-components/pull/282):<br/>
  Обновление vars из последней версии ui-primitives, удалены deprecated цвета и типографика.

  Удалённые миксины с текстовыми стилями были помечены как deprecated более двух лет назад и в макетах давно не используются.

  Основное изменение, про которое нужно знать — удалены текстовые transparent цвета.
  При обновлении достаточно убрать `-transparent` из названий:
  `--color-light-text-secondary-transparent` → `--color-light-text-secondary`

### Патчи

`amount-input` `amount` `attach` `button` `calendar-input`<br/>
`calendar` `checkbox-group` `checkbox` `date-input` `date-range-input`<br/>
`date-time-input` `filter-tag` `form-control` `themes`

- [#282](https://github.com/core-ds/core-components/pull/282):<br/>
  Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики.

## 32.2.0
<time>29.09.2022</time>

### Минорные изменения

`bank-card`

- [#208](https://github.com/core-ds/core-components/pull/208):<br/>
  - Обновлён лого в BankCard.
  - Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag).

`confirmation` `themes`

- [#233](https://github.com/core-ds/core-components/pull/233):<br/>
  - Добавлены новые компоненты ConfirmationMobile, ConfirmationResponsive.
  - Обновлены стили компонента для соответствия актуальным макетам.
