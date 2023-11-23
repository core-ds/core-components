import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';

import { Button, ButtonProps } from '@alfalab/core-components-button';
import { getDataTestId } from '@alfalab/core-components-shared';

import styles from './index.module.css';

type ComponentProps = Omit<ButtonProps, 'dataTestId'> & {
    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -button
     */
    dataTestId?: string;
};

type FooterButtonProps = ComponentProps &
    Partial<AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>>;

export const FooterButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, FooterButtonProps>(
    ({ children, dataTestId, ...props }, ref) => (
        <Button
            {...props}
            size='xxs'
            dataTestId={getDataTestId(dataTestId, 'button')}
            className={styles.component}
            ref={ref}
        >
            {children}
        </Button>
    ),
);
