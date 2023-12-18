import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef, useContext } from 'react';

import { Button, ButtonProps } from '@alfalab/core-components-button';
import { getDataTestId } from '@alfalab/core-components-shared';

import { PureCellContext } from '../../component';

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
    ({ children, dataTestId, ...props }, ref) => {
        const pureCellContext = useContext(PureCellContext);

        return (
            <Button
                {...props}
                size='xxs'
                dataTestId={getDataTestId(dataTestId || pureCellContext.dataTestId, 'button')}
                className={styles.component}
                ref={ref}
            >
                {children}
            </Button>
        );
    },
);
