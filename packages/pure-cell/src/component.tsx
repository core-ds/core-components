/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ElementType,
    forwardRef,
    HTMLAttributes,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonProps } from '@alfalab/core-components-button';
import { Comment } from '@alfalab/core-components-comment';
import { useFocus } from '@alfalab/hooks';

import { Addon } from './components/addon';
import { Amount } from './components/amount';
import { AmountTitle } from './components/amount-title';
import { Category } from './components/category';
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
    dataTestId?: string;
    setMainHover?: () => void;
    unsetMainHover?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PureCellContext = React.createContext<PureCellContext>({});

type BasePureCellProps = {
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
    verticalPadding?:
        | 'airy'
        | 'default'
        | 'compact'
        | 'tiny'
        | 'none'
        | {
              /**
               * Вертикальный отступ сверху
               */
              top?: 'airy' | 'default' | 'compact' | 'tiny' | 'none';
              /**
               * Вертикальный отступ снизу
               */
              bottom?: 'airy' | 'default' | 'compact' | 'tiny' | 'none';
          };

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
type AnchorPureCellProps = BasePureCellProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonPureCellProps = BasePureCellProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ElementPureCellProps = BasePureCellProps & HTMLAttributes<HTMLElement>;
export type PureCellProps = Partial<
    AnchorPureCellProps | ButtonPureCellProps | ElementPureCellProps
>;

const PureCellComponent = forwardRef<HTMLElement, PureCellProps>(
    (
        {
            className,
            dataTestId,
            onClick,
            href,
            tag: Component = (href && 'a') || (onClick && 'button') || 'section',
            children,
            horizontalPadding = 'none',
            verticalPadding = 'none',
            direction = 'horizontal',
            ...restProps
        },
        ref,
    ) => {
        const cellRef = useRef<HTMLDivElement>(null);
        const [focused] = useFocus(cellRef, 'keyboard');
        const [hoverState, setHoverState] = useState<boolean>(false);
        const [activeState, setActiveState] = useState<boolean>(false);

        const setHover = () => setHoverState(true);
        const unsetHover = () => setHoverState(false);
        const setActive = () => setActiveState(true);

        const unsetActive = () => setActiveState(false);

        const mouseEvents = {
            onMouseEnter: setHover,
            onMouseLeave: unsetHover,
            onMouseDown: setActive,
            onMouseUp: unsetActive,
        };

        const addClasses = {
            [styles.component]: true,
            [styles.focused]: focused,
            [styles[direction]]: true,
            [styles[horizontalPadding]]: true,
            [styles.hover]: hoverState,
            [styles.active]: activeState,
        };

        const contextState: PureCellContext = {
            direction,
            dataTestId,
            setMainHover: setHover,
            unsetMainHover: unsetHover,
        };

        if (typeof verticalPadding === 'string') {
            addClasses[styles[verticalPadding as string]] = typeof verticalPadding === 'string';
        }

        if (typeof verticalPadding === 'object') {
            addClasses[styles[`${verticalPadding.top}Top`]] = !!verticalPadding.top;
            addClasses[styles[`${verticalPadding.bottom}Bottom`]] = !!verticalPadding.bottom;
        }

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
                    className={cn(styles.link, addClasses, className)}
                    data-test-id={dataTestId}
                    onClick={onClick}
                    {...mouseEvents}
                >
                    <PureCellContext.Provider value={contextState}>
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
                    className={cn(styles.button, addClasses, className)}
                    data-test-id={dataTestId}
                    onClick={onClick}
                    {...mouseEvents}
                >
                    <PureCellContext.Provider value={contextState}>
                        {children}
                    </PureCellContext.Provider>
                </Component>
            );
        }

        return (
            <Component
                {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                ref={ref}
                tabIndex={0}
                className={cn(addClasses, className)}
                data-test-id={dataTestId}
            >
                <PureCellContext.Provider value={contextState}>{children}</PureCellContext.Provider>
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
