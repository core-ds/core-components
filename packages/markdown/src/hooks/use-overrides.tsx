import React, { useMemo } from 'react';

import { Link } from '@alfalab/core-components/link';
import { Typography } from '@alfalab/core-components-typography';

import { FontType, OverridesComponents, PlatformType } from '../typings';

import styles from '../index.module.css';

export const useOverrides = (font?: FontType, platform?: PlatformType): OverridesComponents =>
    useMemo(() => {
        const titleName = platform === 'desktop' ? 'Title' : 'TitleMobile';
        const Title = Typography[titleName];

        return {
            h1: (props) => (
                <Title font={font} className={styles.h1} tag='h1' view='medium' color='primary'>
                    {props.children}
                </Title>
            ),
            h2: (props) => (
                <Title font={font} className={styles.h2} tag='h2' view='small' color='primary'>
                    {props.children}
                </Title>
            ),
            h3: (props) => (
                <Title font={font} className={styles.h3} tag='h3' view='xsmall' color='primary'>
                    {props.children}
                </Title>
            ),
            p: (props) => (
                <Typography.Text tag='p' view='primary-medium' color='primary'>
                    {props.children}
                </Typography.Text>
            ),
            blockquote: (props) => (
                <Typography.Text
                    className={styles.blockquote}
                    tag='div'
                    view='primary-small'
                    color='secondary'
                >
                    {props.children}
                </Typography.Text>
            ),
            a: (props) => (
                <Link target='_blank' rel='noopener noreferrer' href={props.href}>
                    {props.children}
                </Link>
            ),
            code: (props) => (
                <Typography.Text
                    tag='span'
                    className={styles.code}
                    view='primary-small'
                    color='secondary'
                >
                    {props.children}
                </Typography.Text>
            ),
            img: (props) => (
                <div className={styles.imageContainer}>
                    <img alt={props.alt} src={props.src} className={styles.image} />
                </div>
            ),
        };
    }, [font, platform]);
