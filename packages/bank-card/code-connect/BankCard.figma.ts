// url=https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web-Core?node-id=5-4926
// source=packages/bank-card/src/Component.tsx
// component=BankCard
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;
// Живой runtime может вернуть INSTANCE-заглушку даже при hasCodeConnect=true.
function resolvedSections(sections: ResultSection[]): boolean {
    return sections.every((section) => {
        if (section.type === 'ERROR') return false;
        if (section.type === 'INSTANCE')
            return !!section.resultSections && resolvedSections(section.resultSections);
        if (section.type === 'CODE' && section.code.includes('no Code Connect template found'))
            return false;
        return true;
    });
}

function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
function render(child: InstanceHandle) {
    if (child.hasCodeConnect() !== true)
        throw new Error(`Для вложенного ${child.name} отсутствует Code Connect`);
    const result = child.executeTemplate();
    if (!resolvedSections(result.example))
        throw new Error(`Для вложенного ${child.name} отсутствует готовый код`);
    if (result.metadata?.nestable === false)
        throw new Error('Вложенный компонент требует контекста приложения');
    return result.example;
}
function childCode(owner: InstanceHandle, path?: string[]) {
    const children = owner.findLayers(
        (node) => node.type === 'INSTANCE' && !node.name.startsWith('Placeholder_'),
        path ? { path } : undefined,
    );
    let code = figma.code``;
    for (const child of children)
        if (child.type === 'INSTANCE') {
            if (child.hasCodeConnect() !== true) return undefined;
            const result = child.executeTemplate();
            if (!resolvedSections(result.example)) return undefined;
            if (result.metadata?.nestable === false) return undefined;
            code = figma.code`${code}${result.example}`;
        }
    return children.length ? code : undefined;
}
const number = nested(instance, 'CardNumber');
const state = number.getEnum('State', { Default: 'default', Filled: 'filled' });
if (state === undefined) throw new Error('Неизвестное состояние номера карты');
const label = number.findText('Label');
if (label.type !== 'TEXT') throw new Error('Не найдена подпись номера карты');
const bank = nested(instance, 'BankLogo');
const bankType = bank.getEnum('Type', { Alfa: 'alfa', SwapMe: 'custom' });
const payment = nested(instance, 'PaymentSystemLogo').getEnum('Type', {
    SwapMe: 'derived',
    Mir: 'mir',
});
if (bankType === undefined || payment === undefined) throw new Error('Неизвестный логотип карты');
const bankCode = bankType === 'custom' ? childCode(bank) : undefined;
// Логотип платёжной системы вычисляет BankCard из валидного номера, отдельного пропса нет.

export default {
    id: 'core-BankCard',
    imports: ["import { BankCard, type BankCardProps } from '@alfalab/core-components/bank-card';"],
    example: figma.code`function Example({ ${state === 'filled' || payment === 'mir' ? 'value, onChange, ' : ''}${bankType === 'custom' && !bankCode ? 'bankLogo, ' : ''}onUsePhoto }: Required<Pick<BankCardProps, ${state === 'filled' || payment === 'mir' ? "'value' | 'onChange' | " : ''}${bankType === 'custom' && !bankCode ? "'bankLogo' | " : ''}'onUsePhoto'>>) {
  return <BankCard inputLabel={${JSON.stringify(label.textContent)}} ${state === 'filled' || payment === 'mir' ? 'value={value} onChange={onChange}' : 'value=""'} ${bankType === 'custom' ? (bankCode ? figma.code`bankLogo={<>${bankCode}</>}` : 'bankLogo={bankLogo}') : ''} onUsePhoto={onUsePhoto} />;
}`,
    metadata: {
        nestable: false,
        props: {
            contextReason:
                'Номер карты и пустой SwapMe банковского логотипа требуют данных приложения; связанный логотип используется динамически',
        },
    },
};
