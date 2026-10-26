// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-72500
// source=packages/side-panel/src/components/header/Component.tsx
// component=SidePanelDesktop.Header
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// Overlap — показанное состояние границы, а не контракт sticky.
// NavigationContent/ModalNavigationPresets включает произвольные addons и custom navigation.
// Его нельзя вставить вторым NavigationBar внутрь Header; параметры явно передаёт вызывающий код.
const example = hasContent
    ? figma.code`function Example({ headerProps }: { headerProps: ComponentProps<typeof SidePanelDesktop.Header> }) {
   return <SidePanelDesktop.Header {...headerProps} />;
 }`
    : figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof SidePanelDesktop.Header>['sticky']> }) {
   return <SidePanelDesktop.Header sticky={sticky} hasCloser={false} />;
 }`;

export default {
    id: 'core-side-panel-sidepaneldesktopheader',
    imports: [
        "import { SidePanelDesktop } from '@alfalab/core-components/side-panel/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'SidePanelDesktop',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
