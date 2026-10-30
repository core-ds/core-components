// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-71786
// source=packages/bottom-sheet/src/component.tsx
// component=BottomSheet
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const fullHeight = instance.getEnum('FullHeight', { False: false, True: true });
const showSwipeMarker = instance.getBoolean('Swiper');
const overlay = instance.getBoolean('Overlay');
const overlap = instance.getBoolean('↳ Overlap');
if (typeof showSwipeMarker !== 'boolean' || typeof overlay !== 'boolean') {
    throw new Error('BottomSheet: Swiper/Overlay must be boolean properties');
}
if (fullHeight && !overlay) throw new Error('BottomSheet: FullHeight=True requires Overlay=True');
// FullHeight=False не определяет magneticAreas/initialHeight. Overlap не определяет stickyHeader.
const heightProp = fullHeight ? figma.code`initialHeight: 'full',` : figma.code``;
const example = hasContent
    ? figma.code`function getBottomSheetHeaderProps({ navigationProps, layoutProps }: {
  navigationProps: Pick<BottomSheetProps, 'title' | 'titleSize' | 'titleAlign' | 'subtitle' | 'hasCloser' | 'hasBacker' | 'leftAddons' | 'rightAddons' | 'bottomAddons' | 'onBack' | 'backButtonProps'>;
  layoutProps: Pick<BottomSheetProps, 'initialHeight' | 'magneticAreas' | 'stickyHeader'>;
 }) {
  return { ...layoutProps, ...navigationProps, colors: 'default', showSwipeMarker: ${showSwipeMarker}, hideOverlay: ${!overlay}, ${heightProp} } satisfies Partial<BottomSheetProps>;
 }`
    : figma.code`function getBottomSheetHeaderProps({ layoutProps }: { layoutProps: Pick<BottomSheetProps, 'initialHeight' | 'magneticAreas' | 'stickyHeader'> }) {
  return { ...layoutProps, colors: 'default', showSwipeMarker: ${showSwipeMarker}, hideOverlay: ${!overlay}, ${heightProp} } satisfies Partial<BottomSheetProps>;
 }`;

export default {
    id: 'core-bottom-sheet-bottomsheetheader',
    imports: ["import type { BottomSheetProps } from '@alfalab/core-components/bottom-sheet';"],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'BottomSheet',
            composition: 'props-fragment',
            colors: 'default',
            figmaOverlap: overlap,
            contentMode: hasContent,
            figmaFullHeight: fullHeight,
            swipeMarkerContext: 'Use the source marker value with an adjustable sheet height.',
        },
    },
};
