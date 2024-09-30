export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    size: 's' | 500;
    dataTestId?: string;
} | null;
