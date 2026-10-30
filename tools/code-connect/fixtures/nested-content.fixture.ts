import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', { '16': 16, '20': 20, '24': 24, '48': 48 });

if (size === undefined) throw new Error('Unsupported nested content size');
const imports = ["import { NestedContent } from './nested-content';"];

export default {
    id: 'synthetic-nested-content',
    imports,
    example: figma.code`<NestedContent />`,
    metadata: { nestable: true, props: { svgSize: size, imports } },
};
