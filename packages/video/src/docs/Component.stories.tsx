import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Video } from '@alfalab/core-components-video';
import { select, number } from '@storybook/addon-knobs';

const meta: Meta<typeof Video> = {
    title: 'Components/Video',
    component: Video,
    id: 'Video',
};

type Story = StoryObj<typeof Video>;

export const videoPlayer: Story = {
    name: 'VideoPlayer',
    render: () => {
        return (
            <div>
                <Video
                    url='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
                    skipForwardStep={number('skipForwardStep', 10)}
                    skipBackwardStep={number('skipBackwardStep', 10)}
                    startFrom={number('startFrom', 0)}
                />
            </div>
        );
    },
};

export default meta;
