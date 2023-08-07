import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { Checkbox } from '@alfalab/core-components-checkbox';
import { CheckboxGroup } from '@alfalab/core-components-checkbox-group';
import { CheckboxGroupMobile } from '@alfalab/core-components-checkbox-group/mobile';
import { CheckboxGroupDesktop } from '@alfalab/core-components-checkbox-group/desktop';
import { Tag } from '@alfalab/core-components-tag';

import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof CheckboxGroup> = {
    title: 'Components/CheckboxGroup',
    component: CheckboxGroup,
    id: 'CheckboxGroup',
};

type Story = StoryObj<typeof CheckboxGroup>;

export const checkbox_group: Story = {
    name: 'CheckboxGroup',
    render: () => {
        const wrapperStyles = getQueryParam('wrapperStyles');
        const [value, setValue] = React.useState({
            one: !!wrapperStyles,
            two: !!wrapperStyles,
            three: false,
        });
        const onChange = (_, payload) => {
            setValue({ ...value, [payload.name]: payload.checked });
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
        const size = select('Checkbox.size', ['s', 'm'], 's');
        const type = select('type', ['checkbox', 'tag'], 'checkbox');
        return (
            <div style={stylesStringToObj(wrapperStyles)}>
                <CheckboxGroup
                    label={label}
                    hint={hint}
                    onChange={onChange}
                    direction={direction}
                    error={error}
                    disabled={disabled}
                    type={type}
                >
                    {Array.from({ length: 3 }).map((_, index) =>
                        type === 'checkbox' ? (
                            <Checkbox
                                key={`${index}-check`}
                                size={size}
                                label={`Значение ${order[index][0]}`}
                                name={`${order[index][1]}`}
                                checked={value[order[index][1]]}
                            />
                        ) : (
                            <Tag
                                key={`${index}-tag`}
                                size={size}
                                name={`${order[index][1]}`}
                                checked={value[order[index][1]]}
                            >
                                {`Значение ${order[index][0]}`}
                            </Tag>
                        ),
                    )}
                </CheckboxGroup>
            </div>
        );
    },
};

export const checkbox_group_mobile: Story = {
    name: 'CheckboxGroupMobile',
    render: () => {
        const wrapperStyles = getQueryParam('wrapperStyles');
        const [value, setValue] = React.useState({
            one: !!wrapperStyles,
            two: !!wrapperStyles,
            three: false,
        });
        const onChange = (_, payload) => {
            setValue({ ...value, [payload.name]: payload.checked });
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
        const size = select('Checkbox.size', ['s', 'm'], 's');
        const type = select('type', ['checkbox', 'tag'], 'checkbox');
        return (
            <div style={stylesStringToObj(wrapperStyles)}>
                <CheckboxGroupMobile
                    label={label}
                    hint={hint}
                    onChange={onChange}
                    direction={direction}
                    error={error}
                    disabled={disabled}
                    type={type}
                >
                    {Array.from({ length: 3 }).map((_, index) =>
                        type === 'checkbox' ? (
                            <Checkbox
                                key={`${index}-check`}
                                size={size}
                                label={`Значение ${order[index][0]}`}
                                name={`${order[index][1]}`}
                                checked={value[order[index][1]]}
                            />
                        ) : (
                            <Tag
                                key={`${index}-tag`}
                                size={size}
                                name={`${order[index][1]}`}
                                checked={value[order[index][1]]}
                            >
                                {`Значение ${order[index][0]}`}
                            </Tag>
                        ),
                    )}
                </CheckboxGroupMobile>
            </div>
        );
    },
};

export const checkbox_group_desktop: Story = {
    name: 'CheckboxGroupDesktop',
    render: () => {
        const wrapperStyles = getQueryParam('wrapperStyles');
        const [value, setValue] = React.useState({
            one: !!wrapperStyles,
            two: !!wrapperStyles,
            three: false,
        });
        const onChange = (_, payload) => {
            setValue({ ...value, [payload.name]: payload.checked });
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
        const size = select('Checkbox.size', ['s', 'm'], 's');
        const type = select('type', ['checkbox', 'tag'], 'checkbox');
        return (
            <div style={stylesStringToObj(wrapperStyles)}>
                <CheckboxGroupDesktop
                    label={label}
                    hint={hint}
                    onChange={onChange}
                    direction={direction}
                    error={error}
                    disabled={disabled}
                    type={type}
                >
                    {Array.from({ length: 3 }).map((_, index) =>
                        type === 'checkbox' ? (
                            <Checkbox
                                key={`${index}-check`}
                                size={size}
                                label={`Значение ${order[index][0]}`}
                                name={`${order[index][1]}`}
                                checked={value[order[index][1]]}
                            />
                        ) : (
                            <Tag
                                key={`${index}-tag`}
                                size={size}
                                name={`${order[index][1]}`}
                                checked={value[order[index][1]]}
                            >
                                {`Значение ${order[index][0]}`}
                            </Tag>
                        ),
                    )}
                </CheckboxGroupDesktop>
            </div>
        );
    },
};

export default meta;
