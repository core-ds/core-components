import { type TFilterButtonSize, type TMaskVariant, type TPathMask } from '../../types';

import { PATHS } from './paths';

interface ResolveMaskConfig {
    size: TFilterButtonSize;
    variant: TMaskVariant;
    preferredMask?: TPathMask;
}

interface ResolveMaskConfigResult {
    mask: TPathMask;
    d: string;
}

export const resolveMaskConfig = ({
    size,
    variant,
    preferredMask,
}: ResolveMaskConfig): ResolveMaskConfigResult => {
    const mask: TPathMask = preferredMask ?? 'rectangle';
    const d = PATHS[mask][size][variant];

    return { mask, d };
};

export const getPathD = ({
    size,
    variant,
    preferredMask,
}: ResolveMaskConfig): ResolveMaskConfigResult =>
    resolveMaskConfig({ size, variant, preferredMask });
