import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Link } from '@alfalab/core-components-link';
import { Typography } from '@alfalab/core-components-typography';
import { Space } from '@alfalab/core-components-space';
import { pluralize } from '@alfalab/utils';

import usages from 'storybook/usages.json';

import styles from './ComponentHeader.module.css';
import { useMatchMedia } from '@alfalab/core-components-mq';

type ComponentHeaderProps = {
    name: string;
    version?: string;
    design?: string;
    children?: ReactNode;
};

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({ name, design, children }) => {
    const [isDesktop] = useMatchMedia('--tablet-m');

    const packageName = name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
        .toLowerCase();

    const githubLink = `https://github.com/core-ds/core-components/tree/master/packages/${packageName}`;

    const Title = isDesktop ? Typography.Title : Typography.TitleMobile;

    return (
        <div className={styles.component}>
            <Title tag='h1' view='xlarge'>
                {name}
            </Title>
            {children && (
                <Typography.Text
                    tag='p'
                    view='primary-medium'
                    className={cn(styles.text, { [styles.textMobile]: !isDesktop })}
                >
                    {children}
                </Typography.Text>
            )}
            <div className={styles.links}>
                <a
                    className={cn(styles.design, {
                        [styles.commonLink]: !design,
                    })}
                    href={
                        design ||
                        'https://www.figma.com/file/cdNnkh2QdxuvYLrBm4cubM/Web-%3A%3A-Core-Default-Components'
                    }
                    target='_blank'
                >
                    Figma
                </a>
                <a className={styles.github} href={githubLink} target='_blank'>
                    Github
                </a>
            </div>

            <Space direction='horizontal' align='center' className={styles.info}>
                {usages[name]?.projects > 0 && (
                    <Typography.Text view='primary-small' color='secondary'>
                        Используется в{' '}
                        <Link
                            href={`http://design/design-system-usage/usage-chart?component=${usages[name]?.search}`}
                            target='_blank'
                            view='secondary'
                            underline={false}
                            title='Необходимо подключение к VPN'
                            className={styles.usageLink}
                        >
                            {usages[name]?.projects}{' '}
                            {pluralize(usages[name]?.projects, 'проекте', 'проектах', 'проектах')}
                        </Link>
                        {' и '}~{usages[name]?.imports}{' '}
                        {pluralize(usages[name]?.imports, 'файле', 'файлах', 'файлах')}
                    </Typography.Text>
                )}
            </Space>
        </div>
    );
};
