import React from 'react';

import { List } from '@alfalab/core-components-list';

import { Typography } from '@alfalab/core-components-typography';

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
