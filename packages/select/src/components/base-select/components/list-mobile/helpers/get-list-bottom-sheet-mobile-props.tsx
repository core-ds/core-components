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
        onScroll,
    };
};
