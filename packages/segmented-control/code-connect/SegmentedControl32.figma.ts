// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147335-19531
// source=packages/segmented-control/src/Component.tsx
// component=SegmentedControl
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;

const shape = instance.getEnum('Shape', { Rectangular: 'rectangular', Rounded: 'rounded' });
const capacity = instance.getEnum('Capacity', { '2': 2, '3': 3, '4': 4, '5': 5 });
const resize = instance.getEnum('Resize', { Fill: 'fill', Hug: 'hug' });
if (!shape || capacity === undefined || !resize)
    throw new Error('Неизвестный вариант SegmentedControl');
// В коде подложка всегда равна parentWidth / count: переменная ширина Hug не поддержана.
if (resize === 'hug')
    throw new Error(
        'Resize=Hug не имеет точного соответствия: код рассчитывает подложку по равным ширинам',
    );

function flag(owner: InstanceHandle, name: string): boolean {
    const result = owner.getEnum(name, { True: true, False: false });
    if (result === undefined) throw new Error(`Неизвестное значение ${name}`);
    return result;
}

function addon(segment: InstanceHandle, name: string) {
    if (!segment.getBoolean(name)) return undefined;
    const detail = segment.findInstance(name, { traverseInstances: true });
    if (detail.type !== 'INSTANCE') throw new Error(`Не найден ${name}`);
    const type = detail.getEnum('Type', { SwapMe: 'slot', Icon_20: 'icon' });
    if (type === undefined) throw new Error(`Неизвестное дополнение ${name}`);
    if (type === 'slot') {
        const content = detail.getSlot('Slot');
        return content && content.length ? content : undefined;
    }
    const icon = detail.getInstanceSwap('Instance');
    if (!icon || icon.type !== 'INSTANCE') throw new Error(`Не найдена подстановка ${name}`);
    return icon.executeTemplate().example;
}

const segments = instance
    .findLayers((node) => node.type === 'INSTANCE' && node.name === 'Segment_32', {
        traverseInstances: true,
    })
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
if (segments.length !== capacity)
    throw new Error('Capacity не совпадает с числом вложенных сегментов');
const selected = segments.map((segment) => flag(segment, 'Selected'));
if (selected.filter(Boolean).length !== 1) throw new Error('Должен быть выбран ровно один сегмент');
const selectedIndex = selected.indexOf(true);
const dividerNames = ['1 | 2', '2 | 3', '3 | 4', '4 | 5'];
for (let index = 0; index < dividerNames.length; index += 1) {
    const visible = instance.getBoolean(dividerNames[index]);
    if (index < capacity - 1) {
        const expected = selectedIndex !== index && selectedIndex !== index + 1;
        if (visible !== expected)
            throw new Error(
                'Разделители рядом с выбранным сегментом должны быть скрыты, остальные видимы',
            );
    }
}

const children = segments.map((segment, index) => {
    // В подтверждённых Fill-деталях 32/40 подпись всегда видима и не имеет Label VARIANT.
    if (Object.keys(segment.properties).some((key) => key === 'Label')) {
        throw new Error(
            'Для Fill32/40 подтверждена деталь с видимой подписью; другой Segment требует проверки',
        );
    }
    const label = segment.getString('✎ Label');
    const left = addon(segment, 'LeftAddon');
    const right = addon(segment, 'RightAddon');
    // Оба встроенных Addon_20 и Slot разрешаются динамически; title имеет тип ReactNode.
    const title =
        left || right
            ? figma.code`title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>${left || ''}${figma.helpers.react.renderChildren(label)}${right || ''}</span>}`
            : figma.helpers.react.renderProp('title', label);
    return figma.code`<Segment id={ids[${index}]} ${title} />`;
});
const idTuple = Array.from({ length: capacity }, () => "SegmentProps['id']").join(', ');

export default {
    id: 'core-segmented-control-32',
    imports: [
        "import React from 'react';",
        "import { SegmentedControl, Segment } from '@alfalab/core-components/segmented-control';",
        "import type { SegmentedControlProps, SegmentProps } from '@alfalab/core-components/segmented-control';",
    ],
    example: figma.code`function Example({ ids, onChange }: { ids: [${idTuple}]; onChange?: SegmentedControlProps['onChange'] }) {
    if (new Set(ids).size !== ids.length) throw new Error('Идентификаторы сегментов должны быть уникальными');
    const [selectedId, setSelectedId] = React.useState<SegmentProps['id']>(ids[${selectedIndex}]);
    return <SegmentedControl size={32} shape="${shape}" style={{ width: '100%' }} selectedId={selectedId}
        onChange={(id) => { setSelectedId(id); onChange?.(id); }}>
        ${children}
    </SegmentedControl>;
}`,
    metadata: { nestable: false },
};
