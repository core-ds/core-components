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
    ({ children, dataTestId, onClick, onMouseDown, onMouseEnter, onMouseLeave, ...props }, ref) => {
        const pureCellContext = useContext(PureCellContext);

        const handleClick = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            e.stopPropagation();
            (
                onClick as
                    | React.MouseEventHandler<HTMLAnchorElement>
                    | React.MouseEventHandler<HTMLButtonElement>
            )?.(e);
        };

        const handleMouseEnter = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            (
                onMouseEnter as
                    | React.MouseEventHandler<HTMLAnchorElement>
                    | React.MouseEventHandler<HTMLButtonElement>
            )?.(e);
            pureCellContext.unsetMainHover?.();
        };

        const handleMouseLeave = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            (
                onMouseLeave as
                    | React.MouseEventHandler<HTMLAnchorElement>
                    | React.MouseEventHandler<HTMLButtonElement>
            )?.(e);
            pureCellContext.setMainHover?.();
        };

        const handleMouseDown = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            (
                onMouseDown as
                    | React.MouseEventHandler<HTMLAnchorElement>
                    | React.MouseEventHandler<HTMLButtonElement>
            )?.(e);
            e.stopPropagation();
        };

        return (
            <Button
                {...props}
                size='xxs'
                dataTestId={getDataTestId(dataTestId || pureCellContext.dataTestId, 'button')}
                className={styles.component}
                ref={ref}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
            >
                {children}
            </Button>
        );
    },
);
