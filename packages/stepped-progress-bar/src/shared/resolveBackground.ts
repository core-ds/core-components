import { PRESET_COLORS, type SteppedProgressBarView } from '../types';

export const resolveBackground = (color?: string): SteppedProgressBarView | undefined =>
    typeof color === 'string' && PRESET_COLORS.includes(color as SteppedProgressBarView)
        ? (color as SteppedProgressBarView)
        : undefined;
