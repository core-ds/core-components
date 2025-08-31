---
'@alfalab/core-components-input': major
'@alfalab/core-components-input-autocomplete': major
'@alfalab/core-components-international-phone-input': major
'@alfalab/core-components-select': major
'@alfalab/core-components-themes': major
---

- Переработана логика отображения иконки ошибки. Ранее отображалась только для темы `site` в `core-components-input` и использующих его компонентах.<br><br>
    Теперь эту иконку можно отобразить с помощью пропса `showErrorIcon | @default=false` (отобразится при условии нахождения компонента в статусе ошибки).
    <br><br>
- Удалена логика, при которой иконка ошибки не отображалась если рядом с ней находилась другая иконка аддона.
- В компоненте `Select` для `Field`, который используется по умолчанию, в `rightAddon` добавлены иконки `error` и `success`

#### Миграция

Если вы не использовали тему `site` - вам ничего делать не нужно, иконка по умолчанию останется скрытой.

Для темы `site` выпущен [`codemod`](https://www.npmjs.com/package/@alfalab/core-components-codemod/v/2.8.0).

```bash
npx @alfalab/core-components-codemod --transformers=49-input-show-error-icon --glob='src/**/*.tsx'
```

| Внимание                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `codemod` может не работать в случаях использования [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) в коде. |

| Список компонетов попадающих под трансформацию |
| ---------------------------------------------- |
| Input                                          |
| PasswordInput                                  |
| InternationalPhoneInput                        |
| InternationalPhoneInputDesktop                 |
| InternationalPhoneInputMobile                  |
| MaskedInput                                    |
| NumberInput                                    |
| NumberInputDesktop                             |
| NumberInputMobile                              |
| PhoneInput                                     |
| SliderInput                                    |
| UniversalDateInput                             |
| UniversalDateInputDesktop                      |
| UniversalDateInputMobile                       |
| InputAutocomplete                              |
| InputAutocompleteDesktop                       |
| InputAutocompleteMobile                        |
| InputAutocompleteModalMobile                   |
| Select                                         |
| SelectDesktop                                  |
| SelectMobile                                   |
| SelectModalMobile                              |
