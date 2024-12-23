import React, { useEffect, useState } from 'react';
import _throttle from 'lodash/throttle';

import { Gap } from '@alfalab/core-components-gap';
import { Input, InputProps } from '@alfalab/core-components-input';
import { Typography } from '@alfalab/core-components-typography';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';

import { Card } from './components/card';
import { CONFIG } from './config';
import { MODE_COLORS_TAG_ID } from '../../addons/utils';
import { BackToTopButton } from '../../components/back-to-top-button';

import styles from './index.module.css';

const EMPTY_GROUP = 'EMPTY';

export const ComponentsOverview = () => {
    const [mode, setMode] = useState<string>(() =>
        !!document.getElementById(MODE_COLORS_TAG_ID)?.textContent ? 'dark' : 'light',
    );
    const [query, setQuery] = useState('');
    const [showToTop, setShowToTop] = useState(false);

    const [isMobile] = useMatchMedia('--mobile');

    useEffect(() => {
        const handleChangeMode = (e: Event) => {
            const { mode } = (e as CustomEvent<{ mode: string }>).detail;

            setMode(mode);
        };

        const handleScroll = _throttle((e) => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            setShowToTop(scrollTop > 800);
        }, 200);

        document.addEventListener('mode-change', handleChangeMode);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mode-change', handleChangeMode);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const data = query
        ? Object.keys(CONFIG).reduce((res, groupName) => {
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
          }, {} as typeof CONFIG)
        : CONFIG;

    const handleSearch: InputProps['onChange'] = (_, { value }) => setQuery(value);

    const handleClear: InputProps['onClear'] = (e) => setQuery('');

    const groups = Object.keys(data);
    const hasData = groups.length > 0;

    const Title = isMobile ? Typography.TitleMobile : Typography.Title;

    return (
        <div id='components-overview' className='sb-unstyled'>
            <Title tag='h1' view='xlarge' font='styrene'>
                Витрина компонентов
            </Title>

            <Gap size='m' />

            <Input
                block
                clear
                className={styles.input}
                onClear={handleClear}
                value={query}
                placeholder='Поиск по компонентам'
                leftAddons={<MagnifierMIcon color='var(--color-light-neutral-700)' />}
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
                                    <Card
                                        componentName={componentName}
                                        key={componentName}
                                        mode={mode}
                                    />
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

            <BackToTopButton
                visible={showToTop}
                onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
            />
        </div>
    );
};
