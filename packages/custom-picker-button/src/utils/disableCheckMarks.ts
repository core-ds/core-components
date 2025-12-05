import { type GroupShape, type OptionShape } from '@alfalab/core-components-select/shared';

type OptionLike = OptionShape | GroupShape;

/**
 * Отключает отображение чекмарков у всех опций, включая опции внутри групп.
 *
 * @param options - список опций и/или групп для Select.
 * @returns новый массив с тем же деревом, но с `showCheckMark: false` у всех опций.
 */
export const disableCheckmarks = (options: OptionLike[]): OptionLike[] =>
    options.map((item) =>
        'options' in item
            ? { ...item, options: item.options.map((opt) => ({ ...opt, showCheckMark: false })) }
            : { ...item, showCheckMark: false },
    );
