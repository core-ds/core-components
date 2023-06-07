import React, { FC } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { TooltipMobile } from './Component.mobile';
import { TooltipDesktop } from './desktop';
import { TooltipResponsiveProps } from './types';
import { useControlled } from './utils';

export const TooltipResponsive: FC<TooltipResponsiveProps> = ({
    defaultMatchMediaValue,
    children,
    open,
    onOpen,
    onClose,
    actionButtonTitle,
    bottomSheetProps,
    breakpoint = 1024,
    ...restProps
}) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

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

    return isDesktop ? (
        <TooltipDesktop {...restProps} open={open} onOpen={handleOpen} onClose={handleClose}>
            {children}
        </TooltipDesktop>
    ) : (
        <TooltipMobile
            {...restProps}
            {...bottomSheetProps}
            actionButtonTitle={actionButtonTitle}
            open={Boolean(openValue)}
            onOpen={handleOpen}
            onClose={handleClose}
        >
            {children}
        </TooltipMobile>
    );
};
