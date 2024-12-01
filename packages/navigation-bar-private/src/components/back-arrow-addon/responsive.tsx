import React from 'react';

import { type BackArrowAddonBaseProps } from './Component';
import { BackArrowAddonDesktop } from './desktop';
import { BackArrowAddonMobile } from './mobile';

/** BackArrowAddon Responsive Props */
export type BackArrowAddonResponsiveProps = BackArrowAddonBaseProps & {
    /**
     * Вид компонента
     */
    view: 'mobile' | 'desktop';
};

export const BackArrowAddonResponsive = ({ view, ...props }: BackArrowAddonResponsiveProps) =>
    view === 'desktop' ? <BackArrowAddonDesktop {...props} /> : <BackArrowAddonMobile {...props} />;
