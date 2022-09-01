import React, { FC } from 'react';
import { BaseConfirmation } from './components/base-confirmation';
import { ConfirmationProps } from './types';

export type BaseConfirmationProps = ConfirmationProps;

export const ConfirmationDesktop: FC<BaseConfirmationProps> = ({ ...restProps }) => (
    <BaseConfirmation {...restProps} />
);
