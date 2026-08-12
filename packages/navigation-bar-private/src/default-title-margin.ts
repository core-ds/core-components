import { type ComputeTitleMargin } from './types';

/**
 * Поведение по умолчанию (безопасное для любого потребителя NavigationBarPrivate):
 * - align='center': компенсация по разнице ширин leftAddons/rightAddons,
 *   без веток по hasBackButton/hasCloser;
 * - align='left': компенсации нет.
 */
export const defaultComputeTitleMargin: ComputeTitleMargin = ({
    align,
    leftAddonsWidth,
    rightAddonsWidth,
}) => {
    if (align === 'center') {
        const marginSize = Math.abs(rightAddonsWidth - leftAddonsWidth);
        const shouldAddLeftMargin = rightAddonsWidth - leftAddonsWidth > 0;

        return {
            contentMargin: shouldAddLeftMargin
                ? { left: marginSize, right: 0 }
                : { left: 0, right: marginSize },
        };
    }

    return { contentMargin: { left: 0, right: 0 } };
};
