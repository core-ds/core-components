import React, { Fragment, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, number, object, button } from '@storybook/addon-knobs';

import { Lottie } from '@alfalab/core-components-lottie';

const meta: Meta<typeof Lottie> = {
    title: 'Components/Lottie',
    component: Lottie,
    id: 'Lottie',
};

type Story = StoryObj<typeof Lottie>;

export const lottie: Story = {
    name: 'Lottie',
    render: () => {
        const [play, setPlay] = useState(true);
        button('Toggle play', () => {
            setPlay((p) => !p);
        });
        const iterations = number('iterations', 0);
        const speed = number('speed', 1);
        const direction = select('direction', [1, -1], 1);
        const startFrame = number('startFrame', 0);
        const endFrame = number('endFrame', 116);
        const size = object('size', { width: 400, height: 400 });
        const scale = select('scale', ['fill', 'fit'], 'fill');

        return (
            <Lottie
                iterations={iterations}
                onPlayChange={setPlay}
                scale={scale}
                play={play}
                size={size}
                direction={direction}
                speed={speed}
                startFrame={startFrame}
                endFrame={endFrame}
                src='./lottie/twitter-heart.json'
            />
        );
    },
};

export default meta;
