import React, { type ElementType } from 'react';
import cn from 'classnames';

import { ButtonDesktop, type ButtonDesktopProps } from '@alfalab/core-components-button/desktop';
import { TypographyText } from '@alfalab/core-components-typography';
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
     * Иконка
     */
    icon?: ElementType;

    /**
     * Размер компонента
     * @default 48 для desktop, 32 для mobile
     */
    size?: ButtonDesktopProps['size'];

    /**
     * Обработчик клика
     */
    onClick?: () => void;

    /**
     * Набор цветов для компонента
     */
    colors?: ColorType;

    /**
     * Дополнительный класс обертки иконки
     */
    iconWrapperClassName?: string;
}

export const BackArrowAddon: React.FC<BackArrowAddonProps> = ({
    text = 'Назад',
    onClick,
    className,
    textOpacity = 1,
    icon,
    view,
    size = view === 'desktop' ? 48 : 32,
    colors = 'default',
    iconWrapperClassName,
    ...htmlAttributes
}) => {
    const isMobileView = view === 'mobile';
    const Icon = icon ?? (view === 'desktop' ? ArrowLeftMediumMIcon : ArrowLeftMIcon);

    return (
        <ButtonDesktop
            view='text'
            size={size}
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
                    className={cn(styles.iconWrapper, iconWrapperClassName, {
                        [styles.mobileWrapper]: isMobileView,
                        [colorStyles[colors].mobileWrapper]: isMobileView,
                    })}
                >
                    <Icon />
                </div>
                {textOpacity > 0 && text && (
                    <TypographyText
                        className={cn(styles.text, colorStyles[colors].text)}
                        view={view === 'desktop' ? 'primary-large' : 'component-primary'}
                        weight='medium'
                        style={{ opacity: textOpacity }}
                    >
                        {text}
                    </TypographyText>
                )}
            </div>
        </ButtonDesktop>
    );
};
