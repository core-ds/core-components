import React from 'react';

import { List } from '@balafla/core-components-list';

import { Typography } from '@balafla/core-components-typography';

import { Example } from 'storybook-addon-live-examples';
import { cssImportsExample, darkModeExample } from './utils';
import { Answers } from '.storybook/theming-wizard/types';

export const KeepCssVars = ({ answers }: { answers: Answers }) => {
    const steps = [];

    steps.push(
        <div key={`keepCssVars-${answers.product}`} style={{ flex: 1 }}>
            <Typography.Text>
                Подключите на проект набор переменных и тему продукта. Обычно это можно сделать в
                одном из корневых файлов проекта:{' '}
                <Typography.Text weight='bold'>App.tsx, root.tsx или app.css</Typography.Text>
            </Typography.Text>
            <Example live={false} language='css' code={cssImportsExample(answers)} />
        </div>,
    );

    steps.push(
        <div>
            <Typography.Text>
                Также если вы используете индексный файл с переменными (vars/index.css) , то
                рекомендуем вам перейти на один из бандлов, подготовленных под продукты (например,
                vars/bundle/click.css). В этих бандлах всегда будет правильный набор переменных для
                вашего продукта. Если в продукте встречаются очень старые deprecated цвета из файла
                vars/colors.css, дополнительно подключите его (он всё ещё есть в индексном файле, но
                в бандлы его уже не добавляли).
            </Typography.Text>
        </div>,
    );

    if (answers.darkMode === 'yes') {
        steps.push(
            <div key='darkModeWithVars' style={{ flex: 1 }}>
                <Typography.Text>
                    Добавьте на страницу дополнительные стили, если темный режим был включен. Обычно
                    это можно сделать в корне приложения.
                </Typography.Text>
                <Example live={false} language='css' code={darkModeExample()} />
            </div>,
        );
    }

    return <List tag='ul'>{steps}</List>;
};
