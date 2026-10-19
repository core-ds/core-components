import { type SegmentProps } from './types';

export const isAddonOnly = ({
    title,
    leftAddons,
    rightAddons,
}: Pick<SegmentProps, 'title' | 'leftAddons' | 'rightAddons'>) =>
    !title && Boolean(leftAddons) !== Boolean(rightAddons);
