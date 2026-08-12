import { type ComputeTitleMargin } from '@alfalab/core-components-navigation-bar-private';

/**
 * Компенсирует смещение заголовка шапки, когда левая и правая стороны
 * (кнопка "назад", closer, аддоны) не симметричны по ширине.
 *
 * Заголовок стоит по центру между двумя блоками — левым (кнопка "назад" +
 * leftAddons) и правым (rightAddons + closer). Если один блок шире
 * другого, заголовок визуально съезжает в сторону, и это нужно
 * компенсировать отступом. Есть два инструмента для этого:
 *
 * - `contentMargin` — отступ у самого заголовка, обычно рассчитывается по
 *   разнице реальных ширин левого и правого блока;
 * - `mainLineMargin` — фиксированный отступ 48px (ширина кнопки "назад"
 *   или closer) у всей строки шапки целиком, сдвигающий её как единое
 *   целое. Используется в частных случаях, где одной компенсации
 *   заголовка недостаточно.
 *
 * ## Заголовок по центру (`align === 'center'`)
 *
 * Здесь всё просто: заголовок и так стоит по центру, менять `contentMargin`
 * не нужно. Единственная асимметрия, которую нужно поправить — если есть
 * только кнопка "назад" ИЛИ только closer (а не обе сразу и не ни одной).
 * В этом случае всю строку шапки сдвигают на 48px в сторону
 * отсутствующего элемента, чтобы заголовок остался ровно по центру:
 * - есть только "назад" → сдвиг строки вправо на 48px;
 * - есть только closer → сдвиг строки влево на 48px.
 * Аддоны (leftAddons/rightAddons) на этот расчёт не влияют.
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
 * Здесь заголовок должен визуально начинаться в одной и той же точке,
 * независимо от того, что стоит слева. Если слева что-то есть (кнопка
 * "назад" и/или leftAddons), а справа — легче или вообще пусто, заголовок
 * нужно сдвинуть вправо на разницу в ширине, и наоборот.
 *
 * Базовый расчёт: `contentMargin = разница ширин левого и правого блока`,
 * добавляется с той стороны, которая легче.
 *
 * Есть два случая, где к этому добавляются частные поправки:
 *
 * 1. **Есть ровно один control-элемент (только "назад" ИЛИ только closer),
 *    и есть аддоны с обеих сторон.** Тогда компенсация заголовка не нужна
 *    (аддоны и так уравновешивают друг друга по бокам), а весь
 *    "лишний" control-элемент компенсируется сдвигом всей строки на 48px —
 *    так же, как для `align === 'center'`.
 *
 * 2. **Есть ровно один control-элемент, а единственный аддон стоит на
 *    противоположной от него стороне** (например, только closer справа и
 *    только leftAddons слева, без rightAddons). Тогда просто разницы
 *    ширин недостаточно — нужно ещё раз "отзеркалить" ширину самого
 *    аддона в компенсацию заголовка, чтобы результат выглядел так, будто
 *    аддон стоит по обе стороны симметрично. В этом случае одновременно
 *    применяются и сдвиг заголовка (contentMargin), и сдвиг всей строки
 *    (mainLineMargin) — это два независимых механизма, которые могут
 *    сработать вместе.
 *
 * Полная матрица по всем 16 комбинациям (✓/– = есть/нет; ширина каждого
 * addon-блока считается 48px, поэтому значения ниже кратны 48):
 *
 * | # | back | closer | leftAddons | rightAddons | contentMargin (left/right) | mainLineMargin |
 * |---|:----:|:------:|:----------:|:-----------:|:---------------------------:|:----------------|
 * | 1 | ✓ | ✓ | ✓ | ✓ | 0 / 0  | —           |
 * | 2 | ✓ | ✓ | ✓ | – | 0 / 48 | —           |
 * | 3 | ✓ | ✓ | – | ✓ | 48 / 0 | —           |
 * | 4 | ✓ | ✓ | – | – | 0 / 0  | —           |
 * | 5 | ✓ | – | ✓ | ✓ | 0 / 0  | `right: 48` |
 * | 6 | ✓ | – | ✓ | – | 0 / 96 | —           |
 * | 7 | ✓ | – | – | ✓ | 48 / 0 (поправка 2) | `right: 48` |
 * | 8 | ✓ | – | – | – | 0 / 48 | —           |
 * | 9 | – | ✓ | ✓ | ✓ | 0 / 0  | `left: 48`  |
 * | 10| – | ✓ | ✓ | – | 0 / 48 (поправка 2) | `left: 48`  |
 * | 11| – | ✓ | – | ✓ | 96 / 0 | —           |
 * | 12| – | ✓ | – | – | 48 / 0 | —           |
 * | 13| – | – | ✓ | ✓ | 0 / 0  | —           |
 * | 14| – | – | ✓ | – | 0 / 48 | —           |
 * | 15| – | – | – | ✓ | 48 / 0 | —           |
 * | 16| – | – | – | – | 0 / 0  | —           |
 *
 * Строки #7 и #10 — это как раз случай "поправка 2" выше: contentMargin и
 * mainLineMargin применяются одновременно.
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
        marginSize += leftAddonsWidth;
    }

    if (hasOnlyBackButton && hasRightAddons && !hasLeftAddons) {
        marginSize += rightAddonsWidth;
        shouldAddLeftMargin = true;
    }

    const contentMargin = shouldAddLeftMargin
        ? { left: marginSize, right: 0 }
        : { left: 0, right: marginSize };

    return { contentMargin, mainLineMargin };
};
