export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    size: 's';
    scrollableRef?: React.RefObject<HTMLDivElement>;
} | null;
