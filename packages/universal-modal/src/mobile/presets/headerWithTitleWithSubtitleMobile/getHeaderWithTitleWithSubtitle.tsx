import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithTitleWithSubtitleProps = {
    title: string;
    subtitle: string;
};

export const getHeaderWithTitleWithSubtitle = ({
    title,
    subtitle,
}: GetHeaderWithTitleWithSubtitleProps) => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_TITLE_WITH_SUBTITLE,
        title,
        subtitle,
    },
});
