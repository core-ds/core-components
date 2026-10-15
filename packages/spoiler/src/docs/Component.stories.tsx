import React, { useEffect, useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { type Meta, type StoryObj } from '@storybook/react';

import { Spoiler } from '@alfalab/core-components-spoiler';
import { Switch } from '@alfalab/core-components-switch';
import { Typography } from '@alfalab/core-components-typography';

import styles from './demo.module.css';

const meta: Meta<typeof Spoiler> = {
    title: 'Components/Spoiler',
    component: Spoiler,
    id: 'Spoiler',
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <div className={styles.story}>
                <Story />
            </div>
        ),
    ],
};

type Story = StoryObj<typeof Spoiler>;

const AMOUNT_VALUES = ['−4 940 ₽', '−5 186 ₽'];

const AmountExample = () => {
    const [revealed, setRevealed] = useState(true);
    const [valueIndex, setValueIndex] = useState(0);

    useEffect(() => {
        if (revealed) return undefined;

        const timer = window.setTimeout(() => {
            setValueIndex((current) => (current + 1) % AMOUNT_VALUES.length);
        }, 500);

        return () => window.clearTimeout(timer);
    }, [revealed]);

    return (
        <div className={styles.demo}>
            <Typography.Title tag='div' view='medium' font='system' className={styles.value}>
                <Spoiler revealed={revealed} onRevealedChange={setRevealed}>
                    {AMOUNT_VALUES[valueIndex]}
                </Spoiler>
            </Typography.Title>
            <Switch
                checked={!revealed}
                label='Скрыть'
                onChange={() => setRevealed((current) => !current)}
            />
        </div>
    );
};

export const spoiler: Story = {
    name: 'Spoiler',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const defaultRevealed = boolean('defaultRevealed', false);
        const revealOnce = boolean('revealOnce', false);

        return (
            <div
                style={{
                    width: 150,
                    height: 150,
                    padding: 'var(--gap-40)',
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-base-bg-primary-inverted)'
                            : 'transparent',
                }}
            >
                <Spoiler
                    key={`${defaultRevealed}-${revealOnce}`}
                    mode='element'
                    defaultRevealed={defaultRevealed}
                    revealOnce={revealOnce}
                    colors={colors}
                    className={text('className', '')}
                    dataTestId={text('dataTestId', '')}
                    style={{ borderRadius: 'var(--border-radius-8)' }}
                >
                    <img
                        src='./images/gorgeous-garden.png'
                        alt='Пейзаж'
                        width={150}
                        height={150}
                        style={{ display: 'block', objectFit: 'cover' }}
                    />
                </Spoiler>
            </div>
        );
    },
};

export const spoiler_text: Story = {
    name: 'SpoilerText',
    render: () => <AmountExample />,
};

export default meta;
