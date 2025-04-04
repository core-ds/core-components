import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Link } from '@balafla/core-components-link';
import { Example } from 'storybook-addon-live-examples';

import styles from './css-vars.module.css';

type Props = {
    css: string;
    title?: string;
    expandable?: boolean;
    type?: 'vars' | 'mixins';
};

const rootBlockRegexp = /:root {([^}]*)}/g;
const mixinRegexp = /(?:@define-mixin)(.*{[^}]*})/g;

export const CssVars: FC<Props> = ({ css, title, expandable, type = 'vars' }) => {
    const [vars, setVars] = useState('');
    const [open, setOpen] = useState(!expandable);
    const isVars = type === 'vars';
    const regexp = isVars ? rootBlockRegexp : mixinRegexp;

    useEffect(() => {
        let rootBlockMatch = regexp.exec(css);

        const rootBlocks = [];

        while (rootBlockMatch) {
            rootBlocks.push(rootBlockMatch[1]);
            rootBlockMatch = regexp.exec(css);
        }

        let result = rootBlocks.reduce(
            (acc, item, index) => {
                const isLast = index === rootBlocks.length - 1;
                const divider = isLast ? '' : '\n';

                return `${acc}${item}${divider}`;
            },
            isVars ? ':root {' : '',
        );

        if (isVars) {
            result += '}';
        }

        setVars(result);
    }, []);

    return (
        <div className={cn('sb-unstyled', styles.cssVars)}>
            {title && <h2 className={cn('sbdocs', 'sbdocs-h2')}>{title}</h2>}
            {vars && (
                <>
                    {expandable && (
                        <Link view='default' onClick={() => setOpen(!open)} pseudo>
                            {open ? 'Скрыть' : 'Показать'}
                        </Link>
                    )}
                    {open && <Example language='css' code={vars} live={false} />}
                </>
            )}
        </div>
    );
};
