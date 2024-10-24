import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithBackArrowWithCenterTitleProps = {
    title: string;
};

export const getHeaderWithBackArrowWithCenterTitleMobile = ({
    title,
}: GetHeaderWithBackArrowWithCenterTitleProps) => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_BACK_ARROW_WITH_CENTER_TITLE,
        title,
    },
});
