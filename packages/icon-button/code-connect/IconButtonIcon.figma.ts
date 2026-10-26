// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=603-59872
// source=packages/icon-button/src/components/base-icon-button/Component.tsx
// component=IconButton
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const type = instance.getEnum('Type', {
    'Icon 24': 'icon24',
    'Icon 16': 'icon16',
    'icon-20': 'icon20',
    'Spinner 24': 'spinner24',
    'Spinner 16': 'spinner16',
});
const loading = type === 'spinner24' || type === 'spinner16';
let content;
if (loading) {
    const child = instance.findInstance('Spinner');
    if (child.type !== 'INSTANCE') throw new Error('Не найден Spinner');
    content = child.executeTemplate().example;
} else {
    const child = instance.getInstanceSwap(
        type === 'icon24' ? 'Icon-24' : type === 'icon16' ? 'Icon-16' : 'Icon-20',
    );
    if (!child || child.type !== 'INSTANCE') throw new Error('Не найдена иконка');
    const code = child.executeTemplate().example;
    content =
        type === 'icon20'
            ? figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${code}, props)} />`
                  .sections
            : code;
}

export default {
    id: 'core-icon-button-iconbuttonicon',
    imports: [
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
    ],
    example: figma.code`${content}`,
    metadata: { nestable: true, props: { loading } },
};
