import React from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { Typography } from '@alfalab/core-components-typography';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';

import styles from './index.module.css';

export interface BackArrowAddonProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Текст после иконки
     */
    text?: string | null;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Вид компонента
     */
    view: 'mobile' | 'desktop';

    /**
     * Прозрачность текста
     */
    textOpacity?: number;

    /**
     * Обработчик клика
     */
    onClick?: () => void;
}

export const BackArrowAddon: React.FC<BackArrowAddonProps> = ({
    text = 'Назад',
    onClick,
    className,
    textOpacity = 1,
    view,
    ...htmlAttributes
}) => {
    const Icon = view === 'desktop' ? ArrowLeftMediumMIcon : ArrowLeftMIcon;
    const isMobileView = view === 'mobile';

    return (
        <ButtonDesktop
            view='text'
            size={isMobileView ? 'xxs' : 's'}
            onClick={onClick}
            aria-label='назад'
            className={cn(styles.component, { [styles.mobileComponent]: isMobileView }, className)}
            {...htmlAttributes}
        >
            <div className={styles.flex}>
                <div
                    className={cn(styles.iconWrapper, {
                        [styles.mobileWrapper]: isMobileView,
                    })}
                >
                    <Icon />
                </div>
                {textOpacity > 0 && text && (
                    <Typography.Text
                        className={styles.text}
                        view={view === 'desktop' ? 'primary-large' : 'component'}
                        weight='medium'
                        style={{ opacity: textOpacity }}
                    >
                        {text}
                    </Typography.Text>
                )}
            </div>
        </ButtonDesktop>
    );
};
