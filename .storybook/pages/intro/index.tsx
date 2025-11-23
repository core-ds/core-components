import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from '@alfalab/core-components-button';
import { Plate } from './components/plate';
import { Logo } from '../../components/logo';
import { GithubIcon } from '../../components/icons/GithubIcon';
import { MODE_COLORS_TAG_ID } from '../../addons/utils';
import packageJson from '@alfalab/core-components/package.json';

import styles from './index.module.css';

/**
 * @see https://stackoverflow.com/a/2450976
 */
function shuffle<T>(array: T[]) {
    const copy = [...array];
    let currentIndex = copy.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex--);
        [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
    }

    return copy;
}

const MAINTAINERS = shuffle(['dHIM24', 'Oladii', 'SiebenSieben', 'hextion', 'fulcanellee']);
const MAINTAINERS_COUNT = MAINTAINERS.length;
const PHOTO_SIZE = 40;
const PHOTO_OFFSET = 9;
const MAINTAINERS_CONTAINER_WIDTH =
    MAINTAINERS_COUNT * PHOTO_SIZE + PHOTO_OFFSET * (MAINTAINERS_COUNT - 1);

const BASE_URL = `${window.location.href.split('iframe')[0]}`;

const PLATE_DATA = [
    {
        title: 'Компоненты',
        description: 'Всё самое актуальное',
        link: BASE_URL + '?path=/docs/components-overview--docs',
    },
    {
        title: 'Ассеты',
        description: 'Иконки, логотипы и флаги',
        link: BASE_URL + '?path=/docs/icons-overview--docs',
    },
    {
        title: 'Подключение',
        description: 'Импорты и конфигурация',
        link: BASE_URL + '?path=/docs/instructions-installation--docs',
    },
    {
        title: 'Контрибьютинг',
        description: 'Приносите свои реквесты',
        link: BASE_URL + '?path=/docs/instructions-contributing--docs',
    },
];

export const Intro = () => {
    const [mode, setMode] = useState<string>(() =>
        !!document.getElementById(MODE_COLORS_TAG_ID)?.textContent ? 'dark' : 'light',
    );

    useEffect(() => {
        const handleChangeMode = (e: Event) => {
            const { mode } = (e as CustomEvent<{ mode: string }>).detail;

            setMode(mode);
        };

        document.addEventListener('mode-change', handleChangeMode);

        return () => {
            document.removeEventListener('mode-change', handleChangeMode);
        };
    }, []);

    return (
        <div data-mode={mode} className={cn('sb-unstyled', styles.page)}>
            <div className={styles.intro}>
                <div className={styles.version}>{packageJson.version}</div>

                <Logo className={styles.logo} />

                <div className={styles.desc}>
                    Актуальные и протестированные компоненты, отвечающие требованиям доступности
                </div>

                <Button
                    className={styles.ghButton}
                    view='primary'
                    size='xs'
                    href='https://github.com/core-ds/core-components'
                    target='_blank'
                    rel='noopener noreferrer'
                    leftAddons={
                        <GithubIcon
                            fill='var(--color-light-base-bg-primary)'
                            width={20}
                            height={20}
                        />
                    }
                >
                    View on GitHub
                </Button>

                <div className={styles.introFooter}>
                    <span className={styles.supportDesc}>
                        Выделенная команда и оперативная поддержка
                    </span>

                    <div
                        className={styles.maintainers}
                        style={{ width: MAINTAINERS_CONTAINER_WIDTH }}
                    >
                        {MAINTAINERS.map((login, idx) => {
                            const isLast = idx === MAINTAINERS_COUNT - 1;

                            return (
                                <a
                                    key={login}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={`https://github.com/${login}`}
                                    className={styles.maintainer}
                                    style={{
                                        zIndex: MAINTAINERS.length - idx,
                                        right: isLast
                                            ? 0
                                            : (MAINTAINERS_COUNT - idx - 1) * -PHOTO_OFFSET,
                                    }}
                                >
                                    <img
                                        width={PHOTO_SIZE}
                                        height={PHOTO_SIZE}
                                        src={`./images/maintainers/${login}.png`}
                                        alt={login}
                                        className={styles.maintainterPhoto}
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={styles.whereToStart}>С чего начать?</div>

            <div className={styles.plates}>
                {PLATE_DATA.map(({ title, description, link }) => (
                    <Plate key={title} title={title} description={description} link={link} />
                ))}
            </div>
        </div>
    );
};
