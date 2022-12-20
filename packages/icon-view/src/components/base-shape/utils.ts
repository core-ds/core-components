type SizePathsMap = {
    [size: number]: {
        top?: string;
        bottom?: string;
        topBottom?: string;
        none: string;
        indicator?: string;
        indicatorBottom?: string;
    };
};

type GetPathParams = {
    size: number;
    hasTopAddons: boolean;
    hasBottomAddons: boolean;
    hasIndicator: boolean;
    pathsMap: SizePathsMap;
};

export type PathsMap = {
    shape: SizePathsMap;
    border: SizePathsMap;
};

export const getPath = ({
    size,
    hasTopAddons,
    hasBottomAddons,
    hasIndicator,
    pathsMap,
}: GetPathParams): string => {
    if (hasBottomAddons && hasTopAddons) {
        return pathsMap[size].topBottom || '';
    }

    if (hasBottomAddons && hasIndicator) {
        return pathsMap[size].indicatorBottom || '';
    }

    if (hasBottomAddons) {
        return pathsMap[size].bottom || '';
    }

    if (hasTopAddons) {
        return pathsMap[size].top || '';
    }

    if (hasIndicator) {
        return pathsMap[size].indicator || '';
    }

    return pathsMap[size].none;
};
