export type BackgroundColorType =
    | 'accent'
    | 'info'
    | 'attention-muted'
    | 'positive-muted'
    | 'negative-muted'
    | 'primary'
    | 'primary-inverted'
    | 'secondary'
    | 'secondary-inverted'
    | 'tertiary'
    | 'tertiary-inverted'
    | 'quaternary'
    | 'quaternary-inverted'
    | 'specialbg-component'
    | 'specialbg-component-inverted'
    | 'specialbg-primary-grouped'
    | 'specialbg-secondary-grouped'
    | 'specialbg-tertiary-grouped'
    | 'specialbg-secondary-transparent'
    | 'specialbg-secondary-transparent-inverted'
    | 'specialbg-tertiary-transparent'
    | 'specialbg-tertiary-transparent-inverted';

export type BorderColorType =
    | 'accent'
    | 'key'
    | 'key-inverted'
    | 'link'
    | 'primary'
    | 'primary-inverted'
    | 'secondary'
    | 'secondary-inverted'
    | 'tertiary'
    | 'tertiary-inverted'
    | 'underline'
    | 'underline-inverted'
    | 'graphic-attention'
    | 'graphic-link'
    | 'graphic-negative'
    | 'graphic-positive'
    | 'specialbg-secondary-transparent'
    | 'specialbg-secondary-transparent-inverted'
    | 'specialbg-tertiary-transparent'
    | 'specialbg-tertiary-transparent-inverted';

export type GraphicColorType =
    | 'accent'
    | 'link'
    | 'attention'
    | 'positive'
    | 'negative'
    | 'primary'
    | 'primary-inverted'
    | 'secondary'
    | 'secondary-inverted'
    | 'tertiary'
    | 'tertiary-inverted'
    | 'quaternary'
    | 'quaternary-inverted'
    | 'static-light'
    | 'static-accent'
    | 'static-dark';

export type ShadowType =
    | 'shadow-xs'
    | 'shadow-s'
    | 'shadow-m'
    | 'shadow-l'
    | 'shadow-xl'
    | 'shadow-xs-hard'
    | 'shadow-s-hard'
    | 'shadow-m-hard'
    | 'shadow-l-hard'
    | 'shadow-xl-hard'
    | 'shadow-xs-up'
    | 'shadow-s-up'
    | 'shadow-m-up'
    | 'shadow-l-up'
    | 'shadow-xl-up'
    | 'shadow-xs-hard-up'
    | 'shadow-s-hard-up'
    | 'shadow-m-hard-up'
    | 'shadow-l-hard-up'
    | 'shadow-xl-hard-up';

export type GapType =
    | '3xs'
    | '2xs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl';

export type PaddingType =
    | number
    | string
    | {
          top?: number;
          right?: number;
          bottom?: number;
          left?: number;
      };
