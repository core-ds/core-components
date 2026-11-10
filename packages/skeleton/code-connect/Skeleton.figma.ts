// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=485-57541
// source=packages/skeleton/src/index.ts
// component=Skeleton
import figma from 'figma';
const instance = figma.selectedInstance;
// InstanceHandle не предоставляет width/height/radius; значения передаёт вызывающий код.
export default {
    id: 'core-Skeleton',
    imports: ["import { Skeleton, type SkeletonProps } from '@alfalab/core-components/skeleton';"],
    example: figma.code`function Example({ width, height, borderRadius }: { width: NonNullable<SkeletonProps['style']>['width']; height: NonNullable<SkeletonProps['style']>['height']; borderRadius: NonNullable<SkeletonProps['borderRadius']> }) {
        return <Skeleton visible colors="default" borderRadius={borderRadius} style={{ width, height }} />;
    }`,
    metadata: { nestable: false },
};
