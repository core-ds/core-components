// url=https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=149085-17064
// source=https://github.com/core-ds/icons/tree/master/packages/glyph-26/src
// component=ChevronDown24Icon / ChevronDownLine24Icon / ChevronDownLine20Icon / ChevronDownThinline20Icon
import figma from 'figma';

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', { '20': 20, '24': 24 });
const style = instance.getEnum('Style', { Default: 'default', Line: 'line', Thinline: 'thinline' });
const colored = instance.getEnum('Color', { False: false });
if (size === undefined || style === undefined || colored !== false) {
    throw new Error(
        'chevron-down: неизвестные Size/Style/Color; требуется точное соответствие glyph-26',
    );
}

// Экспорты подтверждены в @alfalab/icons-glyph-26; неподдержанные сочетания не подменяются.
const component =
    style === 'default'
        ? size === 24
            ? 'ChevronDown24Icon'
            : undefined
        : style === 'line'
          ? size === 24
              ? 'ChevronDownLine24Icon'
              : 'ChevronDownLine20Icon'
          : size === 20
            ? 'ChevronDownThinline20Icon'
            : undefined;
if (!component) {
    throw new Error('chevron-down: у выбранного Size/Style нет экспорта в glyph-26');
}
const imports = [`import { ${component} } from '@alfalab/icons-glyph-26/${component}';`];

export default {
    id: 'core-screen-icon-chevron-down',
    imports,
    example: figma.code`<${component} />`,
    metadata: { nestable: true, props: { svgSize: size, imports } },
};
