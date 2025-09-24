export type FitMode = 'cover' | 'fill' | 'contain';

export type Position = 'center' | 'top' | 'bottom' | 'left' | 'right';

export type SeekIndicator = {
    direction: 'forward' | 'backward';
    amount: number;
    visible: boolean;
};
