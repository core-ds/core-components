import { exhaustiveCheck } from '@alfalab/core-components-shared';
import { StatusBadgeProps } from '@alfalab/core-components-status-badge';

import { unsafe_BadgeProps } from '../types/unsafeBadgeProps';

type UseDeprecatedBadge = {
    transformDeprecatedBadge: (deprecatedBadge: unsafe_BadgeProps) => StatusBadgeProps['view'];
};

export const useDeprecatedBadge = (): UseDeprecatedBadge => {
    const transformDeprecatedBadge = (unsafeBadge: unsafe_BadgeProps): StatusBadgeProps['view'] => {
        switch (unsafeBadge) {
            case 'negative':
                return 'negative-cross';
            case 'positive':
                return 'positive-checkmark';
            case 'attention':
                return 'attention-alert';
            default:
                return exhaustiveCheck(unsafeBadge);
        }
    };

    return {
        transformDeprecatedBadge,
    };
};
