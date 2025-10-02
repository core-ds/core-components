import React, { Children, useMemo } from 'react';
import cn from 'classnames';

import { Link } from '@alfalab/core-components-link';
import { List } from '@alfalab/core-components-list';
import { Text, TitleDesktop, TitleMobile } from '@alfalab/core-components-typography';

import { type FontType, type OverridesComponents, type PlatformType } from '../../typings';

import styles from './index.module.css';

export const useOverrides = (platform?: PlatformType, font?: FontType): OverridesComponents =>
    useMemo(() => {
        const Title = platform === 'desktop' ? TitleDesktop : TitleMobile;

        return {
            h1: ({ children }) => (
                <Title
                    font={font}
                    className={cn(styles.h1, 'h1')}
                    tag='h1'
                    view='medium'
                    color='primary'
                >
                    {children}
                </Title>
            ),
            h2: ({ children }) => (
                <Title
                    font={font}
                    className={cn(styles.h2, 'h2')}
                    tag='h2'
                    view='small'
                    color='primary'
                >
                    {children}
                </Title>
            ),
            h3: ({ children }) => (
                <Title
                    font={font}
                    className={cn(styles.h3, 'h3')}
                    tag='h3'
                    view='xsmall'
                    color='primary'
                >
                    {children}
                </Title>
            ),
            h4: ({ children }) => (
                <Title
                    font={font}
                    className={cn(styles.h4, 'h4')}
                    tag='h4'
                    view='xsmall'
                    color='primary'
                >
                    {children}
                </Title>
            ),
            p: ({ children }) => (
                <Text className='p' tag='p' view='primary-medium' color='primary'>
                    {children}
                </Text>
            ),
            blockquote: ({ children }) => (
                <Text
                    className={cn(styles.blockquote, 'blockquote')}
                    tag='div'
                    view='primary-small'
                    color='secondary'
                >
                    {children}
                </Text>
            ),
            a: ({ children, href }) => (
                <Link className='a' target='_blank' rel='noopener noreferrer' href={href}>
                    {children}
                </Link>
            ),
            code: ({ children }) => (
                <Text
                    tag='span'
                    className={cn(styles.code, 'code')}
                    view='primary-small'
                    color='secondary'
                >
                    {children}
                </Text>
            ),
            img: ({ alt, src }) => (
                <span className={cn(styles.imageContainer, 'img')}>
                    <img alt={alt} src={src} className={styles.image} />
                </span>
            ),
            ul: ({ children }) => (
                <List className={cn(styles.list, 'ul')} tag='ul'>
                    {Children.toArray(children).filter((el) => el !== '\n')}
                </List>
            ),
            ol: ({ children }) => (
                <List className={cn(styles.list, 'ol')} tag='ol'>
                    {Children.toArray(children).filter((el) => el !== '\n')}
                </List>
            ),
            li: ({ children }) => (
                <Text className={cn(styles.li, 'li')} view='primary-medium'>
                    {children}
                </Text>
            ),
        };
    }, [font, platform]);
