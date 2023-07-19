import React, { FC, Fragment } from 'react';
import cn from 'classnames';

import { BottomSheet, BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { useMedia } from '@alfalab/hooks';

import { TooltipDesktop, TooltipDesktopProps } from './desktop';
import { useControlled } from './utils';

import styles from './responsive.module.css';

type View = 'desktop' | 'mobile';

export type TooltipResponsiveProps = Omit<TooltipDesktopProps, 'onClose' | 'onOpen'> & {
    /**
     * Режим отображения по умолчанию
     */
    defaultMatch?: View;

    /**
     * Обработчик открытия
     */
    onOpen?: (event?: React.MouseEvent<HTMLElement>) => void;

    /**
     * Обработчик закрытия
     */
    onClose?: (event?: React.MouseEvent<HTMLElement>) => void;

    /**
     * Заголовок кнопки в футере
     */
    actionButtonTitle?: string;

    /**
     * Наличие компонента крестика
     * @deprecated(используйте bottomSheetProps.hasCloser)
     */
    hasCloser?: boolean;

    /**
     *  Дополнительные пропсы компонента BottomSheet
     */
    bottomSheetProps?: Partial<BottomSheetProps>;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const TooltipResponsive: FC<TooltipResponsiveProps> = ({
    defaultMatch = 'mobile',
    content,
    children,
    open,
    onOpen,
    onClose,
    actionButtonTitle = 'Понятно',
    hasCloser,
    targetRef,
    targetClassName,
    bottomSheetProps,
    breakpoint = 1024,
    ...restProps
}) => {
    const [view] = useMedia<View>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        defaultMatch,
    );

    const [openValue, setOpenValueIfUncontrolled] = useControlled(open, false);

    const handleOpen = (event?: React.MouseEvent<HTMLElement>) => {
        if (onOpen) {
            onOpen(event);
        } else {
            setOpenValueIfUncontrolled(true);
        }
    };

    const handleClose = (event?: React.MouseEvent<HTMLElement>) => {
        if (onClose) {
            onClose(event);
        } else {
            setOpenValueIfUncontrolled(false);
        }
    };

    const isMobile = view === 'mobile';

    return isMobile ? (
        <Fragment>
            <BottomSheet
                {...restProps}
                open={Boolean(openValue)}
                onClose={handleClose}
                hasCloser={hasCloser}
                actionButton={
                    <ButtonMobile view='secondary' block={true} size='m' onClick={handleClose}>
                        {actionButtonTitle}
                    </ButtonMobile>
                }
                {...bottomSheetProps}
            >
                {content}
            </BottomSheet>
            {/** TODO: проверить тултип на доступность */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                ref={targetRef as React.Ref<HTMLDivElement>}
                onClick={handleOpen}
                className={cn(styles.target, targetClassName)}
            >
                {children?.props.disabled && <div className={styles.overlap} />}
                {children}
            </div>
        </Fragment>
    ) : (
        <TooltipDesktop
            {...restProps}
            open={open}
            content={content}
            onOpen={handleOpen}
            onClose={handleClose}
            targetClassName={targetClassName}
            targetRef={targetRef}
        >
            {children}
        </TooltipDesktop>
    );
};
