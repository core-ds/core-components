// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=316-25826
// source=packages/side-panel/src/components/header/Component.tsx
// component=SidePanelMobile.Header
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// Overlap — показанное состояние границы, а не контракт sticky.
// NavigationContent/ModalNavigationPresets включает произвольные addons и custom navigation.
// Его нельзя вставить вторым NavigationBar внутрь Header; параметры явно передаёт вызывающий код.
const example = hasContent
    ? figma.code`function Example({ headerProps }: { headerProps: ComponentProps<typeof SidePanelMobile.Header> }) {
   return <SidePanelMobile.Header {...headerProps} />;
 }`
    : figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof SidePanelMobile.Header>['sticky']> }) {
   return <SidePanelMobile.Header sticky={sticky} hasCloser={false} />;
 }`;

export default {
    id: 'core-side-panel-sidepanelmobileheader',
    imports: [
        "import { SidePanelMobile } from '@alfalab/core-components/side-panel/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'SidePanelMobile',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
