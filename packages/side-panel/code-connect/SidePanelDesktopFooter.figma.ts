// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-72479
// source=packages/side-panel/src/components/footer/Component.tsx
// component=SidePanelDesktop.Footer
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// Overlap фиксируется как состояние; sticky и layout приходят из контекста поведения.
let childCode;
if (hasContent) {
    const child = instance.findInstance('SidePanelFooterContent');
    if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
        const result = child.executeTemplate();
        if (result.metadata?.nestable === true) childCode = result.example;
    }
}
const example = !hasContent
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof SidePanelDesktop.Footer>['sticky']> }) {
  return <SidePanelDesktop.Footer sticky={sticky} />;
 }`
    : childCode
      ? figma.code`function Example({ footerProps }: { footerProps: Omit<ComponentProps<typeof SidePanelDesktop.Footer>, 'children'> }) {
  return <SidePanelDesktop.Footer {...footerProps}>${childCode}</SidePanelDesktop.Footer>;
 }`
      : figma.code`function Example({ footerProps }: { footerProps: ComponentProps<typeof SidePanelDesktop.Footer> }) {
  return <SidePanelDesktop.Footer {...footerProps} />;
 }`;

export default {
    id: 'core-side-panel-sidepaneldesktopfooter',
    imports: [
        "import { SidePanelDesktop } from '@alfalab/core-components/side-panel/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'footer',
            requiresParent: 'SidePanelDesktop',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
