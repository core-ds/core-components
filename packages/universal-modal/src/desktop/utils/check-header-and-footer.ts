import { Children, isValidElement, type ReactNode } from 'react';

import { type FooterDesktop } from '../../components/footer';
import { type HeaderDesktop } from '../../components/header';

import { isFooterNode } from './isFooterNode';
import { isHeaderNode } from './isHeaderNode';

type ChildType = typeof HeaderDesktop | typeof FooterDesktop;

export const checkHeaderAndFooter = (children: ReactNode) => {
    let hasHeader = false;
    let hasFooter = false;

    Children.forEach(children, (child) => {
        if (isValidElement(child)) {
            const { displayName } = child.type as ChildType;

            if (displayName && isHeaderNode(displayName)) {
                hasHeader = true;
            }

            if (displayName && isFooterNode(displayName)) {
                hasFooter = true;
            }
        }
    });

    return { hasHeader, hasFooter };
};
