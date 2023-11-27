import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { SegmentedControl, Segment } from '@alfalab/core-components-segmented-control';

const meta: Meta<typeof SegmentedControl> = {
    title: 'Components/SegmentedControl',
    component: SegmentedControl,
    id: 'SegmentedControl',
};

type Story = StoryObj<typeof SegmentedControl>;

export const segmented_control: Story = {
    name: 'SegmentedControl',
    render: () => {
        const [selectedId, setSelectedId] = React.useState(1);
        const handleChange = (id) => setSelectedId(id);
        const colors = select('colors', ['default', 'inverted'], 'default');
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-bg-primary-inverted)'
                            : 'transparent',
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <SegmentedControl
                    size={select('size', ['xs', 'xxs'], 'xs')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rectangular')}
                    onChange={handleChange}
                    selectedId={selectedId}
                    colors={colors}
                >
                    <Segment id={1} title={'Сегмент 1'}>
                        Сегмент 1
                    </Segment>
                    <Segment id={2} title={'Сегмент 2'}>
                        Сегмент 2
                    </Segment>
                    <Segment id={3} title={'Сегмент 3'}>
                        Сегмент 3
                    </Segment>
                    <Segment id={4} title={'Сегмент 4'}>
                        Сегмент 4
                    </Segment>
                    <Segment id={5} title={'Сегмент 4'}>
                        Сегмент 4
                    </Segment>
                    <Segment id={6} title={'Сегмент 4'}>
                        Сегмент 4
                    </Segment>
                    <Segment id={7} title={'Сегмент 4'}>
                        Сегмент 4
                    </Segment>
                    <Segment id={8} title={'Сегмент 4'}>
                        Сегмент 4
                    </Segment>
                </SegmentedControl>
            </div>
        );
    },
};

export default meta;
