// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=706-130930
// source=packages/select-with-tags/src/desktop/Component.desktop.tsx
// component=SelectWithTagsDesktop
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;

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

const inverted = true;
const semanticSuccess = false;
const size = instance.getEnum('Size', { '48': 48, '56': 56, '64': 64, '72': 72 });
if (size === undefined) throw new Error('Неизвестный размер поля');

function flag(owner: InstanceHandle, name: string): boolean {
    const value = owner.getEnum(name, { False: false, True: true });
    if (value === undefined) throw new Error(`Неизвестное значение ${name}`);
    return value;
}
function nested(name: string, owner: InstanceHandle = instance): InstanceHandle {
    const child = owner.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
function text(name: string, owner: InstanceHandle = instance): string {
    return nested(name, owner)
        .findLayers((node) => node.type === 'TEXT', { traverseInstances: true })
        .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
        .join('');
}
function addonType(name: string, enabled: boolean): string | undefined {
    if (!enabled) return undefined;
    const child = nested(name);
    const types =
        Number(size) === 40
            ? {
                  SwapMe: 'SwapMe',
                  'IconPrimary-16': 'icon16',
                  'IconSecondary-16': 'icon16',
                  'IconTertiary-16': 'icon16',
                  'IconPrimary-20': 'icon20',
                  'IconSecondary-20': 'icon20',
                  'IconTertiary-20': 'icon20',
                  ClearButton: 'ClearButton',
                  Spinner: 'Spinner',
                  StatusNegative: 'StatusNegative',
                  StatusPositive: 'StatusPositive',
                  Info: 'Info',
              }
            : {
                  SwapMe: 'SwapMe',
                  IconPrimary: 'icon24',
                  IconSecondary: 'icon24',
                  IconTertiary: 'icon24',
                  ClearButton: 'ClearButton',
                  Spinner: 'Spinner',
                  StatusNegative: 'StatusNegative',
                  StatusPositive: 'StatusPositive',
                  Info: 'Info',
              };
    const value = child.getEnum('Type', types);
    if (value === undefined) throw new Error(`Неизвестный тип ${name}`);
    return value;
}
function addon(name: string, enabled: boolean) {
    const kind = addonType(name, enabled);
    if (!kind) return undefined;
    const child = nested(name);
    if (kind === 'ClearButton' || (kind === 'StatusPositive' && semanticSuccess)) {
        if (!name.startsWith('Right'))
            throw new Error(`${kind} слева требует отдельного соответствия`);
        return undefined;
    }
    if (kind === 'SwapMe') {
        const slot = child.getSlot('Slot');
        return slot?.length ? addonContent(slot, name) : undefined;
    }
    if (
        kind === 'Spinner' ||
        kind === 'StatusNegative' ||
        kind === 'StatusPositive' ||
        kind === 'Info'
    ) {
        const layer =
            kind === 'Spinner' ? 'Spinner' : inverted ? 'StatusBadge_Inverted' : 'StatusBadge';
        return addonContent(nested(layer, child).executeTemplate()?.example, name);
    }
    const swapName =
        kind === 'icon20'
            ? inverted
                ? 'icon-20'
                : 'Icon-20'
            : kind === 'icon16'
              ? inverted
                  ? 'icon-16'
                  : 'Icon-16'
              : inverted
                ? 'Icon-24'
                : 'Instance';
    const icon = child.getInstanceSwap(swapName);
    if (!icon || icon.type !== 'INSTANCE') throw new Error(`Не найдено содержимое ${name}`);
    const rendered = addonContent(icon.executeTemplate()?.example, name, kind === 'icon20');
    return kind === 'icon20'
        ? figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${rendered}, props)} />`
              .sections
        : rendered;
}

const disabled = flag(instance, 'DisabledState');
const filled = flag(instance, 'FilledState');
const active = flag(instance, 'ActiveState');
const hasError = flag(instance, 'ErrorState');
const labelView = 'outer';
const label = booleanProperty(instance, 'Label') ? text('Label') : undefined;
const hint = !hasError && booleanProperty(instance, 'Hint') ? text('Hint') : undefined;
const error = hasError
    ? booleanProperty(instance, 'ErrorMessage')
        ? text('ErrorMessage')
        : true
    : undefined;
const left = booleanProperty(instance, 'LeftAddons');
const right = true;
const left1 = addon('LeftAddon1', left);
const left2 = addon('LeftAddon2', left && booleanProperty(instance, '↳ LeftAddon2'));
const right2Enabled = right && booleanProperty(instance, 'RightAddon2');
const right2 = addon('RightAddon2', right2Enabled);
const leftCode = left1 || left2 ? figma.code`<>${left1 || ''}${left2 || ''}</>` : undefined;
const right1 = undefined;
const rightCode = right1 || right2 ? figma.code`<>${right2 || ''}${right1 || ''}</>` : undefined;
const clear = addonType('RightAddon2', right2Enabled) === 'ClearButton';
const success = addonType('RightAddon2', right2Enabled) === 'StatusPositive';
const placeholder = !filled ? text('Placeholder') : undefined;
const colors = inverted ? 'inverted' : 'default';

let collapse = false;
let hasUserInput = false;
if (filled) {
    const valueBlock = nested('Value');
    collapse =
        booleanProperty(valueBlock, 'Control') &&
        flag(nested('🔩 TagControl', valueBlock), 'Collapsed');
    hasUserInput = booleanProperty(valueBlock, 'UserInput');
}
const contextType = filled
    ? " & { selected: NonNullable<SelectWithTagsDesktopProps['selected']> }"
    : '';

const addonContextType = addonParameters.length
    ? ` & { addonSlots: { ${addonParameters.join('; ')} } }`
    : '';

export default {
    id: 'core-select-with-tags-desktopinverted',
    imports: [
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
        "import { SelectWithTagsDesktop } from '@alfalab/core-components/select-with-tags/desktop';",
        "import type { SelectWithTagsDesktopProps } from '@alfalab/core-components/select-with-tags/desktop';",
    ],
    example: figma.code`function Example({ options, selected, onChange, open, onOpen, value, onInput${addonParameters.length ? ', addonSlots' : ''} }: Pick<SelectWithTagsDesktopProps, 'options' | 'selected' | 'onChange' | 'open' | 'onOpen' | 'value' | 'onInput'>${contextType}${addonContextType}) {
    return <SelectWithTagsDesktop options={options} selected={${filled ? 'selected' : '[]'}} onChange={onChange} open={open} onOpen={onOpen}
        size={${size}} labelView="${labelView}" ${disabled ? 'disabled' : ''} ${clear ? 'clear' : ''}
        ${figma.helpers.react.renderProp('label', label)} ${figma.helpers.react.renderProp('hint', hint)}
        ${figma.helpers.react.renderProp('error', error)} ${figma.helpers.react.renderProp('placeholder', placeholder)}
        fieldProps={{ colors: "${colors}", ${leftCode ? figma.code`leftAddons: ${leftCode},` : ''} ${rightCode ? figma.code`rightAddons: ${rightCode},` : ''} }} collapseTagList={${collapse}} ${hasUserInput ? 'value={value} onInput={onInput}' : ''} />;
}`,
    metadata: { nestable: false },
};
