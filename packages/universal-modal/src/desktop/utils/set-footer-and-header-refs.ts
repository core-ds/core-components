import {
    Children,
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
    type RefAttributes,
    type RefObject,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { type FooterDesktop } from '../../components/footer';
import { type HeaderDesktop } from '../../components/header';

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
            const existingRef = child as ReactElement & RefAttributes<HTMLDivElement>;

            return cloneElement(child, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ref: mergeRefs([existingRef.ref ?? null, headerElementRef]),
            });
        }

        if (displayName && isFooterNode(displayName)) {
            const existingRef = child as ReactElement & RefAttributes<HTMLDivElement>;

            return cloneElement(child, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ref: mergeRefs([existingRef.ref, footerElementRef]),
            });
        }

        return child;
    });

    return { enhancedChildren };
};
