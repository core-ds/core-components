import { CheckmarkCompactMIcon } from '@alfalab/icons-glyph/CheckmarkCompactMIcon';
import { CheckmarkCompactSIcon } from '@alfalab/icons-glyph/CheckmarkCompactSIcon';
import { ClockHandsCompactMIcon } from '@alfalab/icons-glyph/ClockHandsCompactMIcon';
import { ClockHandsCompactSIcon } from '@alfalab/icons-glyph/ClockHandsCompactSIcon';
import { CrossCompactMIcon } from '@alfalab/icons-glyph/CrossCompactMIcon';
import { CrossCompactSIcon } from '@alfalab/icons-glyph/CrossCompactSIcon';
import { ExclamationCompactMIcon } from '@alfalab/icons-glyph/ExclamationCompactMIcon';
import { ExclamationCompactSIcon } from '@alfalab/icons-glyph/ExclamationCompactSIcon';
import { InformationCompactMIcon } from '@alfalab/icons-glyph/InformationCompactMIcon';
import { InformationCompactSIcon } from '@alfalab/icons-glyph/InformationCompactSIcon';
import { StopBrickCompactMIcon } from '@alfalab/icons-glyph/StopBrickCompactMIcon';
import { StopBrickMIcon } from '@alfalab/icons-glyph/StopBrickMIcon';
import { StopBrickSIcon } from '@alfalab/icons-glyph/StopBrickSIcon';

import type {
    StatusBadgeCustomIcon,
    StatusBadgeIcon,
    StatusBadgeSizes,
    StatusBadgeViews,
} from '..';
import { combineIcons } from '../hooks/useStatusBadgeIcon';

import { ICON_MAP_BLANK } from './iconMap.blank';

export type IconMap = Record<
    StatusBadgeViews,
    Record<NonNullable<StatusBadgeSizes>, StatusBadgeIcon>
>;

const ICON_MAP_16: StatusBadgeCustomIcon = {
    'positive-checkmark': {
        16: CheckmarkCompactSIcon,
    },
    'negative-cross': {
        16: CrossCompactSIcon,
    },
    'negative-alert': {
        16: ExclamationCompactSIcon,
    },
    'negative-block': {
        16: StopBrickSIcon,
    },
    'attention-alert': {
        16: ExclamationCompactSIcon,
    },
    'neutral-information': {
        16: InformationCompactSIcon,
    },
    'neutral-operation': {
        16: ClockHandsCompactSIcon,
    },
    'neutral-cross': {
        16: CrossCompactSIcon,
    },
};

const ICON_MAP_20: StatusBadgeCustomIcon = {
    'positive-checkmark': {
        20: CheckmarkCompactSIcon,
    },
    'negative-cross': {
        20: CrossCompactSIcon,
    },
    'negative-alert': {
        20: ExclamationCompactSIcon,
    },
    'negative-block': {
        20: StopBrickSIcon,
    },
    'attention-alert': {
        20: ExclamationCompactSIcon,
    },
    'neutral-information': {
        20: InformationCompactSIcon,
    },
    'neutral-operation': {
        20: ClockHandsCompactSIcon,
    },
    'neutral-cross': {
        20: CrossCompactSIcon,
    },
};

const ICON_MAP_24: StatusBadgeCustomIcon = {
    'positive-checkmark': {
        24: CheckmarkCompactMIcon,
    },
    'negative-cross': {
        24: CrossCompactMIcon,
    },
    'negative-alert': {
        24: ExclamationCompactMIcon,
    },
    'negative-block': {
        24: StopBrickCompactMIcon,
    },
    'attention-alert': {
        24: ExclamationCompactMIcon,
    },
    'neutral-information': {
        24: InformationCompactMIcon,
    },
    'neutral-operation': {
        24: ClockHandsCompactMIcon,
    },
    'neutral-cross': {
        24: CrossCompactMIcon,
    },
};

const ICON_MAP_32: StatusBadgeCustomIcon = {
    'positive-checkmark': {
        32: CheckmarkCompactMIcon,
    },
    'negative-cross': {
        32: CrossCompactMIcon,
    },
    'negative-alert': {
        32: ExclamationCompactMIcon,
    },
    'negative-block': {
        32: StopBrickMIcon,
    },
    'attention-alert': {
        32: ExclamationCompactMIcon,
    },
    'neutral-information': {
        32: InformationCompactMIcon,
    },
    'neutral-operation': {
        32: ClockHandsCompactMIcon,
    },
    'neutral-cross': {
        32: CrossCompactMIcon,
    },
};

const ICON_MAP_40: StatusBadgeCustomIcon = {
    'positive-checkmark': {
        40: CheckmarkCompactMIcon,
    },
    'negative-cross': {
        40: CrossCompactMIcon,
    },
    'negative-alert': {
        40: ExclamationCompactMIcon,
    },
    'negative-block': {
        40: StopBrickMIcon,
    },
    'attention-alert': {
        40: ExclamationCompactMIcon,
    },
    'neutral-information': {
        40: InformationCompactMIcon,
    },
    'neutral-operation': {
        40: ClockHandsCompactMIcon,
    },
    'neutral-cross': {
        40: CrossCompactMIcon,
    },
};

/**
 * Все пред-загруженные иконки
 */
const ICON_MAP: IconMap = combineIcons(ICON_MAP_BLANK, [
    ICON_MAP_16,
    ICON_MAP_20,
    ICON_MAP_24,
    ICON_MAP_32,
    ICON_MAP_40,
]);

export { ICON_MAP, ICON_MAP_16, ICON_MAP_20, ICON_MAP_24, ICON_MAP_32, ICON_MAP_40 };
