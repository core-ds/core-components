import React from 'react';

export type StatusBadgeViews =
    | 'positive-checkmark'
    | 'negative-cross'
    | 'negative-alert'
    | 'negative-block'
    | 'attention-alert'
    | 'neutral-information'
    | 'neutral-operation'
    | 'neutral-cross';

export type StatusBadgeSizes = 16 | 20 | 24 | 32 | 40;

export type CustomIcons = Partial<
    Record<
        StatusBadgeViews,
        Partial<Record<StatusBadgeSizes, React.FC<React.SVGProps<SVGSVGElement>>>>
    >
>;
