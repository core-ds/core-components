// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=50305-25055
// source=packages/universal-modal/src/mobile/components/content/index.tsx
// component=ContentMobile
import figma from 'figma';
const instance = figma.selectedInstance;
const content = instance.getSlot('BodyContent#118707:6');
export default {
    id: 'core-universal-modal-universalmodalcontentmobile',
    imports: [
        "import { ContentMobile } from '@alfalab/core-components/universal-modal/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: figma.code`<ContentMobile>${content}</ContentMobile>`,
    metadata: {
        nestable: false,
        props: { role: 'content', requiresParent: 'UniversalModalMobile', composition: 'part' },
    },
};
