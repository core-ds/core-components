// url=https://www.figma.com/design/jDJxQE1knc3NySMBYYiBYf/Web----Core?node-id=2346-1498
// source=packages/pass-code/src/mobile/PassCodeMobile.tsx
// component=PassCodeMobile
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;

// Неподключённый INSTANCE возвращает комментарий вместо JSX, поэтому его нельзя молча встраивать.
function connectedExample(owner: InstanceHandle, label: string) {
    if (!owner.hasCodeConnect()) throw new Error(`Нет Code Connect для ${label}`);
    const result = owner.executeTemplate();
    if (result.metadata?.nestable === false)
        throw new Error(`Для ${label} требуется отдельный продуктовый контекст`);
    // hasCodeConnect может быть true у базовой ссылки, которую render позднее превратит в комментарий.
    function assertResolved(sections: ResultSection[]) {
        for (const section of sections) {
            if (section.type === 'ERROR')
                throw new Error(`Не удалось получить код для ${label}: ${section.message}`);
            if (section.type === 'INSTANCE') {
                if (!section.resultSections?.length)
                    throw new Error(`Не разрешён вложенный INSTANCE для ${label}`);
                assertResolved(section.resultSections);
            }
        }
    }
    assertResolved(result.example);
    return result.example;
}

function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error(`Не прочитано логическое свойство ${name}`);
    return value;
}
function flag(owner: InstanceHandle, name: string): boolean {
    const value = owner.getEnum(name, { False: false, True: true });
    if (typeof value !== 'boolean') throw new Error(`Неизвестное значение ${name}`);
    return value;
}
function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
const progress = nested(instance, 'Progress');
const dots = flag(progress, 'Dots');
const filled = flag(progress, 'FilledState');
const error = flag(progress, 'ErrorState');
const success = flag(progress, 'SuccessState');
if (error && success) throw new Error('ErrorState и SuccessState нельзя включить одновременно');
const indicators = progress
    .findLayers((node) => node.type === 'INSTANCE' && node.name === '🔩 ProgressIndicatorItem', {
        traverseInstances: true,
    })
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
if (!indicators.length) throw new Error('Не найдены элементы прогресса кода');
const states = indicators.map((item) =>
    item.getEnum('State', {
        Default: 'empty',
        Filled: 'filled',
        Negative: 'negative',
        Positive: 'positive',
    }),
);
if (states.some((value) => !value)) throw new Error('Неизвестное состояние ProgressIndicatorItem');
const filledCount = states.filter((value) => value !== 'empty').length;
if (states.some((value, index) => index < filledCount !== (value !== 'empty')))
    throw new Error('Заполненные элементы прогресса должны идти подряд с начала');
if (!filled && filledCount)
    throw new Error('FilledState=False не согласован с заполненным Progress');
const expectedState = success ? 'positive' : error ? 'negative' : 'filled';
if (states.some((value) => value !== 'empty' && value !== expectedState))
    throw new Error('Цвет заполненных точек не согласован с ErrorState/SuccessState');
if (success && filledCount !== indicators.length)
    throw new Error('SuccessState требует заполненного прогресса');
const keys = instance
    .findLayers((node) => node.type === 'INSTANCE' && node.name === 'Key', {
        traverseInstances: true,
    })
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
if (keys.length !== 12) throw new Error('PassCode должен содержать 12 позиций клавиатуры');
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', undefined, '0', undefined];
keys.forEach((key, index) => {
    const type = key.getEnum('Type', {
        Blank: 'blank',
        Icon: 'icon',
        Digit: 'digit',
        Text: 'text',
    });
    if (!type) throw new Error('Неизвестный Type Key');
    if (digits[index] !== undefined && (type !== 'digit' || key.getString('✎ N') !== digits[index]))
        throw new Error('Расположение цифр должно соответствовать встроенной клавиатуре PassCode');
});
const left = connectedExample(keys[9], 'левой ячейки Key');
const right = filledCount === 0 ? connectedExample(keys[11], 'правой ячейки Key') : undefined;
export default {
    id: 'core-pass-code',
    imports: [
        "import { PassCodeMobile } from '@alfalab/core-components/pass-code/mobile';",
        "import type { PassCodeProps } from '@alfalab/core-components/pass-code/typings';",
    ],
    // Значение кода берёт продукт; Figma задаёт только число заполненных точек.
    example: figma.code`function Example({ value, onChange }: Pick<PassCodeProps, 'value' | 'onChange'>) {
    if (value.length !== ${filledCount}) throw new Error('Длина value должна совпадать с заполненным Progress в Figma');
    return <PassCodeMobile value={value} onChange={onChange} ${dots ? 'codeLength' : 'maxCodeLength'}={${indicators.length}} ${error ? 'error' : ''} ${success ? 'success' : ''}
        leftAddons={${left}} ${filledCount === 0 ? figma.code`rightAddons={${right}}` : ''} />;
}`,
    metadata: { nestable: false },
};
