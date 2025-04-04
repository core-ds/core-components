import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@balafla/core-components-button';
import { CalendarWithSkeleton } from '@balafla/core-components-calendar-with-skeleton';

const meta: Meta<typeof CalendarWithSkeleton> = {
    title: 'Components/CalendarWithSkeleton',
    component: CalendarWithSkeleton,
    id: 'CalendarWithSkeleton',
};

type Story = StoryObj<typeof CalendarWithSkeleton>;

export const calendar_with_skeleton: Story = {
    name: 'CalendarWithSkeleton',
    render: () => {
        const [visible, setVisible] = React.useState(false);
        return (
            <>
                <CalendarWithSkeleton calendarVisible={visible} />
                <Button size='xs' onClick={() => setVisible(!visible)}>
                    toggle
                </Button>
            </>
        );
    },
};

export default meta;
