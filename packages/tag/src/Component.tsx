import React, { ButtonHTMLAttributes, forwardRef, ReactNode, RefObject, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStylesMap = {
    default: defaultColors,
    inverted: invertedColors,
};

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type TagProps = Omit<NativeProps, 'onClick'> & {
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;

    /**
     * Размер компонента
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;

    /**
     * Дополнительный класс для обёртки children
     */
    childrenClassName?: string;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Обработчик нажатия
     */
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        payload: {
            checked: boolean;
            name?: string;
        },
    ) => void;

    /**
     * ref на children
     */

    childrenRef?: RefObject<HTMLSpanElement>;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Используйте props shape и view
     * Вариант тега
     */
    variant?: 'default' | 'alt';

    /**
     * Форма тега
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Стиль тега
     */
    view?: 'outlined' | 'filled';
};

export const Tag = forwardRef<HTMLButtonElement, TagProps>(
    (
        {
            rightAddons,
            leftAddons,
            children,
            size = 's',
            checked,
            className,
            dataTestId,
            name,
            colors = 'default',
            onClick,
            variant = 'default',
            shape,
            view = 'outlined',
            childrenClassName,
            childrenRef,
            ...restProps
        },
        ref,
    ) => {
        const colorStyles = colorStylesMap[colors];

        const tagRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(tagRef, 'keyboard');

        const variantClassName = variant === 'default' ? 'rounded' : 'rectangular';

        const shapeClassName = shape || variantClassName;

        const tagProps = {
            className: cn(
                styles.component,
                colorStyles.component,
                styles[size],
                colorStyles[view],
                styles[shapeClassName],
                {
                    [styles.checked]: checked,
                    [colorStyles.checked]: checked,
                    [styles.focused]: focused,
                    [styles.withRightAddons]: Boolean(rightAddons),
                    [styles.withLeftAddons]: Boolean(leftAddons),
                },
                className,
            ),
            'data-test-id': dataTestId,
        };

        const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (onClick) {
                onClick(event, { name, checked: !checked });
            }
        };

        return (
            <button
                ref={mergeRefs([tagRef, ref])}
                type='button'
                onClick={handleClick}
                {...tagProps}
                {...restProps}
            >
                {leftAddons ? <span className={styles.addons}>{leftAddons}</span> : null}

                {children && (
                    <span ref={childrenRef} className={childrenClassName}>
                        {children}
                    </span>
                )}

                {rightAddons ? <span className={styles.addons}>{rightAddons}</span> : null}
            </button>
        );
    },
);
