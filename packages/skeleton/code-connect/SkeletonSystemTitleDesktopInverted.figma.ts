// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=141371-12397
// source=packages/skeleton/src/index.ts
// component=Skeleton
import figma from 'figma';
const instance = figma.selectedInstance;
const textStyle = instance.getEnum('TextStyle', {
    '22_26': '22_26',
    '30_36': '30_36',
    '40_48': '40_48',
    '48_52': '48_52',
    '18_22': '18_22',
});
if (!textStyle) throw new Error('Неизвестный TextStyle Skeleton');
const [fontSize, lineHeight] = textStyle.split('_').map(Number);
// Высота полоски/её оптический отступ задаются измеренным layout, а не высотой строки.
export default {
    id: 'core-SkeletonSystemTitleDesktopInverted',
    imports: ["import { Skeleton, type SkeletonProps } from '@alfalab/core-components/skeleton';"],
    example: figma.code`function Example({ layout }: { layout: NonNullable<SkeletonProps['style']> }) {
        return <div style={{ fontSize: ${fontSize}, lineHeight: '${lineHeight}px' }}>
            <Skeleton visible colors="inverted" borderRadius="pill" style={layout} />
        </div>;
    }`,
    metadata: { nestable: false },
};
