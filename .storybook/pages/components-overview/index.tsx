import React, { useMemo, useState, useTransition } from 'react';

import { Gap } from '@alfalab/core-components-gap';
import { Input, InputProps } from '@alfalab/core-components-input';
import { Typography } from '@alfalab/core-components-typography';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';

import { Card } from './components/card';
import { CONFIG } from './config';

import styles from './index.module.css';

const EMPTY_GROUP = 'EMPTY';

export const ComponentsOverview = () => {
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [_, startTransition] = useTransition();
    const [isMobile] = useMatchMedia('--mobile');

    const data = useMemo(() => {
        if (!query) return CONFIG;

        return Object.keys(CONFIG).reduce((res, groupName) => {
            const group = CONFIG[groupName].filter((componentName) =>
                componentName.toLowerCase().includes(query.toLowerCase()),
            );

            if (group.length > 0) {
                if (!res[EMPTY_GROUP]) {
                    res[EMPTY_GROUP] = [];
                }

                res[EMPTY_GROUP].push(...group);
            }

            return res;
        }, {} as typeof CONFIG);
    }, [query]);

    const handleSearch: InputProps['onChange'] = (_, { value }) => {
        setInputValue(value);

        startTransition(() => {
            setQuery(value);
        });
    };

    const handleClear: InputProps['onClear'] = (e) => {
        handleSearch(e as any, { value: '' });
    };

    const groups = Object.keys(data);
    const hasData = groups.length > 0;

    const Title = isMobile ? Typography.TitleMobile : Typography.Title;

    return (
        <div id='components-overview'>
            <Title tag='h1' view='xlarge' font='styrene'>
                Витрина компонентов
            </Title>

            <Gap size='m' />

            <Input
                block
                clear
                className={styles.input}
                onClear={handleClear}
                value={inputValue}
                placeholder='Поиск по компонентам'
                leftAddons={<MagnifierMIcon color='var(--color-light-graphic-secondary)' />}
                onChange={handleSearch}
            />
            {hasData ? (
                groups.map((groupTitle) => {
                    const componentsList = data[groupTitle];

                    return (
                        <div key={groupTitle} className={styles.group}>
                            {groupTitle !== EMPTY_GROUP && (
                                <Title tag='h3' view='small' className={styles.groupTitle}>
                                    {groupTitle}
                                </Title>
                            )}

                            <div className={styles.cardContainer}>
                                {componentsList.map((componentName) => (
                                    <Card componentName={componentName} />
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <Typography.Text
                    view='primary-small'
                    color='secondary'
                    className={styles.emptySearchResult}
                >
                    Ничего не нашлось, попробуйте изменить запрос
                </Typography.Text>
            )}
        </div>
    );
};
