// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=50305-25086
// source=packages/universal-modal/src/desktop/components/content/index.tsx
// component=ContentDesktop
import figma from 'figma';
const instance = figma.selectedInstance;
const content = instance.getSlot('BodyContent#118707:8');
// Scrollbar — видимое состояние. nativeScrollbar задаётся родительской UniversalModalDesktop.
const scrollbarVisible = instance.getBoolean('Scrollbar');
export default {
    id: 'core-universal-modal-universalmodalcontentdesktop',
    imports: [
        "import { ContentDesktop } from '@alfalab/core-components/universal-modal/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: figma.code`<ContentDesktop>${content}</ContentDesktop>`,
    metadata: {
        nestable: false,
        props: {
            role: 'content',
            requiresParent: 'UniversalModalDesktop',
            composition: 'part',
            figmaScrollbar: scrollbarVisible,
        },
    },
};
