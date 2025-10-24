import React from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { Text } from '@alfalab/core-components-typography';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

type ColorType = 'default' | 'inverted';

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

    /**
     * Набор цветов для компонента
     */
    colors?: ColorType;
}

export const BackArrowAddon: React.FC<BackArrowAddonProps> = ({
    text = 'Назад',
    onClick,
    className,
    textOpacity = 1,
    view,
    colors = 'default',
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
            className={cn(
                styles.component,
                colorStyles[colors].component,
                { [styles.mobileComponent]: isMobileView },
                className,
            )}
            {...htmlAttributes}
        >
            <div className={styles.flex}>
                <div
                    className={cn(styles.iconWrapper, {
                        [styles.mobileWrapper]: isMobileView,
                        [colorStyles[colors].mobileWrapper]: isMobileView,
                    })}
                >
                    <Icon />
                </div>
                {textOpacity > 0 && text && (
                    <Text
                        className={cn(styles.text, colorStyles[colors].text)}
                        view={view === 'desktop' ? 'primary-large' : 'component'}
                        weight='medium'
                        style={{ opacity: textOpacity }}
                    >
                        {text}
                    </Text>
                )}
            </div>
        </ButtonDesktop>
    );
};
