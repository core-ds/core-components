import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { TabBar } from '@alfalab/core-components-tab-bar';
import DiamondsMIcon from '@alfalab/icons-glyph/DiamondsMIcon';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof TabBar> = {
    title: 'Components/TabBar',
    component: TabBar,
    id: 'TabBar',
};

type Story = StoryObj<typeof TabBar>;

export const tab_bar: Story = {
    name: 'TabBar',
    render: () => {
        const [selectedId, setSelectedId] = React.useState('1');
        const showIndicator = boolean('showIndicator', false);

        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));

        return (
            <div style={previewStyles}>
                <div style={{ maxWidth: 360, flex: 1 }}>
                    <TabBar
                        selectedId={selectedId}
                        onChange={setSelectedId}
                        border={boolean('border', true)}
                        accentColor={select('accentColor', ['primary', 'secondary'], 'primary')}
                        bgColor={select(
                            'bgColor',
                            ['modal-bg-primary', 'modal-bg-alt-primary'],
                            'modal-bg-primary',
                        )}
                    >
                        {Array(4)
                            .fill(null)
                            .map((_, idx) => (
                                <TabBar.Tab
                                    id={String(idx + 1)}
                                    label={`TabName${idx + 1}`}
                                    icon={<DiamondsMIcon />}
                                    showIndicator={showIndicator}
                                />
                            ))}
                    </TabBar>
                </div>
            </div>
        );
    },
};

export default meta;
