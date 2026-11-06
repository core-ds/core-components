// url=https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web-Core?node-id=5-1276
// source=packages/comment/src/Component.tsx
// component=Comment
import figma from 'figma';
const instance = figma.selectedInstance;
const value = instance.getString('✎ Value');

export default {
    id: 'core-Comment',
    imports: ["import { Comment } from '@alfalab/core-components/comment';"],
    example: figma.code`<Comment>{${JSON.stringify(value)}}</Comment>`,
    metadata: { nestable: true },
};
