// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=316-25126
// source=packages/modal/src/components/content/Component.tsx
// component=ModalMobile.Content
import figma from 'figma';
const instance = figma.selectedInstance;
// Произвольный контент передаётся через связанный вложенный компонент либо явно из контекста.
const child = instance.findInstance('ModalBodySwapContent');
let childCode;
if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === true) childCode = result.example;
}
export default {
    id: 'core-modal-modalmobilecontent',
    imports: [
        "import { ModalMobile } from '@alfalab/core-components/modal/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: childCode
        ? figma.code`<ModalMobile.Content>${childCode}</ModalMobile.Content>`
        : figma.code`function Example({ children }: { children: ComponentProps<typeof ModalMobile.Content>['children'] }) {
    return <ModalMobile.Content>{children}</ModalMobile.Content>;
 }`,
    metadata: {
        nestable: false,
        props: {
            role: 'content',
            requiresParent: 'ModalMobile',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
        },
    },
};
