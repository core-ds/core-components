import React, { MouseEvent, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import styles from './index.module.css';

export type BackdropProps = Partial<TransitionProps> & {
    /**
     * Прозрачный бэкдроп
     */
    invisible?: boolean;

    /**
     * Управляет видимостью компонента
     */
    open: boolean;

    /**
     * Обработчик клика по бэкдропу
     */
    onClose?: (event: MouseEvent<HTMLElement>) => void;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Классы анимации
     *
     * http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-classNames
     */
    transitionClassNames?: string | CSSTransitionClassNames;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const Backdrop: React.FC<BackdropProps> = ({
    className,
    open = false,
    invisible = false,
    timeout = 200,
    children,
    onClose,
    dataTestId,
    transitionClassNames = styles,
    ...restProps
}) => (
    <CSSTransition
        timeout={timeout}
        unmountOnExit={true}
        classNames={transitionClassNames}
        in={open}
        appear={true}
        {...restProps}
    >
        <div
            aria-hidden={true}
            onClick={onClose}
            data-test-id={dataTestId}
            className={cn(styles.backdrop, className, {
                [styles.invisible]: invisible,
            })}
        >
            {children}
        </div>
    </CSSTransition>
);
