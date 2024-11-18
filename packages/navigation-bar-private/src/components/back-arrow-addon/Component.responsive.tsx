import React from 'react';

import { type BackArrowAddonProps } from './Component';
import { BackArrowAddonDesktop } from './Component.desktop';
import { BackArrowAddonMobile } from './Component.mobile';

/** @deprecated Используйте типы BackArrowAddonDesktop / BackArrowAddonMobile */
export interface BackArrowAddonResponsiveProps extends BackArrowAddonProps {
    /**
     * Вид компонента
     */
    view: 'mobile' | 'desktop';
}

/** @deprecated Используйте BackArrowAddonDesktop / BackArrowAddonMobile */
export const BackArrowAddonResponsive = ({ view, ...props }: BackArrowAddonResponsiveProps) =>
    view === 'desktop' ? <BackArrowAddonDesktop {...props} /> : <BackArrowAddonMobile {...props} />;
