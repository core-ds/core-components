// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=485-57551
// source=packages/skeleton/src/index.ts
// component=Skeleton
import figma from 'figma';
const instance = figma.selectedInstance;
const textStyle = instance.getEnum('TextStyle', {
    '14_18': '14_18',
    '14_20': '14_20',
    '16_20': '16_20',
    '16_24': '16_24',
});
if (!textStyle) throw new Error('Неизвестный TextStyle Skeleton');
const [fontSize, lineHeight] = textStyle.split('_').map(Number);
const width = instance.getEnum('Length', {
    Fill: '100%',
    '56': '56px',
    '164': '164px',
});
if (!width) throw new Error('Неизвестный Length Skeleton');
// Высота полоски/её оптический отступ задаются измеренным layout, а не высотой строки.
export default {
    id: 'core-SkeletonText',
    imports: ["import { Skeleton, type SkeletonProps } from '@alfalab/core-components/skeleton';"],
    example: figma.code`function Example({ layout }: { layout: NonNullable<SkeletonProps['style']> }) {
        return <div style={{ fontSize: ${fontSize}, lineHeight: '${lineHeight}px', width: '${width}' }}>
            <Skeleton visible colors="default" borderRadius="pill" style={layout} />
        </div>;
    }`,
    metadata: { nestable: false },
};
