import { StatusBadgeProps } from '@alfalab/core-components-status-badge';

import { unsafe_BadgeProps } from '../types/unsafeBadgeProps';

const unsafeBadgeValues: string[] = ['negative', 'positive', 'attention'];

type IsUnsafeBadge = unsafe_BadgeProps | StatusBadgeProps['view'];
export const isUnsafeBadge = (badge: IsUnsafeBadge): badge is unsafe_BadgeProps =>
    unsafeBadgeValues.includes(badge);
