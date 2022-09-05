import React, { ComponentType, FC } from 'react';
import { BaseConfirmation } from './components/base-confirmation';
import { InitialDesktop } from './components/screens/initial/component.desktop';
import { HintDesktop } from './components/screens/hint/component.desktop';
import { FatalErrorDesktop } from './components/screens/fatal-error/component.desktop';
import { TempBlockDesktop } from './components/screens/temp-block/component.desktop';
import { ConfirmationProps } from './types';

export type DesktopConfirmationProps = ConfirmationProps;

export const DesktopConfirmationScreens: { [key: string]: ComponentType } = {
    INITIAL: InitialDesktop,
    HINT: HintDesktop,
    FATAL_ERROR: FatalErrorDesktop,
    TEMP_BLOCK: TempBlockDesktop,
};

export const ConfirmationDesktop: FC<DesktopConfirmationProps> = props => (
    <BaseConfirmation confirmationScreens={DesktopConfirmationScreens} {...props} />
);
