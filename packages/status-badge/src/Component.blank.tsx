import React from 'react';

import { ICON_MAP_BLANK } from './consts/iconMap.blank';
import { type StatusBadgeProps, StatusBadgeBase } from './Component.base';

export const StatusBadgeBlank = (props: StatusBadgeProps) => (
    <StatusBadgeBase {...props} iconMap={ICON_MAP_BLANK} />
);
