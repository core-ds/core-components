import { ComponentProps } from '../../../types/component-types';

// отделяем необходимые пропсы для передачи в компонент
export const useListPopoverDesktopProps = (props: ComponentProps) => {
    const {
        Popover,
        popoverProps,
        popoverPosition = 'bottom-start',
        preventFlip = true,
        popperClassName,
        updatePopover,
        zIndexPopover,
    } = props;

    return {
        Popover,
        popoverProps,
        popoverPosition,
        preventFlip,
        popperClassName,
        updatePopover,
        zIndexPopover,
    };
};
