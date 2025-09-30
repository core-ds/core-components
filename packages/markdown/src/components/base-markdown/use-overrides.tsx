import React, { type ReactNode, useMemo } from 'react';
import cn from 'classnames';

import { Link } from '@alfalab/core-components-link';
import { List } from '@alfalab/core-components-list';
import { Text, TitleDesktop, TitleMobile } from '@alfalab/core-components-typography';

import { type FontType, type OverridesComponents, type PlatformType } from '../../typings';

import styles from './index.module.css';

type HeadingProps = { children: ReactNode };
type ParagraphProps = { children: ReactNode };
type BlockquoteProps = { children: ReactNode };
type AnchorProps = { children: ReactNode; href?: string };
type CodeProps = { children: ReactNode };
type ImageProps = { alt?: string; src?: string };
type ListProps = { children: ReactNode[]; ordered?: boolean };
type ListItemProps = { children: ReactNode };

export const useOverrides = (platform?: PlatformType, font?: FontType): OverridesComponents =>
    useMemo(() => {
        const Title = platform === 'desktop' ? TitleDesktop : TitleMobile;

        return {
            h1: ({ children }: HeadingProps) => (
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
            h2: ({ children }: HeadingProps) => (
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
            h3: ({ children }: HeadingProps) => (
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
            h4: ({ children }: HeadingProps) => (
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
            p: ({ children }: ParagraphProps) => (
                <Text className='p' tag='p' view='primary-medium' color='primary'>
                    {children}
                </Text>
            ),
            blockquote: ({ children }: BlockquoteProps) => (
                <Text
                    className={cn(styles.blockquote, 'blockquote')}
                    tag='div'
                    view='primary-small'
                    color='secondary'
                >
                    {children}
                </Text>
            ),
            a: ({ children, href }: AnchorProps) => (
                <Link className='a' target='_blank' rel='noopener noreferrer' href={href}>
                    {children}
                </Link>
            ),
            code: ({ children }: CodeProps) => (
                <Text
                    tag='span'
                    className={cn(styles.code, 'code')}
                    view='primary-small'
                    color='secondary'
                >
                    {children}
                </Text>
            ),
            img: ({ alt, src }: ImageProps) => (
                <span className={cn(styles.imageContainer, 'img')}>
                    <img alt={alt} src={src} className={styles.image} />
                </span>
            ),
            ul: ({ children, ordered }: ListProps) => (
                <List className={cn(styles.list, 'ul')} tag={ordered ? 'ol' : 'ul'}>
                    {children.filter((el) => el !== '\n')}
                </List>
            ),
            ol: ({ children, ordered }: ListProps) => (
                <List className={cn(styles.list, 'ol')} tag={ordered ? 'ol' : 'ul'}>
                    {children.filter((el) => el !== '\n')}
                </List>
            ),
            li: ({ children }: ListItemProps) => (
                <Text className={cn(styles.li, 'li')} view='primary-medium'>
                    {children}
                </Text>
            ),
        };
    }, [font, platform]);
