import { type ComputeTitleMargin } from '@alfalab/core-components-navigation-bar-private';

/** Фиксированная ширина одного control-элемента (closer/back button), см. их CSS. */
const CONTROL_WIDTH = 48;

/**
 * Компенсирует смещение заголовка шапки, когда левый блок (кнопка "назад" +
 * leftAddons) и правый блок (rightAddons + closer) не симметричны по ширине.
 *
 * - `contentMargin` — отступ у самого заголовка, по разнице реальных ширин
 *   блоков;
 * - `mainLineMargin` — фиксированный отступ 48px у всей строки шапки
 *   целиком, для случаев, где одной компенсации заголовка недостаточно.
 *
 * ## Заголовок по центру (`align === 'center'`)
 *
 * `contentMargin` не меняется. Асимметрию поправляет только сдвиг всей
 * строки — если есть только "назад" ИЛИ только closer (не оба и не ни
 * одного), строка сдвигается на 48px в сторону отсутствующего элемента.
 * Аддоны на этот расчёт не влияют.
 *
 * | back | closer | mainLineMargin      |
 * |:----:|:------:|:--------------------|
 * |  ✓   |   ✓    | —                    |
 * |  ✓   |   –    | `right: 48`          |
 * |  –   |   ✓    | `left: 48`           |
 * |  –   |   –    | —                    |
 *
 * ## Заголовок слева (`align === 'left'`)
 *
 * Базовый расчёт: `contentMargin = |rightAddonsWidth - leftAddonsWidth|`,
 * добавляется с более лёгкой стороны. Плюс два частных случая:
 *
 * 1. **Один control-элемент, аддоны с обеих сторон.** contentMargin не
 *    нужен (аддоны уже уравновешивают друг друга), лишний control
 *    компенсируется сдвигом всей строки на 48px — как в `align='center'`.
 *
 * 2. **Один control-элемент, аддон только на противоположной стороне.**
 *    К базовой разнице доплюсовывается `CONTROL_WIDTH` (реальная фиксированная
 *    ширина closer/back, см. их CSS) — а не ширина аддона. Отсюда инвариант:
 *    раз `.addon` имеет `min-width: 48px`, итоговый contentMargin здесь всегда
 *    равен реальной ширине одинокого аддона целиком, какой бы она ни была.
 *    Сдвиг заголовка и сдвиг строки применяются одновременно.
 *
 * Полная матрица по 16 комбинациям (✓/– = есть/нет; ширина каждого
 * addon-блока в таблице — 48px):
 *
 * | # | back | closer | leftAddons | rightAddons | contentMargin (left/right) | mainLineMargin |
 * |---|:----:|:------:|:----------:|:-----------:|:---------------------------:|:----------------|
 * | 1 | ✓ | ✓ | ✓ | ✓ | 0 / 0  | —           |
 * | 2 | ✓ | ✓ | ✓ | – | 0 / 48 | —           |
 * | 3 | ✓ | ✓ | – | ✓ | 48 / 0 | —           |
 * | 4 | ✓ | ✓ | – | – | 0 / 0  | —           |
 * | 5 | ✓ | – | ✓ | ✓ | 0 / 0  | `right: 48` |
 * | 6 | ✓ | – | ✓ | – | 0 / 96 | —           |
 * | 7 | ✓ | – | – | ✓ | 48 / 0 (п.2) | `right: 48` |
 * | 8 | ✓ | – | – | – | 0 / 48 | —           |
 * | 9 | – | ✓ | ✓ | ✓ | 0 / 0  | `left: 48`  |
 * | 10| – | ✓ | ✓ | – | 0 / 48 (п.2) | `left: 48`  |
 * | 11| – | ✓ | – | ✓ | 96 / 0 | —           |
 * | 12| – | ✓ | – | – | 48 / 0 | —           |
 * | 13| – | – | ✓ | ✓ | 0 / 0  | —           |
 * | 14| – | – | ✓ | – | 0 / 48 | —           |
 * | 15| – | – | – | ✓ | 48 / 0 | —           |
 * | 16| – | – | – | – | 0 / 0  | —           |
 *
 * Строки #7 и #10 — случай п.2: contentMargin и mainLineMargin применяются
 * одновременно.
 */
// eslint-disable-next-line complexity
export const getUniversalModalTitleMargin: ComputeTitleMargin = ({
    align,
    hasBackButton,
    hasCloser,
    hasLeftAddons,
    hasRightAddons,
    leftAddonsWidth,
    rightAddonsWidth,
}) => {
    const hasOnlyBackButton = hasBackButton && !hasCloser;
    const hasOnlyCloser = hasCloser && !hasBackButton;

    if (align === 'center') {
        return {
            contentMargin: { left: 0, right: 0 },
            mainLineMargin: {
                ...(hasOnlyBackButton && { right: 48 }),
                ...(hasOnlyCloser && { left: 48 }),
            },
        };
    }

    const mainLineMargin = {
        ...(hasOnlyBackButton && hasRightAddons && { right: 48 }),
        ...(hasOnlyCloser && hasLeftAddons && { left: 48 }),
    };

    const hasBothAddons = hasLeftAddons && hasRightAddons;

    if (hasBothAddons && (hasOnlyBackButton || hasOnlyCloser)) {
        return { contentMargin: { left: 0, right: 0 }, mainLineMargin };
    }

    let marginSize = Math.abs(rightAddonsWidth - leftAddonsWidth);
    let shouldAddLeftMargin = rightAddonsWidth - leftAddonsWidth > 0;

    if (hasOnlyCloser && hasLeftAddons && !hasRightAddons) {
        marginSize += CONTROL_WIDTH;
    }

    if (hasOnlyBackButton && hasRightAddons && !hasLeftAddons) {
        marginSize += CONTROL_WIDTH;
        shouldAddLeftMargin = true;
    }

    const contentMargin = shouldAddLeftMargin
        ? { left: marginSize, right: 0 }
        : { left: 0, right: marginSize };

    return { contentMargin, mainLineMargin };
};
