// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=507-7865
// source=packages/universal-date-input/src/desktop/Component.desktop.tsx
// component=UniversalDateInputDesktop
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

// Непрозрачное содержимое задаёт сценарий; готовые секции сохраняют своё место.
const addonParameters: string[] = [];
function addonContent(sections: ResultSection[] | undefined, name: string, resolvedIcon = false) {
    if (!Array.isArray(sections) || !sections.length)
        throw new Error(`Не выполнен шаблон содержимого ${name}`);
    function opaque(section: ResultSection) {
        return (
            section.type === 'SLOT' ||
            (section.type === 'INSTANCE' && !section.resultSections?.length)
        );
    }
    function count(parts: ResultSection[]): number {
        return parts.reduce((total, section) => {
            if (!section || !['CODE', 'INSTANCE', 'SLOT', 'ERROR'].includes(section.type))
                throw new Error(`Некорректный результат содержимого ${name}`);
            if (section.type === 'ERROR')
                throw new Error(`Ошибка содержимого ${name}: ${section.message}`);
            if (
                section.type === 'CODE' &&
                (typeof section.code !== 'string' ||
                    /no Code Connect template found|Slot .* cannot be rendered/.test(section.code))
            )
                throw new Error(`Не выполнен шаблон содержимого ${name}`);
            return (
                total +
                (opaque(section)
                    ? 1
                    : section.type === 'INSTANCE'
                      ? count(section.resultSections ?? [])
                      : 0)
            );
        }, 0);
    }
    const contextCount = count(sections);
    if (resolvedIcon && contextCount)
        throw new Error(`Icon20Adapter требует раскрытый SVG-компонент ${name}`);
    const key = name.charAt(0).toLowerCase() + name.slice(1);
    let contextIndex = 0;
    function render(parts: ResultSection[]): ResultSection[] {
        const result: ResultSection[] = [];
        for (const section of parts) {
            if (opaque(section)) {
                const expression = `addonSlots.${key}${contextCount > 1 ? `[${contextIndex++}]` : ''}`;
                result.push(...figma.code`{${expression}}`.sections);
            } else if (section.type === 'INSTANCE') {
                result.push({ ...section, resultSections: render(section.resultSections ?? []) });
            } else result.push(section);
        }
        return result;
    }
    if (contextCount)
        addonParameters.push(`${key}: React.ReactNode${contextCount > 1 ? '[]' : ''}`);
    return render(sections);
}

// Runtime Code Connect хранит короткие имена без #id и краевых пробелов.
// Не допускаем, чтобы отсутствующее свойство (ErrorHandle) включало часть поля.
function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') {
        throw new Error(`Не прочитано логическое свойство ${name}`);
    }
    return value;
}

function childText(name: string, owner: InstanceHandle = instance): string {
    const child = owner.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден текстовый блок ${name}`);
    return child
        .findLayers((node) => node.type === 'TEXT', { traverseInstances: true })
        .filter((node) => node.type === 'TEXT')
        .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
        .join('');
}

// Addon — техническая область Figma. Читаем её реальный swap/slot,
// а код вложенного компонента получаем из его собственного Code Connect.
function addon(name: string, enabled: boolean) {
    if (!enabled) return undefined;
    const child = instance.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден ${name}`);
    const type = child.getPropertyValue('Type');
    if (type === 'Spinner' || type === 'ClearButton' || type === 'StatusPositive') return undefined;
    if (type === 'SwapMe') {
        const slot = child.getSlot('Slot');
        return slot?.length ? addonContent(slot, name) : undefined;
    }
    const swapName =
        type === 'Icon-16'
            ? 'Icon-16'
            : type === 'Icon-20'
              ? 'Icon-20'
              : type === 'Icon-24'
                ? 'Icon-24'
                : 'Instance';
    const content = child.getInstanceSwap(swapName);
    if (!content || content.type !== 'INSTANCE') throw new Error(`Проверь содержимое ${name}`);
    const rendered = addonContent(
        nestedTemplate(content, () => [{ type: 'SLOT', propertyName: name }])?.example,
        name,
        type === 'Icon-20',
    );
    if (type === 'Icon-20') {
        return figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${rendered}, props)} />`
            .sections;
    }
    return rendered;
}

function addonType(name: string, enabled: boolean) {
    if (!enabled) return undefined;
    const child = instance.findInstance(name);
    return child.type === 'INSTANCE' ? child.getPropertyValue('Type') : undefined;
}

const size = instance.getEnum('Size', { '40': 40, '48': 48, '56': 56, '64': 64, '72': 72 });
const labelView = instance.getEnum('OuterLabel', { False: 'inner', True: 'outer' });
const disabled = instance.getEnum('DisabledState', { False: false, True: true });
const filled = instance.getEnum('FilledState', { False: false, True: true });
const active = instance.getEnum('ActiveState', { False: false, True: true });
const hasError = instance.getEnum('ErrorState', { False: false, True: true });
const label = booleanProperty(instance, '↳ Label') ? childText('Label') : undefined;
const hint = !hasError && booleanProperty(instance, 'Hint') ? childText('Hint') : undefined;
const error = hasError
    ? booleanProperty(instance, 'ErrorMessage')
        ? childText('ErrorMessage')
        : true
    : undefined;
const value = filled ? childText('Value') : undefined;
const placeholder = !filled ? childText('Placeholder') : undefined;
const left = booleanProperty(instance, 'LeftAddons');
const right = booleanProperty(instance, 'RightAddons');
const left1 = addon('LeftAddon1', left);
const left2 = addon('LeftAddon2', left && booleanProperty(instance, '↳ LeftAddon2'));
const right2Enabled = right && booleanProperty(instance, '↳ RightAddon2');
const right2 = addon('RightAddon2', right2Enabled);
const clear = addonType('RightAddon2', right2Enabled) === 'ClearButton';
const success = addonType('RightAddon2', right2Enabled) === 'StatusPositive';
const leftCode = left1 || left2 ? figma.code`<>${left1 || ''}${left2 || ''}</>` : undefined;

// В декабрьском макете — одиночная дата. Другие форматы не подменяем датой.
let date;
if (value) {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim());
    if (!match)
        throw new Error(
            'Для этого шаблона нужна дата ДД.ММ.ГГГГ; другие view требуют отдельного маппинга',
        );
    const [, day, month, year] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    if (
        parsed.getFullYear() !== Number(year) ||
        parsed.getMonth() !== Number(month) - 1 ||
        parsed.getDate() !== Number(day)
    ) {
        throw new Error('Некорректная календарная дата');
    }
    date = figma.code`defaultValue={new Date(${Number(year)}, ${Number(month) - 1}, ${Number(day)})}`;
}
const picker = right && booleanProperty(instance, '↳ Picker');
const fieldExample = figma.code`<UniversalDateInputDesktop view="date" size={${size}} labelView="${labelView}"
        ${picker ? 'picker Calendar={Calendar}' : 'picker={false}'}
        ${disabled ? 'disabled' : ''} ${active ? 'autoFocus' : ''} ${clear ? 'clear' : ''} ${success ? 'success' : ''}
        ${figma.helpers.react.renderProp('label', label)} ${figma.helpers.react.renderProp('hint', hint)}
        ${figma.helpers.react.renderProp('error', error)} ${date || ''}
        ${figma.helpers.react.renderProp('placeholder', placeholder)}
        ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''}
        ${right2 ? figma.code`rightAddons={<>${right2}</>}` : ''} />`;

export default {
    id: 'core-universal-date-input-date-desktop',
    imports: [
        "import React from 'react';",
        "import { UniversalDateInputDesktop } from '@alfalab/core-components/universal-date-input/desktop';",
        "import { Calendar } from '@alfalab/core-components/calendar';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
    ],
    example: addonParameters.length
        ? figma.code`function Example({ addonSlots }: { addonSlots: { ${addonParameters.join('; ')} } }) {
    return ${fieldExample};
}`
        : fieldExample,
    metadata: { nestable: addonParameters.length === 0 },
};
