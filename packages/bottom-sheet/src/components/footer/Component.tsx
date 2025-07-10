import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';

import { ColorType } from '../../types';
import { getColorStyles } from '../../utils';

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
     */
    colors?: ColorType;
};

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

    const colorStyle = getColorStyles(colors, defaultColors, invertedColors);

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
