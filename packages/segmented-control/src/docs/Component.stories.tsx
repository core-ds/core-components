import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { Diamonds20Icon } from '@alfalab/icons-glyph-26/Diamonds20Icon';
import { Diamonds24Icon } from '@alfalab/icons-glyph-26/Diamonds24Icon';
import { getQueryParam } from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';
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
        const skeletonVisible = boolean('skeleton.visible', false);
        const view = select('view', ['default', 'muted'], 'default');
        const leftAddon = boolean('leftAddons', false);
        const rightAddon = boolean('rightAddons', false);
        const size = Number(select('size', [48, 40, 32], 40)) as 48 | 40 | 32;
        const addonIcon = size === 48 ? <Diamonds24Icon /> : <Diamonds20Icon />;
        const addonOnlyIcon = size === 32 ? <Diamonds20Icon /> : <Diamonds24Icon />;
        const addons = {
            leftAddons: leftAddon ? addonIcon : undefined,
            rightAddons: rightAddon ? addonIcon : undefined,
        };

        const addonsOnly = Boolean(getQueryParam('knob-addonsOnly', true));
        const iconTitle = Boolean(getQueryParam('knob-iconTitle', true));

        const getBackgroundColor = () => {
            if (colors === 'inverted') {
                return 'var(--color-light-base-bg-primary-inverted)';
            }

            if (view === 'muted') {
                return '#EBEAEA';
            }

            return 'transparent';
        };

        return (
            <div
                style={{
                    backgroundColor: getBackgroundColor(),
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <SegmentedControl
                    size={size}
                    shape={select('shape', ['rounded', 'rectangular'], 'rectangular')}
                    onChange={handleChange}
                    selectedId={selectedId}
                    colors={colors}
                    disabled={boolean('disabled', false)}
                    skeleton={{ visible: skeletonVisible }}
                    view={view}
                    segmentWidth={select('segmentWidth', ['equal', 'content'], 'equal')}
                >
                    {addonsOnly || iconTitle
                        ? [1, 2, 3].map((id) => (
                              <Segment
                                  key={id}
                                  id={id}
                                  title={iconTitle ? addonOnlyIcon : null}
                                  leftAddons={addonsOnly ? addonOnlyIcon : undefined}
                              />
                          ))
                        : [
                              <Segment key={1} id={1} title={'Сегмент 1'}>
                                  Сегмент 1
                              </Segment>,
                              <Segment key={2} id={2} title={'Сегмент 2'} {...addons}>
                                  Сегмент 2
                              </Segment>,
                              <Segment key={3} id={3} title={'Сегмент 3'}>
                                  Сегмент 3
                              </Segment>,
                              <Segment key={4} id={4} title={'Сегмент 4'} {...addons}>
                                  Сегмент 4
                              </Segment>,
                              <Segment key={5} id={5} title={'Сегмент 4'}>
                                  Сегмент 4
                              </Segment>,
                              <Segment key={6} id={6} title={'Сегмент 4'}>
                                  Сегмент 4
                              </Segment>,
                              <Segment key={7} id={7} title={'Сегмент 4'}>
                                  Сегмент 4
                              </Segment>,
                              <Segment key={8} id={8} title={'Сегмент 4'}>
                                  Сегмент 4
                              </Segment>,
                          ]}
                </SegmentedControl>
            </div>
        );
    },
};

export default meta;
