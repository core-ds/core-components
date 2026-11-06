// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-71782
// source=packages/bottom-sheet/src/component.tsx
// component=BottomSheet
import figma from 'figma';
const instance = figma.selectedInstance;
// Произвольный контент передаётся через связанный вложенный компонент либо явно из контекста.
const child = instance.findInstance('BottomSheetBodySwapContent');
let childCode;
if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === true) childCode = result.example;
}
export default {
    id: 'core-bottom-sheet-bottomsheetbody',
    imports: ["import type { BottomSheetProps } from '@alfalab/core-components/bottom-sheet';"],
    example: childCode
        ? figma.code`const bottomSheetBodyProps = {
  children: <>${childCode}</>,
 } satisfies Pick<BottomSheetProps, 'children'>;`
        : figma.code`function getBottomSheetBodyProps({ children }: Pick<BottomSheetProps, 'children'>) {
  return { children } satisfies Pick<BottomSheetProps, 'children'>;
 }`,
    metadata: {
        nestable: false,
        props: {
            role: 'body',
            requiresParent: 'BottomSheet',
            composition: 'props-fragment',
            colors: 'default',
        },
    },
};
