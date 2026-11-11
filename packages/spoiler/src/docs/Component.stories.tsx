import React, { useEffect, useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '@alfalab/core-components-button';
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

const AmountExample = ({ interactiveParticles }: { interactiveParticles: boolean }) => {
    const [open, setOpen] = useState(true);
    const [valueIndex, setValueIndex] = useState(0);

    useEffect(() => {
        if (open) return undefined;

        const timer = window.setTimeout(() => {
            setValueIndex((current) => (current + 1) % AMOUNT_VALUES.length);
        }, 500);

        return () => window.clearTimeout(timer);
    }, [open]);

    return (
        <div className={styles.demo}>
            <Typography.Title tag='div' view='medium' font='system'>
                <Spoiler
                    open={open}
                    onOpenChange={setOpen}
                    interactiveParticles={interactiveParticles}
                >
                    {AMOUNT_VALUES[valueIndex]}
                </Spoiler>
            </Typography.Title>
            <Switch
                checked={!open}
                label='Скрыть'
                onChange={() => setOpen((current) => !current)}
            />
        </div>
    );
};

export const spoiler: Story = {
    name: 'Spoiler',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const defaultOpen = boolean('defaultOpen', false);
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
                    key={`${defaultOpen}-${revealOnce}`}
                    mode='element'
                    defaultOpen={defaultOpen}
                    revealOnce={revealOnce}
                    interactiveParticles={boolean('interactiveParticles', true)}
                    colors={colors}
                    className={text('className', '')}
                    dataTestId={text('dataTestId', '')}
                    style={{ borderRadius: text('borderRadius', 'var(--border-radius-8)') }}
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
    render: () => <AmountExample interactiveParticles={boolean('interactiveParticles', true)} />,
};

const NestedControlsExample = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.demo}>
            <Button size={40}>До спойлера</Button>
            <Spoiler mode='element' style={{ borderRadius: 'var(--border-radius-16)' }}>
                <div className={styles.controls}>
                    <Typography.Text view='primary-medium'>Заказ № 125 600</Typography.Text>
                    <Button size={40} onClick={() => setCount((value) => value + 1)}>
                        Действие: {count}
                    </Button>
                </div>
            </Spoiler>
            <Button size={40}>После спойлера</Button>
        </div>
    );
};

export const nested_controls: Story = {
    name: 'Вложенная кнопка',
    render: () => <NestedControlsExample />,
};

export default meta;
