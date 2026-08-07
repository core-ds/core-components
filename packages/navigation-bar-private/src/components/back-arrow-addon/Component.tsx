import React from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { ChevronLeftLine24Icon } from '@alfalab/icons-glyph-26/ChevronLeftLine24Icon';

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
     * Дополнительный класс
     */
    className?: string;

    /**
     * Вид компонента
     */
    view: 'mobile' | 'desktop';

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
    onClick,
    className,
    view,
    colors = 'default',
    ...htmlAttributes
}) => {
    const Icon = view === 'desktop' ? ArrowLeftMediumMIcon : ChevronLeftLine24Icon;
    const isMobileView = view === 'mobile';

    return (
        <ButtonDesktop
            view='text'
            size={isMobileView ? 40 : 48}
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
            </div>
        </ButtonDesktop>
    );
};
