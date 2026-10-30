// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-71746
// source=packages/modal/src/components/footer/Component.tsx
// component=ModalDesktop.Footer
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// Overlap фиксируется как состояние; sticky и layout приходят из контекста поведения.
let childCode;
if (hasContent) {
    const child = instance.findInstance('ModalFooterContent');
    if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
        const result = child.executeTemplate();
        if (result.metadata?.nestable === true) childCode = result.example;
    }
}
const example = !hasContent
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof ModalDesktop.Footer>['sticky']> }) {
  return <ModalDesktop.Footer sticky={sticky} />;
 }`
    : childCode
      ? figma.code`function Example({ footerProps }: { footerProps: Omit<ComponentProps<typeof ModalDesktop.Footer>, 'children'> }) {
  return <ModalDesktop.Footer {...footerProps}>${childCode}</ModalDesktop.Footer>;
 }`
      : figma.code`function Example({ footerProps }: { footerProps: ComponentProps<typeof ModalDesktop.Footer> }) {
  return <ModalDesktop.Footer {...footerProps} />;
 }`;

export default {
    id: 'core-modal-modaldesktopfooteralternate',
    imports: [
        "import { ModalDesktop } from '@alfalab/core-components/modal/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'footer',
            requiresParent: 'ModalDesktop',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
