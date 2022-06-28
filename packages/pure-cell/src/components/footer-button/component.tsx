import React from 'react';

import { Button, ButtonProps } from '@alfalab/core-components-button';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

export const FooterButton: React.FC<ButtonProps> = ({ children, dataTestId, ...props }) => (
    <Button
        {...props}
        size='xxs'
        dataTestId={getDataTestId(dataTestId, 'button')}
        className={styles.component}
    >
        {children}
    </Button>
);
