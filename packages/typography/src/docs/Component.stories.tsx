import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { Typography } from '@balafla/core-components-typography';
import { colors } from '../colors';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    id: 'Typography',
};

type Story = StoryObj<typeof Typography>;

export const typography_title: Story = {
    name: 'Typography.Title',
    render: () => {
        const VIEW_TYPES = ['xlarge', 'large', 'medium', 'small', 'xsmall'];
        const color = select('color', colors, '');
        const weight = select('weight', ['regular', 'medium', 'bold', 'semibold', '-'], '-');
        const font = select('font', ['styrene', 'system'], 'styrene');

        return (
            <>
                {VIEW_TYPES.map((view) => (
                    <Typography.Title
                        defaultMargins={boolean('defaultMargins', false)}
                        view={view}
                        color={color}
                        weight={weight}
                        font={font}
                        key={view}
                    >
                        заголовок view='{view}'
                    </Typography.Title>
                ))}
            </>
        );
    },
};

export const typography_title_responsive: Story = {
    name: 'Typography.TitleResponsive',
    render: () => {
        const VIEW_TYPES = ['xlarge', 'large', 'medium', 'small', 'xsmall'];
        const color = select('color', colors, '');
        const weight = select('weight', ['regular', 'medium', 'bold', 'semibold', '-'], '-');
        const font = select('font', ['styrene', 'system'], 'styrene');
        return (
            <>
                {VIEW_TYPES.map((view) => (
                    <Typography.TitleResponsive
                        defaultMargins={boolean('defaultMargins', false)}
                        view={view}
                        color={color}
                        weight={weight}
                        font={font}
                        key={view}
                    >
                        заголовок view='{view}'
                    </Typography.TitleResponsive>
                ))}
            </>
        );
    },
};

export const typography_title_mobile: Story = {
    name: 'Typography.TitleMobile',
    render: () => {
        const VIEW_TYPES = ['xlarge', 'large', 'medium', 'small', 'xsmall'];
        const color = select('color', colors, '');
        const weight = select('weight', ['regular', 'medium', 'bold', 'semibold', '-'], '-');
        const font = select('font', ['styrene', 'system'], 'styrene');
        return (
            <>
                {VIEW_TYPES.map((view) => (
                    <Typography.TitleMobile
                        view={view}
                        color={color}
                        weight={weight}
                        font={font}
                        key={view}
                    >
                        заголовок view='{view}'
                    </Typography.TitleMobile>
                ))}
            </>
        );
    },
};

export const typography_text: Story = {
    name: 'Typography.Text',
    render: () => {
        const VIEW_TYPES = [
            'primary-large',
            'primary-medium',
            'primary-small',
            'secondary-large',
            'secondary-medium',
            'secondary-small',
            'component-primary',
            'component-secondary',
            'caps',
        ];
        const color = select('color', colors, '');
        const tag = select('tag', ['div', 'p', 'span'], 'p');
        const weight = select('weight', ['regular', 'medium', 'bold', undefined], 'regular');
        const monospace = boolean('monospaceNumbers', false);
        const defaultMargins = tag === 'p' ? boolean('defaultMargins', true) : undefined;
        return (
            <>
                {VIEW_TYPES.map((view) => (
                    <Typography.Text
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
                    </Typography.Text>
                ))}
            </>
        );
    },
};

export default meta;
