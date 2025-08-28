import {
    Children,
    cloneElement,
    isValidElement,
    MutableRefObject,
    ReactElement,
    ReactNode,
    RefObject,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { FooterDesktop } from '../../components/footer';
import { HeaderDesktop } from '../../components/header';

import { isFooterNode } from './isFooterNode';
import { isHeaderNode } from './isHeaderNode';

interface Params {
    children: ReactNode;
    headerElementRef: RefObject<HTMLDivElement>;
    footerElementRef: RefObject<HTMLDivElement>;
}

/** Устанавливает рефы в хедер и футер если они переданы в модалку (необходимы для дальнейшего расчета высоты кастомного скроллбара) */
export const setFooterAndHeaderRefs = (params: Params) => {
    const { children, headerElementRef, footerElementRef } = params;

    const enhancedChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) {
            return child;
        }

        const { displayName } = child.type as typeof HeaderDesktop | typeof FooterDesktop;

        if (displayName && isHeaderNode(displayName)) {
            const existingRef = child as ReactElement & { ref: MutableRefObject<HTMLDivElement> };

            return cloneElement(child, { ref: mergeRefs([existingRef.ref, headerElementRef]) });
        }

        if (displayName && isFooterNode(displayName)) {
            const existingRef = child as ReactElement & { ref: MutableRefObject<HTMLDivElement> };

            return cloneElement(child, { ref: mergeRefs([existingRef.ref, footerElementRef]) });
        }

        return child;
    });

    return { enhancedChildren };
};
