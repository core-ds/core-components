import React, { useMemo } from 'react';
import { Link } from '@balafla/core-components-link';
import { List } from '@balafla/core-components-list';
import { Text, TitleDesktop, TitleMobile } from '@balafla/core-components-typography';
import cn from 'classnames';

import { FontType, OverridesComponents, PlatformType } from '../typings';

import styles from '../index.module.css';

export const useOverrides = (platform?: PlatformType, font?: FontType): OverridesComponents =>
    useMemo(() => {
        const Title = platform === 'desktop' ? TitleDesktop : TitleMobile;

        return {
            h1: (props) => (
                <Title
                    font={font}
                    className={cn(styles.h1, 'h1')}
                    tag='h1'
                    view='medium'
                    color='primary'
                >
                    {props.children}
                </Title>
            ),
            h2: (props) => (
                <Title
                    font={font}
                    className={cn(styles.h2, 'h2')}
                    tag='h2'
                    view='small'
                    color='primary'
                >
                    {props.children}
                </Title>
            ),
            h3: (props) => (
                <Title
                    font={font}
                    className={cn(styles.h3, 'h3')}
                    tag='h3'
                    view='xsmall'
                    color='primary'
                >
                    {props.children}
                </Title>
            ),
            h4: (props) => (
                <Title
                    font={font}
                    className={cn(styles.h4, 'h4')}
                    tag='h4'
                    view='xsmall'
                    color='primary'
                >
                    {props.children}
                </Title>
            ),
            p: (props) => (
                <Text className='p' tag='p' view='primary-medium' color='primary'>
                    {props.children}
                </Text>
            ),
            blockquote: (props) => (
                <Text
                    className={cn(styles.blockquote, 'blockquote')}
                    tag='div'
                    view='primary-small'
                    color='secondary'
                >
                    {props.children}
                </Text>
            ),
            a: (props) => (
                <Link
                    className='a'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={props.href as string}
                >
                    {props.children}
                </Link>
            ),
            code: (props) => (
                <Text
                    tag='span'
                    className={cn(styles.code, 'code')}
                    view='primary-small'
                    color='secondary'
                >
                    {props.children}
                </Text>
            ),
            img: (props) => (
                <div className={cn(styles.imageContainer, 'img')}>
                    <img
                        alt={props.alt as string}
                        src={props.src as string}
                        className={styles.image}
                    />
                </div>
            ),
            ul: (props) => (
                <List className={cn(styles.list, 'ul')} tag={props.ordered ? 'ol' : 'ul'}>
                    {props.children.filter((el) => el !== '\n')}
                </List>
            ),
            ol: (props) => (
                <List className={cn(styles.list, 'ol')} tag={props.ordered ? 'ol' : 'ul'}>
                    {props.children.filter((el) => el !== '\n')}
                </List>
            ),
            li: (props) => (
                <Text className={cn(styles.li, 'li')} view='primary-medium'>
                    {props.children}
                </Text>
            ),
        };
    }, [font, platform]);
