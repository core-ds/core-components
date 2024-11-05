import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithTitleWithSubtitleProps = {
    title: string;
    subtitle?: string;
};

export const getHeaderWithTitleWithSubtitleMobile = ({
    title,
    subtitle,
}: GetHeaderWithTitleWithSubtitleProps) => ({
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_TITLE_WITH_SUBTITLE,
        title,
        subtitle,
    },
});
