// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=121340-2049
// source=packages/scrollbar/src/Component.tsx
// component=Scrollbar
import figma from 'figma';
const instance = figma.selectedInstance;
const ratio = instance.getEnum('Position', { Start: 0, Center: 0.5, End: 1 });
if (ratio === undefined) throw new Error('Неизвестный Position Scrollbar');
export default {
    id: 'core-scrollbarvertical',
    imports: [
        "import React from 'react';",
        "import { Scrollbar } from '@alfalab/core-components/scrollbar';",
    ],
    example: figma.code`function Example({ children, style, viewportStyle }: {
 children: React.ReactNode; style: React.CSSProperties; viewportStyle: React.CSSProperties;
 }) {
 const scrollRef = React.useRef<HTMLDivElement>(null);
 React.useEffect(() => {
 const node = scrollRef.current;
 if (node) node.scrollTop = Math.max(0, node.scrollHeight - node.clientHeight) * ${ratio};
 }, [children, style, viewportStyle]);
 return <Scrollbar colors="default" forceVisible="y" autoHide={false}  style={style} scrollableNodeProps={{ ref: scrollRef, style: viewportStyle }}>{children}</Scrollbar>;
 }`,
    metadata: { nestable: false },
};
