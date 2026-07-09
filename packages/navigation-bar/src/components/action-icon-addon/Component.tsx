import React from 'react';
import cn from 'classnames';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { ChevronLeftMIcon } from '@alfalab/icons-glyph/ChevronLeftMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import styles from './index.module.css';

export interface ActionIconAddonProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Тип действия
     */
    action?: 'back' | 'floatingBack' | 'close';

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

const iconComponents = {
    back: <ChevronLeftMIcon />,
    floatingBack: <ChevronLeftMIcon className={styles.floating} />,
    close: <CrossMIcon className={styles.floating} />,
};

export const ActionIconAddon: React.FC<ActionIconAddonProps> = ({
    onClick,
    className,
    action = 'back',
    dataTestId,
    ...htmlAttributes
}) => (
    <ButtonMobile
        view='text'
        size={48}
        onClick={onClick}
        aria-label={action === 'close' ? 'закрыть' : 'назад'}
        className={cn(styles.component, className)}
        dataTestId={dataTestId}
        {...htmlAttributes}
    >
        <div className={cn(styles.iconWrapper, { [styles[action]]: Boolean(styles[action]) })}>
            {iconComponents[action]}
        </div>
    </ButtonMobile>
);
