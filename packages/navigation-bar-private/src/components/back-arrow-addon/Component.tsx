import React, { type FC, type SVGProps } from 'react';
import cn from 'classnames';

// TODO Нужно ли для мобильной версии брать мобильную кнопку?
import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { Text } from '@alfalab/core-components-typography';

import type stylesDesktop from './index.module.css';
import type stylesMobile from './mobile.module.css';

/** BackArrowAddon Desktop / Mobile Props */
export interface BackArrowAddonBaseProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Текст после иконки
     */
    text?: string | null;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Прозрачность текста
     */
    textOpacity?: number;

    /**
     * Обработчик клика
     */
    onClick?: () => void;
}

type BackArrowAddonPrivateProps = {
    /**
     * Вид компонента
     */
    view: 'mobile' | 'desktop';

    /**
     * Иконка
     */
    Icon: FC<SVGProps<SVGSVGElement>>;

    /**
     * Стили
     */
    styles: typeof stylesDesktop | typeof stylesMobile;
};

export const BackArrowAddonBase = ({
    text = 'Назад',
    onClick,
    className,
    textOpacity = 1,
    view,
    Icon,
    styles,
    ...htmlAttributes
}: BackArrowAddonBaseProps & BackArrowAddonPrivateProps) => {
    const isMobileView = view === 'mobile';

    return (
        <ButtonDesktop
            view='text'
            size={isMobileView ? 'xxs' : 's'}
            onClick={onClick}
            aria-label='назад'
            className={cn(styles.component, className)}
            {...htmlAttributes}
        >
            <div className={styles.flex}>
                <div className={styles.iconWrapper}>
                    <Icon />
                </div>
                {textOpacity > 0 && text && (
                    <Text
                        className={styles.text}
                        view={isMobileView ? 'component' : 'primary-large'}
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
