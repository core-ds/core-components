import { useMedia } from '@alfalab/hooks';
import React, { FC } from 'react';
import { ConfirmationDesktop, DesktopConfirmationScreens } from './component.desktop';
import { ConfirmationMobile, MobileConfirmationScreens } from './component.mobile';
import { ConfirmationProps } from './types';

export type ResponsiveConfirmationProps = ConfirmationProps;

export type ConfirmationMedia = 'desktop' | 'mobile';

export const ConfirmationResponsive: FC<ResponsiveConfirmationProps> = props => {
    const [view] = useMedia<ConfirmationMedia>(
        [
            ['mobile', '(max-width: 767px)'],
            ['desktop', '(min-width: 768px)'],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <ConfirmationDesktop confirmationScreens={DesktopConfirmationScreens} {...props} />
    ) : (
        <ConfirmationMobile confirmationScreens={MobileConfirmationScreens} {...props} />
    );
};
