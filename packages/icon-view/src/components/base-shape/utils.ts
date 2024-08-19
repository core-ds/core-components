import type { TMainSize } from './component';

export type TNames = 'top' | 'bottom' | 'topBottom' | 'none' | 'indicator' | 'indicatorBottom';

type SizePathsMap = {
    [size in TMainSize | number]: {
        top?: string;
        bottom?: string;
        topBottom?: string;
        none: string;
        indicator?: string;
        indicatorBottom?: string;
    };
};

type GetPathParams = {
    hasTopAddons: boolean;
    hasBottomAddons: boolean;
    hasIndicator: boolean;
};

export type PathsMap = {
    shape: SizePathsMap;
    border: SizePathsMap;
};

export const getPath = (name: TNames, size: TMainSize | number, pathsMap: SizePathsMap): string =>
    pathsMap?.[size]?.[name] || '';

export const getPathName = ({
    hasTopAddons,
    hasBottomAddons,
    hasIndicator,
}: GetPathParams): TNames => {
    if (hasBottomAddons) {
        if (hasTopAddons) {
            return 'topBottom';
        }

        if (hasIndicator) {
            return 'indicatorBottom';
        }

        return 'bottom';
    }

    if (hasTopAddons) {
        return 'top';
    }

    if (hasIndicator) {
        return 'indicator';
    }

    return 'none';
};
