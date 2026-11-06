// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=316-24588
// source=packages/modal/src/components/header/Component.tsx
// component=ModalMobile.Header
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// Overlap — показанное состояние границы, а не контракт sticky.
// NavigationContent/ModalNavigationPresets включает произвольные addons и custom navigation.
// Его нельзя вставить вторым NavigationBar внутрь Header; параметры явно передаёт вызывающий код.
const example = hasContent
    ? figma.code`function Example({ headerProps }: { headerProps: ComponentProps<typeof ModalMobile.Header> }) {
   return <ModalMobile.Header {...headerProps} />;
 }`
    : figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof ModalMobile.Header>['sticky']> }) {
   return <ModalMobile.Header sticky={sticky} hasCloser={false} />;
 }`;

export default {
    id: 'core-modal-modalmobileheader',
    imports: [
        "import { ModalMobile } from '@alfalab/core-components/modal/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'ModalMobile',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
