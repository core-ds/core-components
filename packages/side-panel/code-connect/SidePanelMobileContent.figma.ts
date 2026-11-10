// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=316-28069
// source=packages/side-panel/src/components/content/Component.tsx
// component=SidePanelMobile.Content
import figma from 'figma';
const instance = figma.selectedInstance;
// Произвольный контент передаётся через связанный вложенный компонент либо явно из контекста.
const child = instance.findInstance('🔩 [M] ModalBodySwapContent');
let childCode;
if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === true) childCode = result.example;
}
export default {
    id: 'core-side-panel-sidepanelmobilecontent',
    imports: [
        "import { SidePanelMobile } from '@alfalab/core-components/side-panel/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: childCode
        ? figma.code`<SidePanelMobile.Content>${childCode}</SidePanelMobile.Content>`
        : figma.code`function Example({ children }: { children: ComponentProps<typeof SidePanelMobile.Content>['children'] }) {
    return <SidePanelMobile.Content>{children}</SidePanelMobile.Content>;
 }`,
    metadata: {
        nestable: false,
        props: {
            role: 'content',
            requiresParent: 'SidePanelMobile',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
        },
    },
};
