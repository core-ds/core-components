export const colors = [
    'tertiary',
    'disabled',
    'accent',
    'primary',
    'attention',
    'positive',
    'secondary',
    'tertiary-inverted',
    'primary-inverted',
    'secondary-inverted',
    'link',
    'negative',
    'static-primary-light',
    'static-secondary-light',
    'static-tertiary-light',
    'static-primary-dark',
    'static-secondary-dark',
    'static-tertiary-dark',
    'static-accent',
] as const;

export type Color = (typeof colors)[number];
