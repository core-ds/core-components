import React, { FC, ReactNode, RefObject } from 'react';
import cn from 'classnames';

import type { PopoverProps, Position } from '@alfalab/core-components-popover';
import { BaseSelectProps } from '@alfalab/core-components-select/typings';

import { PopoverType } from '../../types/component-types';

import styles from '../../index.module.css';

type ListPopoverDesktopProps = {
    Popover: PopoverType;
    open: boolean;
    popoverProps: BaseSelectProps['popoverProps'];
    fieldRef: RefObject<HTMLInputElement>;
    popoverPosition: Position;
    preventFlip: boolean;
    popperClassName?: string;
    updatePopover: PopoverProps['update'];
    zIndexPopover: PopoverProps['zIndex'];
    renderOptionsList: () => ReactNode;
};

export const ListPopoverDesktop: FC<ListPopoverDesktopProps> = (props) => {
    const {
        Popover,
        open,
        popoverProps,
        fieldRef,
        popoverPosition,
        preventFlip,
        popperClassName,
        updatePopover,
        zIndexPopover,
        renderOptionsList,
    } = props;

    return (
        <Popover
            {...popoverProps}
            open={open}
            withTransition={false}
            anchorElement={fieldRef.current as HTMLElement}
            position={popoverPosition}
            preventFlip={preventFlip}
            popperClassName={cn(styles.popoverInner, popperClassName)}
            update={updatePopover}
            zIndex={zIndexPopover}
        >
            {renderOptionsList()}
        </Popover>
    );
};
