import React, { AnchorHTMLAttributes, ElementType, forwardRef, ReactNode, useRef } from 'react';
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

interface IHrefConfig {
    href: string;
    hrefType?: 'href' | 'to';
}

type NativeProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export interface ILinkProps extends NativeProps {
    /**
     * Имя пропа для передачи href в кастомный компонент
     * Позволяет явно указывать какой проп использовать для передачи href в кастомный компонент (href/to).
     */
    href?: string | IHrefConfig;

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
}

export const Link = forwardRef<HTMLAnchorElement, ILinkProps>(
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

        const hrefProp = typeof href === 'string' ? 'href' : href?.hrefType || 'href';
        const hrefValue = typeof href === 'string' ? href : href?.href;

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
            ...{ [hrefProp]: hrefValue },
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
