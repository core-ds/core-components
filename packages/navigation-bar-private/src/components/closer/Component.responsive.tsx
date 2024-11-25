import React from 'react';

import { type CloserProps } from './Component';
import { CloserDesktop } from './Component.desktop';
import { CloserMobile } from './Component.mobile';

/** @deprecated Используйте типы от CloserDesktop / CloserMobile */
export interface CloserResponsiveProps extends CloserProps {
    /**
     * Вид компонента
     */
    view: 'desktop' | 'mobile';
}

/** @deprecated Используйте CloserDesktop / CloserMobile */
export const CloserResponsive = ({ view, ...props }: CloserResponsiveProps) =>
    view === 'desktop' ? <CloserDesktop {...props} /> : <CloserMobile {...props} />;
