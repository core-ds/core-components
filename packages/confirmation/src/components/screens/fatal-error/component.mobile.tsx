import React, { FC } from 'react';
import { FatalError, FatalErrorProps } from './component';

export type FatalErrorMobileProps = FatalErrorProps;

export const FatalErrorMobile: FC<FatalErrorMobileProps> = ({ mobile, ...restProps }) => (
    <FatalError mobile={true} {...restProps} />
);
