// url=https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888
// source=https://github.com/core-ds/icons/tree/master/packages/glyph/src
// component=DiamondsSIcon / DiamondsMIcon / DiamondsXxlIcon
import figma from 'figma';

// Исходный набор glyph: сохраняем выбранную иконку и её фактический размер.
const size = figma.selectedInstance.getEnum('Size', { s: 16, m: 24, xxl: 48 });
if (size !== 16 && size !== 24 && size !== 48) {
    throw new Error('Diamonds: неизвестный Size; требуется точный вариант исходного набора');
}
const component = size === 16 ? 'DiamondsSIcon' : size === 24 ? 'DiamondsMIcon' : 'DiamondsXxlIcon';
const imports = [`import { ${component} } from '@alfalab/icons-glyph/${component}';`];

export default {
    id: 'core-diamonds-icon',
    imports,
    example: figma.code`<${component} />`,
    metadata: { nestable: true, props: { svgSize: size, imports } },
};
