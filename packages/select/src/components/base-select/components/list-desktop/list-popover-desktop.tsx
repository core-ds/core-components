import React, { FC, ReactNode, RefObject } from 'react';
import cn from 'classnames';

import { ListPopoverDesktopRestProps } from './types/types';

import styles from '../../index.module.css';

type ListPopoverDesktopProps = {
    open: boolean;
    fieldRef: RefObject<HTMLInputElement>;
    renderOptionsList: () => ReactNode;
} & ListPopoverDesktopRestProps;

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
