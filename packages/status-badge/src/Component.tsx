import React from 'react';
import cn from 'classnames';

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

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type StatusBadgeProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Размер компонента
     * @default 24
     */
    size?: 16 | 20 | 24 | 32 | 40;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Вид бейджа.
     */
    view:
        | 'positive-checkmark'
        | 'negative-cross'
        | 'negative-alert'
        | 'negative-block'
        | 'attention-alert'
        | 'neutral-information'
        | 'neutral-operation'
        | 'neutral-cross';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Необходим для переопределения иконок
     */
    customIcons?: {
        negative: React.FC<React.SVGProps<SVGSVGElement>>;
        positive: React.FC<React.SVGProps<SVGSVGElement>>;
        attention: React.FC<React.SVGProps<SVGSVGElement>>;
    };
};

const ICON_MAP: Record<
    StatusBadgeProps['view'],
    Record<NonNullable<StatusBadgeProps['size']>, React.FC<React.SVGProps<SVGSVGElement>>>
> = {
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

export const StatusBadge = ({
    className,
    dataTestId,
    size = 24,
    view,
    colors = 'default',
    customIcons,
}: StatusBadgeProps) => {
    if (customIcons) {
        ICON_MAP['positive-checkmark'] = {
            ...ICON_MAP['positive-checkmark'],
            24: customIcons.positive,
        };
        ICON_MAP['negative-cross'] = {
            ...ICON_MAP['negative-cross'],
            24: customIcons.negative,
        };
        ICON_MAP['attention-alert'] = {
            ...ICON_MAP['attention-alert'],
            24: customIcons.attention,
        };
    }

    const Icon = ICON_MAP[view][size];

    return (
        <div
            className={cn(
                styles.component,
                className,
                styles[`size-${size}`],
                colorStyles[colors].component,
                colorStyles[colors][view],
            )}
            data-test-id={dataTestId}
        >
            <Icon />
        </div>
    );
};
