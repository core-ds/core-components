import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { Radio } from '@alfalab/core-components-radio';
import { RadioGroup } from '@alfalab/core-components-radio-group';
import { RadioGroupMobile } from '@alfalab/core-components-radio-group/mobile';
import { RadioGroupDesktop } from '@alfalab/core-components-radio-group/desktop';

import { Tag } from '@alfalab/core-components-tag';

import {
    getQueryParam,
    stylesStringToObj,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof RadioGroup> = {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    id: 'RadioGroup',
};

type Story = StoryObj<typeof RadioGroup>;

export const radio_group: Story = {
    name: 'RadioGroup',
    render: () => {
        const [value, setValue] = React.useState('one');
        const onChange = (_, payload) => {
            setValue(payload.value);
        };
        const order = {
            0: ['1', 'one'],
            1: ['2', 'two'],
            2: ['3', 'three'],
        };
        const direction = select('direction', ['vertical', 'horizontal'], 'vertical');
        const error = text('error', '');
        const disabled = boolean('disabled', false);
        const label = text('label', 'Заголовок группы');
        const hint = text('hint', '');
        const type = select('type', ['radio', 'tag'], 'radio');
        const wrapperStyles = getQueryParam('wrapperStyles');
        return (
            <div style={stylesStringToObj(wrapperStyles)}>
                <RadioGroup
                    label={label}
                    hint={hint}
                    onChange={onChange}
                    direction={direction}
                    error={error}
                    disabled={disabled}
                    type={type}
                    value={value}
                >
                    {Array.from({ length: 3 }).map((_, index) =>
                        type === 'radio' ? (
                            <Radio
                                key={`${index}-check`}
                                size={select('Radio.size', [20, 24], 20)}
                                label={`Значение ${order[index][0]}`}
                                value={order[index][1]}
                            />
                        ) : (
                            <Tag
                                key={`${index}-tag`}
                                size={select('Tag.size', ['s', 'm'], 's')}
                                value={order[index][1]}
                            >
                                {`${order[index][0]} вариант`}
                            </Tag>
                        ),
                    )}
                </RadioGroup>
            </div>
        );
    },
};

export const radio_group_mobile: Story = {
    name: 'RadioGroupMobile',
    render: () => {
        const [value, setValue] = React.useState('one');
        const onChange = (_, payload) => {
            setValue(payload.value);
        };
        const order = {
            0: ['1', 'one'],
            1: ['2', 'two'],
            2: ['3', 'three'],
        };
        const direction = select('direction', ['vertical', 'horizontal'], 'vertical');
        const error = text('error', '');
        const disabled = boolean('disabled', false);
        const label = text('label', 'Заголовок группы');
        const hint = text('hint', '');
        const type = select('type', ['radio', 'tag'], 'radio');
        const wrapperStyles = getQueryParam('wrapperStyles');
        return (
            <div style={stylesStringToObj(wrapperStyles)}>
                <RadioGroupMobile
                    label={label}
                    hint={hint}
                    onChange={onChange}
                    direction={direction}
                    error={error}
                    disabled={disabled}
                    type={type}
                    value={value}
                >
                    {Array.from({ length: 3 }).map((_, index) =>
                        type === 'radio' ? (
                            <Radio
                                key={`${index}-check`}
                                size={select('Radio.size', [20, 24], 20)}
                                label={`Значение ${order[index][0]}`}
                                value={order[index][1]}
                            />
                        ) : (
                            <Tag
                                key={`${index}-tag`}
                                size={select('Tag.size', ['s', 'm'], 's')}
                                value={order[index][1]}
                            >
                                {`${order[index][0]} вариант`}
                            </Tag>
                        ),
                    )}
                </RadioGroupMobile>
            </div>
        );
    },
};

export const radio_group_desktop: Story = {
    name: 'RadioGroupDesktop',
    render: () => {
        const [value, setValue] = React.useState('one');
        const onChange = (_, payload) => {
            setValue(payload.value);
        };
        const order = {
            0: ['1', 'one'],
            1: ['2', 'two'],
            2: ['3', 'three'],
        };
        const direction = select('direction', ['vertical', 'horizontal'], 'vertical');
        const error = text('error', '');
        const disabled = boolean('disabled', false);
        const label = text('label', 'Заголовок группы');
        const hint = text('hint', '');
        const type = select('type', ['radio', 'tag'], 'radio');
        const wrapperStyles = getQueryParam('wrapperStyles');
        return (
            <div style={stylesStringToObj(wrapperStyles)}>
                <RadioGroupDesktop
                    label={label}
                    hint={hint}
                    onChange={onChange}
                    direction={direction}
                    error={error}
                    disabled={disabled}
                    type={type}
                    value={value}
                >
                    {Array.from({ length: 3 }).map((_, index) =>
                        type === 'radio' ? (
                            <Radio
                                key={`${index}-check`}
                                size={select('Radio.size', [20, 24], 20)}
                                label={`Значение ${order[index][0]}`}
                                value={order[index][1]}
                            />
                        ) : (
                            <Tag
                                key={`${index}-tag`}
                                size={select('Tag.size', ['s', 'm'], 's')}
                                value={order[index][1]}
                            >
                                {`${order[index][0]} вариант`}
                            </Tag>
                        ),
                    )}
                </RadioGroupDesktop>
            </div>
        );
    },
};

export default meta;
