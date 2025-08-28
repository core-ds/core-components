import React from 'react';
import cn from 'classnames';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { TypographyText } from '@alfalab/core-components-typography';

import styles from './index.module.css';

export interface ActionTextAddonProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Текст после иконки
     */
    text: string;

    /**
     * Тип действия
     */
    action?: 'primary' | 'secondary';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Обработчик клика
     */
    onClick?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
}

export const ActionTextAddon: React.FC<ActionTextAddonProps> = ({
    text = 'Назад',
    onClick,
    className,
    action,
    dataTestId,
    ...htmlAttributes
}) => (
    <ButtonMobile
        view='text'
        size='s'
        onClick={onClick}
        aria-label={text}
        className={cn(styles.component, className)}
        dataTestId={dataTestId}
        {...htmlAttributes}
    >
        <TypographyText
            className={styles.text}
            view='component'
            weight={action === 'primary' ? 'medium' : 'regular'}
        >
            {text}
        </TypographyText>
    </ButtonMobile>
);
