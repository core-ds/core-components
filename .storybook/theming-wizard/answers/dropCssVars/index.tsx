import React from 'react';

import { List } from '@balafla/core-components-list';
import { Link } from '@balafla/core-components-link';
import { Typography } from '@balafla/core-components-typography';

import { Example } from 'storybook-addon-live-examples';
import { Answers } from '.storybook/theming-wizard/types';

import { aruiScriptsExample, withoutAruiScriptsExample } from './utils';

export const DropCssVars = ({ answers }: { answers: Answers }) => {
    const steps = [];

    if (answers.aruiScripts === 'yes' && answers.product !== 'default') {
        steps.push(
            <div key='arui-scripts' style={{ flex: 1 }}>
                <Typography.Text>
                    Подключите тему в{' '}
                    <Link
                        href='https://git.moscow.alfaintra.net/projects/EF/repos/arui-scripts/browse/packages/arui-scripts#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8'
                        view='default'
                        rel='noopener'
                        target='_blank'
                    >
                        настройках
                    </Link>{' '}
                    arui-scripts
                </Typography.Text>
                <Example live={false} language='json' code={aruiScriptsExample(answers)} />
            </div>,
        );
    }

    if (answers.aruiScripts === 'no') {
        steps.push(
            <div key='without-arui-scripts' style={{ flex: 1 }}>
                <Typography.Text>
                    Настройте плагин{' '}
                    <Link
                        href='https://github.com/postcss/postcss-custom-properties#importfrom'
                        view='default'
                        rel='noopener'
                        target='_blank'
                    >
                        postcss-custom-properties
                    </Link>
                </Typography.Text>
                <Example live={false} language='json' code={withoutAruiScriptsExample(answers)} />
            </div>,
        );
    }

    if (!steps.length) {
        return <Typography.Text>Дополнительных настроек не требуется</Typography.Text>;
    }

    return <List tag='ul'>{steps}</List>;
};
