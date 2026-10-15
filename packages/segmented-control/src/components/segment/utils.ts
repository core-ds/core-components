import { type SegmentProps } from './types';

export const isAddonOnly = ({ title, addons }: Pick<SegmentProps, 'title' | 'addons'>) =>
    !title && Boolean(addons?.left) !== Boolean(addons?.right);
