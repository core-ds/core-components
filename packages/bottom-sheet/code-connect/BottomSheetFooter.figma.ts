// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-71775
// source=packages/bottom-sheet/src/component.tsx
// component=BottomSheet
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
let childCode;
if (hasContent) {
    const child = instance.findInstance('BottomSheetFooterContent');
    if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
        const result = child.executeTemplate();
        if (result.metadata?.nestable === true) childCode = result.example;
    }
}
// Overlap — кадр границы; stickyFooter требует контекста прокрутки.
const example = !hasContent
    ? figma.code`function getBottomSheetFooterProps({ stickyFooter }: Pick<BottomSheetProps, 'stickyFooter'>) {
  return { stickyFooter, actionButton: null } satisfies Pick<BottomSheetProps, 'stickyFooter' | 'actionButton'>;
 }`
    : childCode
      ? figma.code`function getBottomSheetFooterProps({ stickyFooter }: Pick<BottomSheetProps, 'stickyFooter'>) {
  return { stickyFooter, actionButton: <>${childCode}</> } satisfies Pick<BottomSheetProps, 'stickyFooter' | 'actionButton'>;
 }`
      : figma.code`function getBottomSheetFooterProps({ stickyFooter, actionButton }: Pick<BottomSheetProps, 'stickyFooter' | 'actionButton'>) {
  return { stickyFooter, actionButton } satisfies Pick<BottomSheetProps, 'stickyFooter' | 'actionButton'>;
 }`;

export default {
    id: 'core-bottom-sheet-bottomsheetfooter',
    imports: ["import type { BottomSheetProps } from '@alfalab/core-components/bottom-sheet';"],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'footer',
            requiresParent: 'BottomSheet',
            composition: 'props-fragment',
            colors: 'default',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
