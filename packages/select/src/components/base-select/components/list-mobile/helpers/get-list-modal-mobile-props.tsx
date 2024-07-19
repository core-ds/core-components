import { ComponentProps } from '../../../types/component-types';

// отделяем необходимые пропсы для передачи в компонент
export const getListModalMobileProps = (props: ComponentProps) => {
    const {
        ModalMobile,
        dataTestId,
        modalProps,
        modalHeaderProps,
        modalFooterProps,
        label,
        placeholder,
        isBottomSheet = true,
        nativeSelect = false,
        onScroll,
    } = props;

    return {
        ModalMobile,
        dataTestId,
        modalProps,
        modalHeaderProps,
        modalFooterProps,
        label,
        placeholder,
        isBottomSheet,
        nativeSelect,
        onScroll,
    };
};
