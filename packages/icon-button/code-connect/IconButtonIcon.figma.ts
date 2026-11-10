// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=603-59872
// source=packages/icon-button/src/components/base-icon-button/Component.tsx
// component=IconButton
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;

// CLI не собирает локальные модули: единый контракт проверяет verify-nesting.cjs.
function nestedTemplate(child: InstanceHandle, context?: () => ResultSection[]) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === false) {
        if (context) return { ...result, example: context() };
        throw new Error(
            `Вложенный компонент ${child.name} требует контекста приложения и не может встраиваться в JSX`,
        );
    }
    return result;
}

// Передаём только явно объявленные импорты дочернего шаблона через его metadata.props.
function templateImports(value: unknown): string[] {
    if (value === undefined) return [];
    if (!Array.isArray(value) || !value.every((declaration) => typeof declaration === 'string')) {
        throw new Error('Вложенный компонент вернул некорректный список импортов');
    }
    return value;
}

const type = instance.getEnum('Type', {
    'Icon 24': 'icon24',
    'Icon 16': 'icon16',
    'icon-20': 'icon20',
    'Spinner 24': 'spinner24',
    'Spinner 16': 'spinner16',
});
const loading = type === 'spinner24' || type === 'spinner16';
let content;
let childImports: string[] = [];
if (loading) {
    const child = instance.findInstance('Spinner');
    if (child.type !== 'INSTANCE') throw new Error('Не найден Spinner');
    const result = nestedTemplate(child);
    content = result.example;
    childImports = templateImports(result.metadata?.props?.imports);
} else {
    const child = instance.getInstanceSwap(
        type === 'icon24' ? 'Icon-24' : type === 'icon16' ? 'Icon-16' : 'Icon-20',
    );
    if (!child || child.type !== 'INSTANCE') throw new Error('Не найдена иконка');
    const result = nestedTemplate(child);
    const code = result.example;
    childImports = templateImports(result.metadata?.props?.imports);
    content =
        type === 'icon20' || result.metadata?.props?.svgSize === 20
            ? figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${code}, props)} />`
                  .sections
            : code;
}

const imports = [
    ...new Set([
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
        ...childImports,
    ]),
];

export default {
    id: 'core-icon-button-iconbuttonicon',
    imports,
    example: figma.code`${content}`,
    metadata: { nestable: true, props: { loading, imports } },
};
