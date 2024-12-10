import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { PopoverProps } from '@alfalab/core-components-popover';

import { ListPopoverDesktopRestProps } from './types/types';

import styles from '../../index.module.css';

interface ListPopoverDesktopProps
    extends ListPopoverDesktopRestProps,
        Pick<PopoverProps, 'open' | 'anchorElement'> {
    renderOptionsList: () => ReactNode;
}

export const ListPopoverDesktop: FC<ListPopoverDesktopProps> = (props) => {
    const {
        Popover,
        open,
        popoverProps,
        anchorElement,
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
                anchorElement={anchorElement}
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
