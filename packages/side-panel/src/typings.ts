import { SidePanelResponsiveProps } from '@alfalab/core-components-side-panel';

export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    size: NonNullable<SidePanelResponsiveProps['size']>;
} | null;
