import React from 'react';
import { Virtualizer } from '@tanstack/react-virtual';

/**
 * @deprecated
 */
export interface VirtualOptionsProps {
    virtualizer: Virtualizer<HTMLDivElement, HTMLDivElement>;
    contentHeight: number;
    contentRef: React.Ref<HTMLDivElement>;
    scrollElementRef: React.Ref<HTMLDivElement>;
    footerRef: React.Ref<HTMLDivElement>;
    render: (className: string) => React.ReactNode;
    style: React.CSSProperties;
}
