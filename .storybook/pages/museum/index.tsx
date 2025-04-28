import React, { useState, useEffect } from 'react';
import { Typography } from '@alfalab/core-components-typography';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { Gap } from '@alfalab/core-components-gap';
import { Link } from '@alfalab/core-components-link';
import { Divider } from '@alfalab/core-components-divider';

export const Museum = () => {
    const [versions, setVersions] = useState<string[]>([]);
    const [isMobile] = useMatchMedia('--mobile');

    useEffect(() => {
        const ac = new AbortController();
        const { signal } = ac;

        fetch('https://core-ds.github.io/core-components/archive-versions.json', { signal })
            .then((res) => res.json())
            .then((res: string[]) => setVersions(res.sort((a, b) => b.localeCompare(a))))
            .catch((e) => {
                if (!signal?.aborted) {
                    console.error(e);
                }
            });

        return () => ac.abort('unmount');
    }, []);

    const Title = isMobile ? Typography.TitleMobile : Typography.Title;

    const renderItem = (version: string, index: number, showSkeleton: boolean) => (
        <section key={version}>
            <Gap size={isMobile ? 'xl' : '2xl'} />
            <Title tag='h2' view='small' font='styrene' showSkeleton={showSkeleton}>
                {version.slice(1)}
            </Title>
            <Gap size='s' />
            <Typography.Text view='primary-medium' showSkeleton={showSkeleton}>
                <Link
                    view='default'
                    underline={false}
                    href={`https://core-ds.github.io/core-components/${version}/`}
                >
                    Последняя версия
                </Link>
                &nbsp;перед обновлением до версии&nbsp;
                {version
                    .slice(1)
                    .split('.')
                    .map((part, idx) => (idx === 0 ? Number(part) + 1 : 0))
                    .join('.')}
            </Typography.Text>
            {versions.length - 1 !== index ? (
                <>
                    <Gap size={isMobile ? 'xl' : '2xl'} />
                    <Divider />
                </>
            ) : null}
        </section>
    );

    return (
        <div className='sb-unstyled'>
            <Title tag='h1' view='xlarge' font='styrene'>
                Музей демок
            </Title>

            <Gap size='s' />

            <Typography.Text view='primary-medium'>
                Перед каждой мажоркой мы создаём музейную демку для того, чтобы у вас была
                возможность посмотреть как работал компонент в прошлых версиях Core и почитать его
                описание. Возможно, ваша версия Core уже в музее, тогда такая демка это единственный
                способ посмотреть актуальную документацию к компоненту.
            </Typography.Text>

            {versions.length
                ? versions.map((v, i) => renderItem(v, i, false))
                : [...Array(10)].map((_, i) => renderItem(`v${i}.0.0`, i, true))}
        </div>
    );
};
