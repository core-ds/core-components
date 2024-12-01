import React from 'react';

import { type CloserBaseProps } from './Component';
import { CloserDesktop } from './desktop';
import { CloserMobile } from './mobile';

/** Closer Responsive Props */
export type CloserResponsiveProps = CloserBaseProps & {
    /**
     * Вид компонента
     */
    view: 'desktop' | 'mobile';
};

export const CloserResponsive = ({ view, ...props }: CloserResponsiveProps) =>
    view === 'desktop' ? <CloserDesktop {...props} /> : <CloserMobile {...props} />;
