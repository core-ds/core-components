import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import { CircularProgressBar } from '@alfalab/core-components-circular-progress-bar';

const meta: Meta<typeof CircularProgressBar> = {
    title: 'Components/CircularProgressBar',
    component: CircularProgressBar,
    id: 'CircularProgressBar',
};

type Story = StoryObj<typeof CircularProgressBar>;

export const circular_progress_bar: Story = {
    name: 'CircularProgressBar',
    render: () => {
        const value = number('value', 50);
        const view = select('view', ['positive', 'negative'], 'positive');
        const completeTextColor = select(
            'completeTextColor',
            ['primary', 'primary-inverted', 'positive', 'negative', 'secondary'],
            'secondary',
        );
        const title = text('title', 'title');
        const titleComplete = text('titleComplete', '');
        const subtitle = text('subtitle', 'subtitle');
        const contentColor = select(
            'contentColor',
            ['primary', 'secondary', 'tertiary', 'positive', 'negative'],
            'secondary',
        );
        const subtitleComplete = text('subtitleComplete', '');
        const progressStrokeColor = text('progressStrokeColor', '');
        const strokeColor = text('strokeColor', '');
        const circleColor = text('circleColor', '');
        return (
            <>
                <CircularProgressBar
                    value={value}
                    view={view}
                    progressStrokeColor={progressStrokeColor}
                    strokeColor={strokeColor}
                    circleColor={circleColor}
                    title={title}
                    titleComplete={titleComplete}
                    subtitle={subtitle}
                    contentColor={contentColor}
                    subtitleComplete={subtitleComplete}
                    stroke={boolean('stroke', true)}
                    direction={select('direction', ['clockwise', 'counter-clockwise'], 'clockwise')}
                    fillComplete={boolean('fillComplete', false)}
                    completeTextColor={completeTextColor}
                    height={number('height', 0)}
                    size={select('size', [24, 48, 64, 80, 128, 144], 80)}
                />
                <p>Без атрибута title значение для title берётся из value</p>
                <CircularProgressBar value={value} view={view} subtitle={subtitle} size={80} />
                <p>
                    Если есть children, то они подставляются в центр, а title и subtitle
                    игнорируются
                </p>
                <CircularProgressBar
                    value={value}
                    view={view}
                    title={title}
                    subtitle={subtitle}
                    size={80}
                >
                    <p>Hello</p>
                </CircularProgressBar>
            </>
        );
    },
};

export const timer: Story = {
    name: 'Timer',
    render: () => {
        const counting = select('counting', ['backward', 'forward'], 'backward');
        const directionType = select('directionType', ['desc', 'asc'], 'desc');

        return (
            <CircularProgressBar
                timer={true}
                size={80}
                value={60}
                counting={counting}
                directionType={directionType}
            />
        );
    },
};

export default meta;
