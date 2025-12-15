import { createRef, type RefObject, useRef } from 'react';

export const useNodeRef = () => {
    const nodeRefs = useRef<Record<number, RefObject<HTMLTableSectionElement>>>({});

    const getNodeRef = (key: number) => {
        if (!nodeRefs.current[key]) {
            nodeRefs.current[key] = createRef<HTMLTableSectionElement>();
        }

        return nodeRefs.current[key];
    };

    return { getNodeRef };
};
