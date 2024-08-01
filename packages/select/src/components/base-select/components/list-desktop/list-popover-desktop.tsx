import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { ListPopoverDesktopRestProps } from './types/types';

import styles from '../../index.module.css';

type ListPopoverDesktopProps = {
    open: boolean;
    popoverAnchorElement: HTMLElement | null;
    renderOptionsList: () => ReactNode;
} & ListPopoverDesktopRestProps;

export const ListPopoverDesktop: FC<ListPopoverDesktopProps> = (props) => {
    const {
        Popover,
        open,
        popoverProps,
        popoverAnchorElement,
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
                anchorElement={popoverAnchorElement}
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
