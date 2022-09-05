import React, { ComponentType, FC } from 'react';
import { BaseConfirmation } from './components/base-confirmation';
import { InitialMobile } from './components/screens/initial/component.mobile';
import { HintMobile } from './components/screens/hint/component.mobile';
import { FatalErrorMobile } from './components/screens/fatal-error/component.mobile';
import { TempBlockMobile } from './components/screens/temp-block/component.mobile';
import { ConfirmationProps } from './types';

import styles from './mobile.module.css';

export type MobileConfirmationProps = ConfirmationProps;

export const MobileConfirmationScreens: { [key: string]: ComponentType } = {
    INITIAL: InitialMobile,
    HINT: HintMobile,
    FATAL_ERROR: FatalErrorMobile,
    TEMP_BLOCK: TempBlockMobile,
};

export const ConfirmationMobile: FC<MobileConfirmationProps> = props => (
    <BaseConfirmation
        className={styles.container}
        confirmationScreens={MobileConfirmationScreens}
        {...props}
    />
);
