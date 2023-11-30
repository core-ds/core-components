export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    size: 's';
    dataTestId?: string;
} | null;
