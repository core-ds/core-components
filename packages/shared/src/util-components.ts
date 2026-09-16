import { type FC, type ReactNode } from 'react';

export const NoopComponent: FC<unknown> = (): undefined => {};

export const PassThroughComponent: FC<{ children?: ReactNode }> = ({ children }) => children;
