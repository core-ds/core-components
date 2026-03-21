import { Meta, StoryFn } from '@storybook/react';
import { Rate } from '../index';

export default {
    title: 'Components/Rate',
    component: Rate,
} as Meta<typeof Rate>;

const Template: StoryFn<typeof Rate> = (args) => <Rate {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Controlled = Template.bind({});
Controlled.args = {
    value: 3,
};

export const Half = Template.bind({});
Half.args = {
    allowHalf: true,
    defaultValue: 2.5,
};

export const CustomCharacter = Template.bind({});
CustomCharacter.args = {
    character: '🔥',
    defaultValue: 4,
};

export const Tooltips = Template.bind({});
Tooltips.args = {
    tooltips: ['bad', 'ok', 'good', 'great', 'perfect'],
    defaultValue: 3,
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    defaultValue: 4,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    readOnly: true,
    defaultValue: 4,
};

export const Sizes = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Rate size="s" defaultValue={3} />
        <Rate size="m" defaultValue={3} />
        <Rate size="l" defaultValue={3} />
    </div>
);

export const NoClear = Template.bind({});
NoClear.args = {
    allowClear: false,
    defaultValue: 3,
};

export const CustomCount = Template.bind({});
CustomCount.args = {
    count: 10,
    defaultValue: 7,
};
