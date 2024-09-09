import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';

import { Button } from '@alfalab/core-components-button';
import { Space } from '@alfalab/core-components-space';
import { Portal } from '@alfalab/core-components-portal';

const meta: Meta<typeof Portal> = {
    title: 'Components/Portal',
    component: Portal,
    id: 'Portal',
};

type Story = StoryObj<typeof Portal>;

export const portal: Story = {
    name: 'Portal',
    render: () => {
        const [show, setShow] = React.useState(false);
        const handleClick = () => setShow(!show);
        const styles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 240,
            height: 60,
            border: '1px solid var(--color-light-neutral-300)',
            padding: 'var(--gap-16)',
        };
        return (
            <Space>
                <Button onClick={handleClick}>
                    {show ? 'Unmount children' : 'Mount children'}
                </Button>
                <div>
                    {show && (
                        <Portal
                            getPortalContainer={() => document.getElementById('portal-container')}
                        >
                            <StarMIcon />
                        </Portal>
                    )}
                </div>
                <div>Контейнер для контента портала</div>
                <div id='portal-container' style={styles} />
            </Space>
        );
    },
};

export default meta;
