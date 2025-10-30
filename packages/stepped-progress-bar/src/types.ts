export const PRESET_COLORS = [
    'positive',
    'negative',
    'attention',
    'link',
    'tertiary',
    'secondary',
    'primary',
    'accent',
] as const;

export type SteppedProgressBarView = (typeof PRESET_COLORS)[number];
