import React, { FC, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { BottomSheetProps } from '@balafla/core-components-bottom-sheet';
import type {
    ModalContentProps,
    ModalFooterProps,
    ModalHeaderProps,
} from '@balafla/core-components-modal/shared';
import type { ModalMobileProps } from '@balafla/core-components-modal/typings';
import type { PopoverProps } from '@balafla/core-components-popover';

import type {
    AdditionalMobileProps,
    BaseSelectProps,
    BottomSheetSelectMobileProps,
    ModalSelectMobileProps,
} from '../../../typings';

type PopoverType = ForwardRefExoticComponent<PopoverProps & RefAttributes<HTMLDivElement>>;
type BottomSheetType = React.ForwardRefExoticComponent<
    BottomSheetProps & React.RefAttributes<HTMLDivElement>
>;
type ModalMobileType = ForwardRefExoticComponent<
    ModalMobileProps & RefAttributes<HTMLDivElement>
> & {
    Header: FC<ModalHeaderProps>;
    Footer: FC<ModalFooterProps>;
    Content: FC<ModalContentProps>;
};

export type ComponentProps = BaseSelectProps &
    AdditionalMobileProps &
    BottomSheetSelectMobileProps &
    ModalSelectMobileProps & {
        isBottomSheet?: boolean;
        view: 'desktop' | 'mobile';
        Popover?: PopoverType;
        BottomSheet?: BottomSheetType;
        ModalMobile?: ModalMobileType;
    };
