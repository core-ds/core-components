import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@alfalab/core-components-typography';
import { Space } from '@alfalab/core-components-space';
import { pluralize } from '@alfalab/utils';
import { Title } from '@storybook/addon-docs';
import { Status } from 'storybook/blocks/status';

import usages from 'storybook/usages.json';

import styles from './ComponentHeader.module.css';

type ComponentHeaderProps = {
    name: string;
    version?: string;
    stage: number;
    design?: string;
    children?: ReactNode;
};

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({
    name,
    version,
    stage,
    design,
}) => {
    const packageName = name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
        .toLowerCase();

    const githubLink = `https://github.com/core-ds/core-components/tree/master/packages/${packageName}`;

    return (
        <div className={styles.component}>
            <Title>{name}</Title>

            <div className={styles.version}>{version}</div>

            <Space direction='horizontal' align='center' className={styles.info}>
                {stage && <Status stage={stage} />}

                {usages[name]?.projects > 0 && (
                    <Typography.Text>
                        Используется в <b>~{usages[name]?.projects}</b>{' '}
                        {pluralize(usages[name]?.projects, 'проекте', 'проектах', 'проектах')}
                        {' и '}
                        <b>~{usages[name]?.imports}</b>{' '}
                        {pluralize(usages[name]?.imports, 'файле', 'файлах', 'файлах')}
                    </Typography.Text>
                )}
            </Space>

            <div className={styles.links}>
                <div className={styles.github}>
                    <a href={githubLink} target='_blank'>
                        Github
                    </a>
                </div>
                <div
                    className={cn(styles.design, {
                        [styles.commonLink]: !design,
                    })}
                >
                    <a
                        href={
                            design ||
                            'https://www.figma.com/file/cdNnkh2QdxuvYLrBm4cubM/Web-%3A%3A-Core-Default-Components'
                        }
                        target='_blank'
                    >
                        Figma
                    </a>
                </div>
            </div>
        </div>
    );
};
