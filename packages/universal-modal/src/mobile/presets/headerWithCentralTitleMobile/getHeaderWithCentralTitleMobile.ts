import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithCentralTitleProps = {
    title: string;
};

export const getHeaderWithCentralTitleMobile = ({ title }: GetHeaderWithCentralTitleProps) => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE,
        title,
    },
});
