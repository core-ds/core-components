import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithCentralTitleProps = {
    title: string;
};

export const getHeaderWithCentralTitle = ({ title }: GetHeaderWithCentralTitleProps) => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE,
        title,
    },
});
