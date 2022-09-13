import { useMedia } from '@alfalab/hooks';
import React, { FC } from 'react';
import { ConfirmationDesktop } from './component.desktop';
import { ConfirmationMobile } from './component.mobile';
import { ConfirmationProps } from './types';

export type ResponsiveConfirmationProps = Omit<ConfirmationProps, 'confirmationScreens'>;

export type ConfirmationMedia = 'desktop' | 'mobile';

export const ConfirmationResponsive: FC<ResponsiveConfirmationProps> = props => {
    const [view] = useMedia<ConfirmationMedia>(
        [
            ['mobile', '(max-width: 1023px)'],
            ['desktop', '(min-width: 1024px)'],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <ConfirmationDesktop {...props} />
    ) : (
        <ConfirmationMobile {...props} />
    );
};
