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
const EXPAND_ON_HOVER_LABEL = 'Расширять облако при наведении';
const REPEL_PARTICLES_LABEL = 'Отталкивать частицы от курсора';

const AmountExample = ({
    expandOnHover,
    repelParticlesOnHover,
    particleColor,
}: {
    expandOnHover: boolean;
    repelParticlesOnHover: boolean;
    particleColor: string;
}) => {
    const [hide, setHide] = useState(false);
    const [valueIndex, setValueIndex] = useState(0);

    useEffect(() => {
        if (!hide) return undefined;

        const timer = window.setTimeout(() => {
            setValueIndex((current) => (current + 1) % AMOUNT_VALUES.length);
        }, 500);

        return () => window.clearTimeout(timer);
    }, [hide]);

    return (
        <div className={styles.demo}>
            <Typography.Title
                tag='div'
                view='medium'
                font='system'
                style={{ fontVariantNumeric: 'tabular-nums' }}
            >
                <Spoiler
                    hide={hide}
                    onHideChange={setHide}
                    expandOnHover={expandOnHover}
                    repelParticlesOnHover={repelParticlesOnHover}
                    style={{ '--spoiler-color': particleColor } as React.CSSProperties}
                >
                    {AMOUNT_VALUES[valueIndex]}
                </Spoiler>
            </Typography.Title>
            <Switch
                checked={hide}
                label='Скрыть содержимое'
                onChange={() => setHide((current) => !current)}
            />
        </div>
    );
};

export const spoiler: Story = {
    name: 'Spoiler',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const defaultHide = boolean('defaultHide', true);
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
                    key={`${defaultHide}-${revealOnce}`}
                    mode='element'
                    defaultHide={defaultHide}
                    revealOnce={revealOnce}
                    expandOnHover={boolean(EXPAND_ON_HOVER_LABEL, true)}
                    repelParticlesOnHover={boolean(REPEL_PARTICLES_LABEL, true)}
                    colors={colors}
                    className={text('className', '')}
                    dataTestId={text('dataTestId', '')}
                    style={
                        {
                            borderRadius: text('borderRadius', 'var(--border-radius-8)'),
                            '--spoiler-color': text(
                                '--spoiler-color',
                                'var(--color-light-neutral-translucent-1300)',
                            ),
                            '--spoiler-color-inverted': text(
                                '--spoiler-color-inverted',
                                'var(--color-light-neutral-translucent-1300-inverted)',
                            ),
                        } as React.CSSProperties
                    }
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
    render: () => (
        <AmountExample
            expandOnHover={boolean(EXPAND_ON_HOVER_LABEL, true)}
            repelParticlesOnHover={boolean(REPEL_PARTICLES_LABEL, true)}
            particleColor={text('--spoiler-color', 'var(--color-light-neutral-translucent-1300)')}
        />
    ),
};

export default meta;
