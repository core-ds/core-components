// url=https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92334-26810
// source=https://github.com/core-ds/icons/tree/master/packages/glyph/src
// component=DotsThreeVerticalMIcon / DotsThreeVerticalSIcon
import figma from 'figma';

// Связь сохраняет именно выбранный набор glyph и его Size, без замены на glyph-26.
const size = figma.selectedInstance.getEnum('Size', { s: 16, m: 24, xxl: 'unsupported' });
if (size !== 16 && size !== 24) {
    throw new Error(
        'dots-three-vertical: у выбранного Size нет точного экспорта; поддерживаются только s и m',
    );
}
const component = size === 24 ? 'DotsThreeVerticalMIcon' : 'DotsThreeVerticalSIcon';
const imports = [`import { ${component} } from '@alfalab/icons-glyph/${component}';`];

export default {
    id: 'core-screen-icon-dots-three-vertical',
    imports,
    example: figma.code`<${component} />`,
    metadata: { nestable: true, props: { svgSize: size, imports } },
};
