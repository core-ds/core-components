import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import {
    Typography,
    TitleResponsive,
    TitleDesktop,
    TitleMobile,
    Text,
} from '@alfalab/core-components-typography';
import { DEFAULT_TITLE_FONT } from '../title-base/component';
import {
    FONTS,
    VIEWS_TEXT,
    VIEWS_TITLE,
    WEIGHTS_TEXT,
    WEIGHTS_TITLE,
    COLORS,
    TAGS_ALL_TEXT,
} from '../types';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    id: 'Typography',
};

type Story = StoryObj<typeof Typography>;

export const title_desktop: Story = {
    name: 'TitleDesktop',
    render: () => {
        const color = select('color', COLORS, undefined);
        const weight = select('weight', WEIGHTS_TITLE, undefined);
        const font = select('font', FONTS, DEFAULT_TITLE_FONT);

        return (
            <>
                {VIEWS_TITLE.map((view) => (
                    <TitleDesktop
                        defaultMargins={boolean('defaultMargins', false)}
                        view={view}
                        color={color}
                        weight={weight}
                        font={font}
                        key={view}
                    >
                        заголовок view='{view}'
                    </TitleDesktop>
                ))}
            </>
        );
    },
};

export const title_responsive: Story = {
    name: 'TitleResponsive',
    render: () => {
        const color = select('color', COLORS, undefined);
        const weight = select('weight', WEIGHTS_TITLE, undefined);
        const font = select('font', FONTS, DEFAULT_TITLE_FONT);
        return (
            <>
                {VIEWS_TITLE.map((view) => (
                    <TitleResponsive
                        defaultMargins={boolean('defaultMargins', false)}
                        view={view}
                        color={color}
                        weight={weight}
                        font={font}
                        key={view}
                    >
                        заголовок view='{view}'
                    </TitleResponsive>
                ))}
            </>
        );
    },
};

export const title_mobile: Story = {
    name: 'TitleMobile',
    render: () => {
        const color = select('color', COLORS, undefined);
        const weight = select('weight', WEIGHTS_TITLE, undefined);
        const font = select('font', FONTS, DEFAULT_TITLE_FONT);
        return (
            <>
                {VIEWS_TITLE.map((view) => (
                    <TitleMobile view={view} color={color} weight={weight} font={font} key={view}>
                        заголовок view='{view}'
                    </TitleMobile>
                ))}
            </>
        );
    },
};

export const text: Story = {
    name: 'Text',
    render: () => {
        const color = select('color', COLORS, undefined);
        const tag = select('tag', TAGS_ALL_TEXT, 'p');
        const weight = select('weight', [...WEIGHTS_TEXT, undefined], 'regular');
        const monospace = boolean('monospaceNumbers', false);
        const defaultMargins = tag === 'p' ? boolean('defaultMargins', true) : undefined;
        return (
            <>
                {VIEWS_TEXT.map((view) => (
                    <Text
                        view={view}
                        color={color}
                        tag={tag}
                        weight={weight}
                        monospaceNumbers={monospace}
                        key={view}
                        defaultMargins={defaultMargins}
                    >
                        {view}. Космологи́ческая сингуля́рность — состояния Вселенной в определённый
                        момент времени в прошлом, когда плотность энергии (материи) и кривизна
                        пространства-времени были очень велики — порядка планковских значений.
                        1234567890, например.
                    </Text>
                ))}
            </>
        );
    },
};

export default meta;
