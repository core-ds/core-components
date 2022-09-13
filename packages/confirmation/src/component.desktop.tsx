import React, { FC } from 'react';
import { BaseConfirmation } from './components/base-confirmation';
import { ConfirmationProps } from './types';

export type DesktopConfirmationProps = Omit<ConfirmationProps, 'mobile'>;

export const ConfirmationDesktop: FC<DesktopConfirmationProps> = props => (
    <BaseConfirmation {...props} />
);
