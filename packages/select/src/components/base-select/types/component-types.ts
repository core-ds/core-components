import React, { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

import type { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import type {
    ModalContentProps,
    ModalFooterProps,
    ModalHeaderProps,
} from '@alfalab/core-components-modal/shared';
import type { ModalMobileProps } from '@alfalab/core-components-modal/typings';
import type { PopoverProps } from '@alfalab/core-components-popover';

export type PopoverType = ForwardRefExoticComponent<PopoverProps & RefAttributes<HTMLDivElement>>;
export type BottomSheetType = React.ForwardRefExoticComponent<
    BottomSheetProps & React.RefAttributes<HTMLDivElement>
>;
export type ModalMobileType = ForwardRefExoticComponent<
    ModalMobileProps & RefAttributes<HTMLDivElement>
> & {
    Header: FC<ModalHeaderProps>;
    Footer: FC<ModalFooterProps>;
    Content: FC<ModalContentProps>;
};
