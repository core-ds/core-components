import {
    StatusBadgeIcon,
    StatusBadgeSizes,
    StatusBadgeViews,
} from '@alfalab/core-components-status-badge';
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

export type IconMap = Record<
    StatusBadgeViews,
    Record<NonNullable<StatusBadgeSizes>, StatusBadgeIcon>
>;

export const ICON_MAP: IconMap = {
    'positive-checkmark': {
        16: CheckmarkCompactSIcon,
        20: CheckmarkCompactSIcon,
        24: CheckmarkCompactMIcon,
        32: CheckmarkCompactMIcon,
        40: CheckmarkCompactMIcon,
    },
    'negative-cross': {
        16: CrossCompactSIcon,
        20: CrossCompactSIcon,
        24: CrossCompactMIcon,
        32: CrossCompactMIcon,
        40: CrossCompactMIcon,
    },
    'negative-alert': {
        16: ExclamationCompactSIcon,
        20: ExclamationCompactSIcon,
        24: ExclamationCompactMIcon,
        32: ExclamationCompactMIcon,
        40: ExclamationCompactMIcon,
    },
    'negative-block': {
        16: StopBrickSIcon,
        20: StopBrickSIcon,
        24: StopBrickCompactMIcon,
        32: StopBrickMIcon,
        40: StopBrickMIcon,
    },
    'attention-alert': {
        16: ExclamationCompactSIcon,
        20: ExclamationCompactSIcon,
        24: ExclamationCompactMIcon,
        32: ExclamationCompactMIcon,
        40: ExclamationCompactMIcon,
    },
    'neutral-information': {
        16: InformationCompactSIcon,
        20: InformationCompactSIcon,
        24: InformationCompactMIcon,
        32: InformationCompactMIcon,
        40: InformationCompactMIcon,
    },
    'neutral-operation': {
        16: ClockHandsCompactSIcon,
        20: ClockHandsCompactSIcon,
        24: ClockHandsCompactMIcon,
        32: ClockHandsCompactMIcon,
        40: ClockHandsCompactMIcon,
    },
    'neutral-cross': {
        16: CrossCompactSIcon,
        20: CrossCompactSIcon,
        24: CrossCompactMIcon,
        32: CrossCompactMIcon,
        40: CrossCompactMIcon,
    },
};
