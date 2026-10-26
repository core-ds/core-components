// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=316-24580
// source=packages/modal/src/components/footer/Component.tsx
// component=ModalMobile.Footer
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
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof ModalMobile.Footer>['sticky']> }) {
  return <ModalMobile.Footer sticky={sticky} />;
 }`
    : childCode
      ? figma.code`function Example({ footerProps }: { footerProps: Omit<ComponentProps<typeof ModalMobile.Footer>, 'children'> }) {
  return <ModalMobile.Footer {...footerProps}>${childCode}</ModalMobile.Footer>;
 }`
      : figma.code`function Example({ footerProps }: { footerProps: ComponentProps<typeof ModalMobile.Footer> }) {
  return <ModalMobile.Footer {...footerProps} />;
 }`;

export default {
    id: 'core-modal-modalmobilefooter',
    imports: [
        "import { ModalMobile } from '@alfalab/core-components/modal/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'footer',
            requiresParent: 'ModalMobile',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
