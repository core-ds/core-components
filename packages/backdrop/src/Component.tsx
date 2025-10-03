import React, { type MouseEvent, type ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { type CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { type TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import styles from './index.module.css';

export type BackdropProps = Partial<TransitionProps> & {
    /**
     * Прозрачный бэкдроп
     * @deprecated данное свойство больше не используется, временно оставлено для обратной совместимости
     * Используйте свойство transparent
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

    /**
     * Управляет прозрачностью бэкдроп
     * @default false
     */
    transparent?: boolean;
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
    transparent = false,
    ...restProps
}) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            timeout={timeout}
            unmountOnExit={true}
            classNames={transitionClassNames}
            in={!invisible && open}
            appear={true}
            {...restProps}
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                aria-hidden={true}
                onClick={onClose}
                data-test-id={dataTestId}
                className={cn(styles.backdrop, className, {
                    [styles.transparent]: transparent,
                })}
            >
                {children}
            </div>
        </CSSTransition>
    );
};
