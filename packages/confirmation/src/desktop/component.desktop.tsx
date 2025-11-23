import React, { type FC } from 'react';

import { BaseConfirmation } from '../components/base-confirmation';
import { type ConfirmationProps } from '../types';

export type DesktopConfirmationProps = Omit<ConfirmationProps, 'mobile' | 'breakpoint'>;

export const ConfirmationDesktop: FC<DesktopConfirmationProps> = (props) => (
    <BaseConfirmation {...props} />
);
