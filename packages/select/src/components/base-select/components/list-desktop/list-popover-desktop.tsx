import React, { FC, ReactNode, RefObject } from 'react';
import cn from 'classnames';

import { useListPopoverDesktopProps } from './hooks/use-list-popover-desktop-props';

import styles from '../../index.module.css';

type ListPopoverDesktopProps = {
    open: boolean;
    fieldRef: RefObject<HTMLInputElement>;
    renderOptionsList: () => ReactNode;
} & ReturnType<typeof useListPopoverDesktopProps>;

export const ListPopoverDesktop: FC<ListPopoverDesktopProps> = (props) => {
    const {
        Popover,
        open,
        popoverProps,
        fieldRef,
        popoverPosition = 'bottom-start',
        preventFlip = true,
        popperClassName,
        updatePopover,
        zIndexPopover,
        renderOptionsList,
    } = props;

    if (Popover) {
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
    }

    return null;
};
