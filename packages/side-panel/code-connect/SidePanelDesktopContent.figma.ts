// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=208-72486
// source=packages/side-panel/src/components/content/Component.tsx
// component=SidePanelDesktop.Content
import figma from 'figma';
const instance = figma.selectedInstance;
// Произвольный контент передаётся через связанный вложенный компонент либо явно из контекста.
const child = instance.findInstance('SidePanelBodyContent');
let childCode;
if (child.type === 'INSTANCE' && child.hasCodeConnect()) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === true) childCode = result.example;
}
export default {
    id: 'core-side-panel-sidepaneldesktopcontent',
    imports: [
        "import { SidePanelDesktop } from '@alfalab/core-components/side-panel/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: childCode
        ? figma.code`<SidePanelDesktop.Content>${childCode}</SidePanelDesktop.Content>`
        : figma.code`function Example({ children }: { children: ComponentProps<typeof SidePanelDesktop.Content>['children'] }) {
    return <SidePanelDesktop.Content>{children}</SidePanelDesktop.Content>;
 }`,
    metadata: {
        nestable: false,
        props: {
            role: 'content',
            requiresParent: 'SidePanelDesktop',
            composition: 'part',
            runtimeContext: 'Render inside the matching parent; no modal root is generated.',
        },
    },
};
