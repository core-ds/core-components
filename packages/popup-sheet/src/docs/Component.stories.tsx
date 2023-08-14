import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PopupSheet } from '@alfalab/core-components-popup-sheet';
import { Typography } from '@alfalab/core-components-typography';
import { boolean, number } from '@storybook/addon-knobs';

const meta: Meta<typeof PopupSheet> = {
    title: 'Components/PopupSheet',
    component: PopupSheet,
    id: 'PopupSheet',
};

type Story = StoryObj<typeof PopupSheet>;

export const popup_sheet: Story = {
    name: 'PopupSheet',
    render: () => {
        return (
            <PopupSheet
                disableFocusLock={true}
                open={boolean('open', false)}
                hasCloser={boolean('hasCloser', false)}
                padding={number('padding', 0)}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        color: 'rgba(55, 120, 251, 1)',
                        backgroundColor: 'rgba(55, 120, 251, 0.1)',
                    }}
                >
                    <Typography.Text view='caps' weight='bold'>
                        Custom
                    </Typography.Text>
                </div>
            </PopupSheet>
        );
    },
};

export default meta;
