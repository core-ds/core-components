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
    hasIndicstor: boolean;
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
    hasIndicstor,
    pathsMap,
}: GetPathParams): string => {
    if (hasBottomAddons && hasTopAddons) {
        return pathsMap[size].topBottom || '';
    }

    if (hasBottomAddons && hasIndicstor) {
        return pathsMap[size].indicatorBottom || '';
    }

    if (hasBottomAddons) {
        return pathsMap[size].bottom || '';
    }

    if (hasTopAddons) {
        return pathsMap[size].top || '';
    }

    if (hasIndicstor) {
        return pathsMap[size].indicator || '';
    }

    return pathsMap[size].none;
};
