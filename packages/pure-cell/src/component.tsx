import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ElementType,
    forwardRef,
    HTMLAttributes,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import { Addon } from './components/addon';
import { Amount } from './components/amount';
import { AmountTitle } from './components/amount-title';
import { Category } from './components/category';
import { Comment } from './components/comment';
import { Content } from './components/content';
import { Footer } from './components/footer';
import { FooterButton } from './components/footer-button';
import { FooterText } from './components/footer-text';
import { Graphics } from './components/graphics';
import { Main } from './components/main';
import { Text } from './components/text';
import { PureCellElement } from './components/types';

import styles from './index.module.css';

export type PureCellContext = {
    /** Направление */
    direction?: 'horizontal' | 'vertical';
};

export const PureCellContext = React.createContext<PureCellContext>({});

export type PureCellProps = {
    /**
     * Направление
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * Сss класс для стилизации общей обёртки
     */
    className?: string;

    /**
     * Выводит ссылку в виде ячейки
     */
    href?: string;

    /**
     * Вертикальные отступы
     */
    verticalPadding?: 'airy' | 'default' | 'compact' | 'tiny' | 'none';

    /**
     * Горизонтальные отступы
     */
    horizontalPadding?: 'left' | 'right' | 'both' | 'none';

    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    tag?: ElementType;
    /**
     * Компоненты
     */
    children: PureCellElement;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
type AnchorPureCellProps = PureCellProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonPureCellProps = PureCellProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ElementPureCellProps = PureCellProps & HTMLAttributes<HTMLElement>;
type PureProps = Partial<AnchorPureCellProps | ButtonPureCellProps | ElementPureCellProps>;

const PureCellComponent = forwardRef<HTMLElement, PureProps>(
    (
        {
            className,
            dataTestId,
            onClick,
            href,
            tag: Component = (href && 'a') || (onClick && 'button') || 'section',
            children,
            horizontalPadding = 'default',
            verticalPadding = 'none',
            direction = 'horizontal',
            ...restProps
        },
        ref,
    ) => {
        const cellRef = useRef<HTMLDivElement>(null);
        const [focused] = useFocus(cellRef, 'keyboard');
        const addClasses = {
            [styles.component]: true,
            [styles.focused]: focused,
            [styles[direction]]: true,
        };

        if (href) {
            const { target } = restProps as AnchorHTMLAttributes<HTMLAnchorElement>;

            // Для совместимости с react-router-dom, меняем href на to
            const hrefProps = { [typeof Component === 'string' ? 'href' : 'to']: href };

            return (
                <Component
                    rel={target === '_blank' ? 'noreferrer noopener' : undefined}
                    {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                    {...hrefProps}
                    ref={mergeRefs([cellRef, ref])}
                    className={cn(
                        styles.link,
                        addClasses,
                        className,
                        styles[horizontalPadding],
                        styles[verticalPadding],
                    )}
                    data-test-id={dataTestId}
                    onClick={onClick}
                >
                    <PureCellContext.Provider value={{ direction }}>
                        {children}
                    </PureCellContext.Provider>
                </Component>
            );
        }

        if (onClick) {
            return (
                <Component
                    {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                    ref={mergeRefs([cellRef, ref])}
                    className={cn(
                        styles.button,
                        addClasses,
                        styles[horizontalPadding],
                        styles[verticalPadding],
                        className,
                    )}
                    data-test-id={dataTestId}
                    onClick={onClick}
                >
                    <PureCellContext.Provider value={{ direction }}>
                        {children}
                    </PureCellContext.Provider>
                </Component>
            );
        }

        return (
            <Component
                ref={ref}
                tabIndex={0}
                className={cn(
                    addClasses,
                    styles[horizontalPadding],
                    styles[verticalPadding],
                    className,
                )}
                data-test-id={dataTestId}
            >
                <PureCellContext.Provider value={{ direction }}>
                    {children}
                </PureCellContext.Provider>
            </Component>
        );
    },
);

/**
 * Универсальный конструктор для сборки любой ячейки.
 *
 * [Макет](https://www.figma.com/file/KlFOLLkKO8rtvvQE3RXuhq/Click-Library?node-id=43525%3A240018)
 */
export const PureCell = Object.assign(PureCellComponent, {
    Main,
    Graphics,
    Content,
    Text,
    Amount,
    AmountTitle,
    Addon,
    Footer,
    ExtraSubtitle: FooterText,
    FooterButton,
    Comment,
    Category,
});
