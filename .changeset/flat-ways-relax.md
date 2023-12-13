---
'@alfalab/core-components-universal-date-input': major
---

- Переименованы свойства. onChange стал называться onInputChange, onComplete стал называться onChange
- Изменены типы свойств value и onChange.
- Исправлена ошибка из-за которой onChange не вызывался в момент очистки инпута

## Миграция с предыдущей версии

- Меняем onChange на onInputChange. (но от использования onInputChange лучше отказаться, если не нужно посимвольно контролировать пользовательский ввод).
- Меняем onComplete на onChange. (Это основной обработчик. Вызывается в момент, когда дата введена полностью, либо полностью стерта. Первый аргумент - дата(или диапазон дат), второй - значение инпута).
- value теперь принимает дату(диапазон дат в случае view=data-range), а не строку как раньше.

Примеры всегда можно посмотреть в [сторибуке](https://core-ds.github.io/core-components/master/?path=/docs/universaldateinput--docs)
