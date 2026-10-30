// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=56146-840
// source=packages/skeleton/src/index.ts
// component=Skeleton
import figma from 'figma';
const instance = figma.selectedInstance;
const textStyle = instance.getEnum('TextStyle', {
    '20_28': '20_28',
    '30_36': '30_36',
    '34_40': '34_40',
    '16_20': '16_20',
    '26_32': '26_32',
});
if (!textStyle) throw new Error('Неизвестный TextStyle Skeleton');
const [fontSize, lineHeight] = textStyle.split('_').map(Number);
// Высота полоски/её оптический отступ задаются измеренным layout, а не высотой строки.
export default {
    id: 'core-SkeletonSystemTitleMobile',
    imports: ["import { Skeleton, type SkeletonProps } from '@alfalab/core-components/skeleton';"],
    example: figma.code`function Example({ layout }: { layout: NonNullable<SkeletonProps['style']> }) {
        return <div style={{ fontSize: ${fontSize}, lineHeight: '${lineHeight}px' }}>
            <Skeleton visible colors="default" borderRadius="pill" style={layout} />
        </div>;
    }`,
    metadata: { nestable: false },
};
