import React, {
    type AnchorHTMLAttributes,
    type ElementType,
    forwardRef,
    type ReactNode,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

type NativeProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkProps = NativeProps & {
    /**
     * URL для перехода (native prop)
     */
    href?: string;

    /**
     * Тип ссылки
     */
    view?: 'primary' | 'secondary' | 'default';

    /**
     * Пунктирное подчеркивание
     */
    pseudo?: boolean;

    /**
     * Включает / отключает подчеркивание
     * @default true
     */
    underline?: boolean;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: ElementType;

    /**
     * Дополнительный класс (native prop)
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Обработчик нажатия (native prop)
     */
    onClick?: NativeProps['onClick'];

    /**
     * Дочерние элементы (native prop)
     */
    children: ReactNode;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            view = 'primary',
            pseudo = false,
            underline = true,
            leftAddons,
            rightAddons,
            className,
            dataTestId,
            children,
            colors = 'default',
            href,
            Component = pseudo ? 'button' : 'a',
            ...restProps
        },
        ref,
    ) => {
        const linkRef = useRef<HTMLAnchorElement>(null);

        const [focused] = useFocus(linkRef, 'keyboard');

        const viewClassName = view === 'default' ? 'defaultView' : view;

        const componentProps = {
            className: cn(
                styles.component,
                colorStyles[colors][viewClassName],
                {
                    [styles.withoutUnderline]: !underline && !pseudo,
                    [styles.pseudo]: pseudo,
                    [styles.focused]: focused,
                    [styles.withAddons]: leftAddons || rightAddons,
                },
                className,
            ),
            'data-test-id': dataTestId,
            rel: restProps.target === '_blank' ? 'noreferrer noopener' : undefined,
            // Для совместимости с react-router-dom, меняем href на to
            [typeof Component === 'string' ? 'href' : 'to']: href,
            ...(pseudo && { type: 'button' }),
        };

        return (
            <Component {...componentProps} {...restProps} ref={mergeRefs([linkRef, ref])}>
                {leftAddons || rightAddons ? (
                    <React.Fragment>
                        {leftAddons && <span className={styles.addons}>{leftAddons}</span>}
                        {children && (
                            <span>
                                <span className={styles.text}>{children}</span>
                            </span>
                        )}
                        {rightAddons && <span className={styles.addons}>{rightAddons}</span>}
                    </React.Fragment>
                ) : (
                    <span className={styles.text}>{children}</span>
                )}
            </Component>
        );
    },
);

/**
 * Для отображения в сторибуке
 */
Link.defaultProps = {
    view: 'primary',
    pseudo: false,
};

Link.displayName = 'Link';
