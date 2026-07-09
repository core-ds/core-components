import React, { type FC } from 'react';

import { BaseConfirmation } from '../components/base-confirmation';
import { type ConfirmationProps } from '../types';

export type MobileConfirmationProps = Omit<ConfirmationProps, 'mobile'>;

export const ConfirmationMobile: FC<MobileConfirmationProps> = ({ maxWidth, ...restProps }) => (
    <BaseConfirmation mobile={true} maxWidth={maxWidth ?? 288} {...restProps} />
);
