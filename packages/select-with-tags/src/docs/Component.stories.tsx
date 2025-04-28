import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { pluralize } from '@alfalab/utils';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

import { SelectWithTags } from '@alfalab/core-components-select-with-tags';
import { SelectWithTagsDesktop } from '@alfalab/core-components-select-with-tags/desktop';
import { SelectWithTagsMobile } from '@alfalab/core-components-select-with-tags/mobile';
import { OptionShape, Arrow } from '@alfalab/core-components-select/shared';

import type { SelectWithTagsProps } from '../types';

const meta: Meta<typeof SelectWithTags> = {
    title: 'Components/SelectWithTags',
    component: SelectWithTags,
    id: 'SelectWithTags',
};

type Story = StoryObj<typeof SelectWithTags>;

const options = [
    { key: '1', content: 'H', value: 'H' },
    { key: '2', content: 'Li', value: 'Li' },
    { key: '3', content: 'Na', value: 'Na' },
    { key: '4', content: 'Curium', value: 'Curium' },
    { key: '5', content: 'Berkelium', value: 'Berkelium' },
    { key: '6', content: 'Californium', value: 'Californium' },
    { key: '7', content: 'Einsteinium', value: 'Einsteinium' },
    { key: '8', content: 'Fermium', value: 'Fermium' },
    { key: '9', content: 'Mendelevium', value: 'Mendelevium' },
    { key: '10', content: 'Nobelium', value: 'Nobelium' },
    { key: '11', content: 'Lawrencium', value: 'Lawrencium' },
    { key: '12', content: 'Rutherfordium', value: 'Rutherfordium' },
    { key: '13', content: 'Dubnium', value: 'Dubnium' },
    { key: '14', content: 'Seaborgium', value: 'Seaborgium' },
    { key: '15', content: 'Bohrium', value: 'Bohrium' },
];

const renderComponent = (component = SelectWithTags) => {
    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
    const isPreview = Object.keys(previewStyles).length > 0;
    const Component = isPreview ? SelectWithTagsDesktop : component;
    const [value, setValue] = React.useState('');
    const [selected, setSelected] = React.useState<(string | OptionShape)[]>(
        isPreview ? options.slice(3, 8) : [],
    );
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleChange: SelectWithTagsProps['onChange'] = ({ selectedMultiple }) => {
        setSelected(selectedMultiple);
    };

    const transformCollapsedTagText = (count: number) => {
        return `+${count} ${pluralize(count, 'элемент', 'элемента', 'элементов')}`;
    };
    return (
        <div style={previewStyles}>
            <div style={{ width: isPreview ? 256 : 400 }}>
                <Component
                    collapseTagList={boolean('collapseTagList', true)}
                    moveInputToNewLine={boolean('moveInputToNewLine', true)}
                    options={options}
                    block={boolean('block', true)}
                    size={select('size', [48, 56, 64, 72], 72)}
                    disabled={boolean('disabled', false)}
                    error={text('error', '')}
                    hint={text('hint', '')}
                    Arrow={boolean('Arrow', false) ? Arrow : undefined}
                    circularNavigation={boolean('circularNavigation', false)}
                    placeholder={text('placeholder', 'Элемент')}
                    label={text('label', '')}
                    autocomplete={boolean('autocomplete', true)}
                    onInput={handleInput}
                    transformCollapsedTagText={transformCollapsedTagText}
                    value={value}
                    onChange={handleChange}
                    selected={selected}
                />
            </div>
        </div>
    );
};

export const select_with_tags: Story = {
    name: 'SelectWithTags',
    render: () => renderComponent(),
};

export const select_with_tags_desktop: Story = {
    name: 'SelectWithTagsDesktop',
    render: () => renderComponent(SelectWithTagsDesktop),
};

export const select_with_tags_mobile: Story = {
    name: 'SelectWithTagsMobile',
    render: () => renderComponent(SelectWithTagsMobile),
};

export default meta;
