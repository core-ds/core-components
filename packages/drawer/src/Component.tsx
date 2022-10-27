import React, { forwardRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import cn from 'classnames';

import { BaseModal, BaseModalContext, BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import styles from './index.module.css';

export const ANIMATION_DURATION = 600;

export type DrawerProps = Omit<BaseModalProps, 'container'> & {
    /**
     * Край экрана, с которого может появиться Drawer.
     * @default "right"
     */
    placement?: 'left' | 'right';

    /**
     * Нужно ли использовать нативный скроллбар
     * @default true
     */
    nativeScrollbar?: boolean;

    /**
     * Пропсы для анимации контента (CSSTransition)
     */
    contentTransitionProps?: Partial<TransitionProps>;
};

export const DrawerContext = BaseModalContext;

const backdropProps = {
    classNames: {
        enter: styles.backdropEnter,
        appear: styles.backdropEnter,
        enterActive: styles.backdropEnterActive,
        appearActive: styles.backdropEnterActive,
        enterDone: styles.backdropEnterDone,
        appearDone: styles.backdropEnterDone,
        exit: styles.backdropExit,
        exitActive: styles.backdropExitActive,
        exitDone: styles.backdropExitDone,
    },
    timeout: ANIMATION_DURATION,
};

const contentProps = {
    classNames: {
        enter: styles.contentEnter,
        appear: styles.contentEnter,
        enterActive: styles.contentEnterActive,
        appearActive: styles.contentEnterActive,
        exit: styles.contentExit,
        exitActive: styles.contentExitActive,
    },
    timeout: ANIMATION_DURATION,
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
    (
        {
            open,
            className,
            children,
            contentTransitionProps,
            nativeScrollbar = true,
            placement = 'right',
            ...restProps
        },
        ref,
    ) => {
        const isRightPlacement = placement === 'right';
        const isLeftPlacement = placement === 'left';

        const transitionProps = useMemo(() => {
            const enterClassName = cn({
                [styles.enterRight]: isRightPlacement,
                [styles.enterLeft]: isLeftPlacement,
            });

            const exitClassName = cn({
                [styles.exitActiveRight]: isRightPlacement,
                [styles.exitActiveLeft]: isLeftPlacement,
            });

            return {
                classNames: {
                    enter: enterClassName,
                    appear: enterClassName,
                    enterActive: styles.enterActive,
                    appearActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: exitClassName,
                },
                timeout: ANIMATION_DURATION,
                ...restProps.transitionProps,
            };
        }, [restProps.transitionProps, isLeftPlacement, isRightPlacement]);

        const renderWithNativeScrollbar = () => <div className={styles.content}>{children}</div>;

        const renderWithCustomScrollbar = () => (
            <Scrollbar className={styles.simplebar}>{children}</Scrollbar>
        );

        return (
            <BaseModal
                {...restProps}
                scrollHandler='content'
                ref={ref}
                open={open}
                className={cn(styles.component, className, {
                    [styles.rightPlacement]: isRightPlacement,
                    [styles.leftPlacement]: isLeftPlacement,
                })}
                transitionProps={transitionProps}
                backdropProps={{ ...backdropProps, ...restProps.backdropProps }}
            >
                <CSSTransition
                    {...{ ...contentProps, ...contentTransitionProps }}
                    appear={true}
                    in={open}
                >
                    {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}
                </CSSTransition>
            </BaseModal>
        );
    },
);
