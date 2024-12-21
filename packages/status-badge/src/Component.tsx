import React from 'react';

import { ICON_MAP } from './consts/iconMap';
import { type StatusBadgeProps, StatusBadgeBase } from './Component.base';

export const StatusBadge = (props: StatusBadgeProps) => (
    <StatusBadgeBase {...props} iconMap={ICON_MAP} />
);
