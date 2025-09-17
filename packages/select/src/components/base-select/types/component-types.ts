import { type FC, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { type BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import {
    type ModalContentProps,
    type ModalFooterProps,
    type ModalHeaderProps,
} from '@alfalab/core-components-modal/shared';
import { type ModalMobileProps } from '@alfalab/core-components-modal/typings';
import { type PopoverProps } from '@alfalab/core-components-popover';

import {
    type AdditionalMobileProps,
    type BaseSelectProps,
    type BottomSheetSelectMobileProps,
    type ModalSelectMobileProps,
} from '../../../typings';

type PopoverType = ForwardRefExoticComponent<PopoverProps & RefAttributes<HTMLDivElement>>;
type BottomSheetType = ForwardRefExoticComponent<BottomSheetProps & RefAttributes<HTMLDivElement>>;
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
