import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithBackArrowWithCenterTitleProps = {
    title: string;
    onBack: () => void;
};

export const getHeaderWithBackArrowWithCenterTitleMobile = ({
    title,
    onBack,
}: GetHeaderWithBackArrowWithCenterTitleProps) => ({
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_BACK_ARROW_WITH_CENTER_TITLE,
        title,
        onBack,
    },
});
