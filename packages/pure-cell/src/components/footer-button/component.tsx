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

type FooterButtonMouseEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent> &
    React.MouseEvent<HTMLButtonElement, MouseEvent>;

type FooterButtonMouseEventHandler =
    | React.MouseEventHandler<HTMLAnchorElement>
    | React.MouseEventHandler<HTMLButtonElement>;

export const FooterButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, FooterButtonProps>(
    ({ children, dataTestId, onClick, onMouseDown, onMouseEnter, onMouseLeave, ...props }, ref) => {
        const pureCellContext = useContext(PureCellContext);

        const handleClick = (e: FooterButtonMouseEvent) => {
            e.stopPropagation();
            (onClick as FooterButtonMouseEventHandler)?.(e);
        };

        const handleMouseEnter = (e: FooterButtonMouseEvent) => {
            (onMouseEnter as FooterButtonMouseEventHandler)?.(e);
            pureCellContext.unsetMainHover?.();
        };

        const handleMouseLeave = (e: FooterButtonMouseEvent) => {
            (onMouseLeave as FooterButtonMouseEventHandler)?.(e);
            pureCellContext.setMainHover?.();
        };

        const handleMouseDown = (e: FooterButtonMouseEvent) => {
            (onMouseDown as FooterButtonMouseEventHandler)?.(e);
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
