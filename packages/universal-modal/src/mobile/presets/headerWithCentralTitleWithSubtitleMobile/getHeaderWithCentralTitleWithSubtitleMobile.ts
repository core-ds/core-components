import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithCentralTitleWithSubtitleProps = {
    title: string;
    subtitle: string;
};

export const getHeaderWithCentralTitleWithSubtitleMobile = ({
    title,
    subtitle,
}: GetHeaderWithCentralTitleWithSubtitleProps) => ({
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE_WITH_SUBTITLE,
        title,
        subtitle,
    },
});
