// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=485-67101
// source=packages/amount/src/index.ts
// component=Amount
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

function childText(name: string, owner: InstanceHandle = instance): string {
    const child = owner.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден текстовый блок ${name}`);
    return child
        .findLayers((node) => node.type === 'TEXT', { traverseInstances: true })
        .filter((node) => node.type === 'TEXT')
        .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
        .join('');
}

const majorText = childText('Major')
    .replace(/[\s\u00a0\u202f]/g, '')
    .replace('−', '-');
const minorVisible = instance.getBoolean('Minor');
const minorText = minorVisible ? childText('Minor').replace(/^[,.]/, '') : '';
if (!/^[+-]?\d+$/.test(majorText) || !/^\d{0,6}$/.test(minorText))
    throw new Error('Сумму нельзя преобразовать без потерь');
const minority = minorText.length ? 10 ** minorText.length : 100;
const sign = majorText.startsWith('-') ? -1 : 1;
const value = Number(majorText) * minority + sign * Number(minorText || '0');
if (!Number.isSafeInteger(value))
    throw new Error('Сумма выходит за безопасный диапазон чисел JavaScript');
const currencyNode = instance.findInstance('Currency');
let currency;
let codeFormat = 'symbolic';
if (instance.getBoolean('Currency')) {
    if (currencyNode.type !== 'INSTANCE') throw new Error('Не найдена валюта');
    const type = currencyNode.getPropertyValue('Type');
    const codes: Record<string, string> = {
        '₽': 'RUB',
        $: 'USD',
        '€': 'EUR',
        '¥': 'CNY',
        '£': 'GBP',
        '₣': 'CHF',
    };
    if (typeof type === 'string' && codes[type]) currency = codes[type];
    else if (typeof type === 'string' && /^[A-Z]{3}$/.test(type)) {
        currency = type;
        codeFormat = 'letter';
    } else throw new Error('Для Custom-валюты требуется подтверждённый код валюты');
}
const minorNode = instance.findInstance('Minor');
const transparentMinor =
    minorVisible &&
    minorNode.type === 'INSTANCE' &&
    minorNode.getEnum('Opacity', { False: false, True: true });
if (currency && currencyNode.type === 'INSTANCE' && minorVisible) {
    const currencyOpacity = currencyNode.getEnum('Opacity', { False: false, True: true });
    if (currencyOpacity !== transparentMinor)
        throw new Error(
            'Разная прозрачность Minor и Currency не представлена одним transparentMinor',
        );
}
let rightCode;
if (instance.getBoolean('Addon')) {
    const child = instance.findInstance('Addon');
    if (child.type !== 'INSTANCE') throw new Error('Не найден Addon суммы');
    const nested = child.findLayers((node) => node.type === 'INSTANCE');
    const parts = nested
        .filter((node) => node.type === 'INSTANCE')
        .map((node) => (node.type === 'INSTANCE' ? nestedTemplate(node).example : []));
    if (!parts.length) throw new Error('Addon суммы не имеет подключённого содержимого');
    rightCode = parts.reduce((result, part) => figma.code`${result}${part}`, figma.code``);
}
export default {
    id: 'core-amount',
    imports: ["import { Amount } from '@alfalab/core-components/amount';"],
    example: figma.code`<Amount value={${value}} minority={${minority}}
        ${figma.helpers.react.renderProp('currency', currency)} codeFormat="${codeFormat}"
        view="${minorVisible && minorText ? 'withZeroMinorPart' : 'default'}"
        ${majorText.startsWith('+') ? 'showPlus' : ''} ${transparentMinor ? 'transparentMinor' : ''}
        ${rightCode ? figma.code`rightAddons={<>${rightCode}</>}` : ''} />`,
    metadata: { nestable: true },
};
