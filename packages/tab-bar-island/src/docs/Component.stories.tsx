import React, { useEffect, useState } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';

import {
    TabBarIsland,
    TabBarIslandTrailingIconButton,
} from '@alfalab/core-components-tab-bar-island';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

const meta: Meta<typeof TabBarIsland> = {
    title: 'Components/TabBarIsland',
    component: TabBarIsland,
    id: 'TabBarIsland',
};

type Story = StoryObj<typeof TabBarIsland>;

const BLOCK_DURATION_MS = 600;
const BLOCK_DELAY_MS = 80;

function MainThreadBlockingExample() {
    const [activeKey, setActiveKey] = useState('money');
    const [run, setRun] = useState<{ blockMainThread: boolean } | null>(null);

    useEffect(() => {
        if (!run) {
            return undefined;
        }

        let frame = 0;
        let timer = 0;

        // До блокировки даём React обновить DOM, а браузеру — показать начало анимации.
        frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => {
                timer = window.setTimeout(() => {
                    if (run.blockMainThread) {
                        const until = performance.now() + BLOCK_DURATION_MS;

                        // Намеренно блокируем основной поток, чтобы воспроизвести лаг без изменений хука.
                        while (performance.now() < until) {
                            // Занимаем основной поток на заданное время.
                        }

                        setRun(null);
                    } else {
                        timer = window.setTimeout(() => setRun(null), BLOCK_DURATION_MS);
                    }
                }, BLOCK_DELAY_MS);
            });
        });

        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(timer);
        };
    }, [run]);

    const start = (blockMainThread: boolean) => {
        setActiveKey((key) => (key === 'money' ? 'history' : 'money'));
        setRun({ blockMainThread });
    };

    return (
        <div style={{ maxWidth: 640, padding: 24 }}>
            <h2>Перелёт пилюли при занятом основном потоке</h2>
            <p>
                Сначала запустите без нагрузки, затем — с блокировкой. Через {BLOCK_DELAY_MS} мс
                после двух кадров отрисовки основной поток будет занят на {BLOCK_DURATION_MS} мс.
            </p>
            <TabBarIsland
                activeKey={activeKey}
                items={[
                    { key: 'money', icon: <DiamondsMIcon />, label: 'Деньги' },
                    { key: 'payments', icon: <DiamondsMIcon />, label: 'Платежи' },
                    { key: 'history', icon: <DiamondsMIcon />, label: 'История' },
                ]}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                <button type='button' disabled={run !== null} onClick={() => start(false)}>
                    Без нагрузки
                </button>
                <button type='button' disabled={run !== null} onClick={() => start(true)}>
                    Заблокировать поток на {BLOCK_DURATION_MS} мс
                </button>
            </div>
            <p role='status'>{run ? 'Прогон выполняется…' : 'Готово к запуску'}</p>
            <p>
                В реализации через requestAnimationFrame пилюля замирает и продолжает движение после
                блокировки. В реализации через WAAPI её transform может продолжать анимироваться в
                композиторе. Кнопки в обоих случаях не отвечают во время блокировки.
            </p>
            <p>Для сравнения отключите prefers-reduced-motion и оставьте вкладку видимой.</p>
        </div>
    );
}

export const mainThreadBlocking: Story = {
    name: 'Анимация при блокировке основного потока',
    parameters: { viewMode: 'story' },
    render: () => <MainThreadBlockingExample />,
};

export const button: Story = {
    name: 'TabBarIsland',
    render: () => (
        <TabBarIsland
            items={[
                { key: 'money', icon: <DiamondsMIcon />, label: 'Поддержка' },
                { key: 'payments', icon: <DiamondsMIcon />, label: 'Платежи' },
                { key: 'history', icon: <DiamondsMIcon />, label: 'История' },
                { key: 'x', icon: <DiamondsMIcon />, label: 'Икс' },
            ]}
            trailingAddon={
                <TabBarIslandTrailingIconButton icon={<DiamondsMIcon />} label='Поддержка' />
            }
        />
    ),
};

export default meta;
