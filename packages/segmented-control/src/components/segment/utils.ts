import { type SegmentProps } from './Component';

export const isAddonOnly = ({ title, addons }: Pick<SegmentProps, 'title' | 'addons'>) =>
    !title && Boolean(addons?.left) !== Boolean(addons?.right);
