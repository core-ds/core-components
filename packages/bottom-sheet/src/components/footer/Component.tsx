import React, { type FC, type ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';

import { type ColorType } from '../../types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

export type FooterProps = {
    /**
     * Контент футера
     */
    children?: ReactNode;

    /**
     * Фиксирует футер
     */
    sticky?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: ColorType;
};

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export const Footer: FC<FooterProps> = ({
    children,
    className,
    colors = 'default',
    sticky,
    dataTestId,
}) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    const colorStyle = colorStyles[colors];

    return (
        <div
            className={cn(styles.footer, colorStyle.hasContent, className, {
                [styles.sticky]: sticky,
                [colorStyle.highlighted]: footerHighlighted && sticky,
            })}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};
