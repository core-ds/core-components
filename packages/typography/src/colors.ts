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
    'primary-static-light',
    'secondary-static-light',
    'tertiary-static-light',
    'primary-static-dark',
    'secondary-static-dark',
    'tertiary-static-dark',
    'accent-static',
] as const;

export type Color = typeof colors[number];
