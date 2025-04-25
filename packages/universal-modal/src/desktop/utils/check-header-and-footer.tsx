import React, { Children, ReactNode } from 'react';

import { FooterDesktop } from '../../components/footer';
import { HeaderDesktop } from '../../components/header';

type ChildType = typeof HeaderDesktop | typeof FooterDesktop;

export const checkHeaderAndFooter = (children: ReactNode) => {
    let hasHeader = false;
    let hasFooter = false;

    Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            const { displayName } = child.type as ChildType;

            if (displayName === 'HeaderDesktop') {
                hasHeader = true;
            }

            if (displayName === 'FooterDesktop') {
                hasFooter = true;
            }
        }
    });

    return { hasHeader, hasFooter };
};
