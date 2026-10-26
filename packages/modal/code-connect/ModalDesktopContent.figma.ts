// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-71734
// source=packages/modal/src/components/content/Component.tsx
// component=ModalDesktop.Content
import figma from 'figma';
const instance = figma.selectedInstance;
// Произвольный контент передаётся через связанный вложенный компонент либо явно из контекста.
const child = instance.findInstance('ModalBodyContent');
let childCode;
if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === true) childCode = result.example;
}
export default {
    id: 'core-modal-modaldesktopcontent',
    imports: [
        "import { ModalDesktop } from '@alfalab/core-components/modal/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: childCode
        ? figma.code`<ModalDesktop.Content>${childCode}</ModalDesktop.Content>`
        : figma.code`function Example({ children }: { children: ComponentProps<typeof ModalDesktop.Content>['children'] }) {
    return <ModalDesktop.Content>{children}</ModalDesktop.Content>;
 }`,
    metadata: {
        nestable: false,
        props: {
            role: 'content',
            requiresParent: 'ModalDesktop',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
        },
    },
};
