import { ComponentProps } from '../../../types/component-types';

// отделяем необходимые пропсы для передачи в компонент
export const getListBottomSheetMobileProps = (props: ComponentProps) => {
    const {
        BottomSheet,
        dataTestId,
        label,
        placeholder,
        footer,
        swipeable,
        showSearch,
        bottomSheetProps,
        isBottomSheet = true,
        nativeSelect = false,
        onScroll,
    } = props;

    return {
        BottomSheet,
        dataTestId,
        label,
        placeholder,
        footer,
        swipeable,
        showSearch,
        bottomSheetProps,
        isBottomSheet,
        nativeSelect,
        onScroll,
    };
};
