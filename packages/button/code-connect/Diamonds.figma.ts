// url=https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888
// source=https://github.com/core-ds/icons/tree/master/packages/glyph-26/src
// component=Diamonds20Icon / Diamonds24Icon
import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
    s: 20,
    m: 24,
    xxl: 'unsupported',
});
if (size !== 20 && size !== 24) {
    throw new Error(
        'Diamonds: поддерживаются только Size=s (20) и Size=m (24); у xxl нет соответствия в glyph-26',
    );
}

// Сниппет иконки возвращает SVG. Icon20Adapter добавляет родитель слота,
// когда иконка 20 используется в Button/Input 32/40.
const imports =
    size === 20
        ? ["import { Diamonds20Icon } from '@alfalab/icons-glyph-26/Diamonds20Icon';"]
        : ["import { Diamonds24Icon } from '@alfalab/icons-glyph-26/Diamonds24Icon';"];

export default {
    id: 'core-diamonds-icon',
    imports,
    example: size === 20 ? figma.code`<Diamonds20Icon />` : figma.code`<Diamonds24Icon />`,
    metadata: { nestable: true, props: { svgSize: size, imports } },
};
