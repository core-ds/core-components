// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-71767
// source=packages/modal/src/components/header/Component.tsx
// component=ModalDesktop.Header
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// Overlap — показанное состояние границы, а не контракт sticky.
// NavigationContent/ModalNavigationPresets включает произвольные addons и custom navigation.
// Его нельзя вставить вторым NavigationBar внутрь Header; параметры явно передаёт вызывающий код.
const example = hasContent
    ? figma.code`function Example({ headerProps }: { headerProps: ComponentProps<typeof ModalDesktop.Header> }) {
   return <ModalDesktop.Header {...headerProps} />;
 }`
    : figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof ModalDesktop.Header>['sticky']> }) {
   return <ModalDesktop.Header sticky={sticky} hasCloser={false} />;
 }`;

export default {
    id: 'core-modal-modaldesktopheaderalternate',
    imports: [
        "import { ModalDesktop } from '@alfalab/core-components/modal/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'ModalDesktop',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
            figmaOverlap: overlap,
            contentMode: hasContent,
        },
    },
};
