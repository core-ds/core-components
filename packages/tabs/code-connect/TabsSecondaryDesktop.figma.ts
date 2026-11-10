// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=8976-3268
// source=packages/tabs/src/components/secondary-tablist/Component.desktop.tsx
// component=SecondaryTabListDesktop
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
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
const size = instance.getEnum('Size', { '32': 'xxs', '40': 'xs', '48': 's', '56': 'm' });
const numericSize = instance.getEnum('Size', { '32': 32, '40': 40, '48': 48, '56': 56 });
if (!size || numericSize === undefined) throw new Error('Неизвестный размер TabsSecondary');
const view = 'filled';
const scrollable = booleanProperty(instance, 'Slider');
const items = instance.getSlot('Items');
if (!items?.length || !items.connectedInstances.length)
    throw new Error('Items должен содержать Tag');
const tags = items.connectedInstances;
const selected = tags.map((tag) => flag(tag, 'SelectedState'));
if (selected.filter(Boolean).length !== 1)
    throw new Error('Должна быть выбрана ровно одна вкладка');
const selectedIndex = selected.indexOf(true);
const shapes = tags.map((tag) =>
    tag.getEnum('Shape', { Rectangular: 'rectangular', Rounded: 'rounded' }),
);
if (shapes.some((shape) => !shape || shape !== shapes[0]))
    throw new Error('Форма каждого Tag должна быть одинаковой');
const titles = tags.map((tag, index) => {
    const childSize = tag.getEnum('Size', { '32': 32, '40': 40, '48': 48, '56': 56 });
    if (childSize !== numericSize)
        throw new Error('Размер каждого Tag должен совпадать с размером TabsSecondary');
    const single = flag(tag, 'SingleIcon');
    const clear = flag(tag, 'ClearButton');
    const indicator = tag.getEnum('Indicator', {
        Hidden: 'hidden',
        Collapsed: 'dot',
        Digit: 'count',
    });
    if (indicator === undefined) throw new Error('Неизвестный Indicator Tag');
    if (
        single ||
        clear ||
        indicator !== 'hidden' ||
        booleanProperty(tag, 'LeftAddon') ||
        booleanProperty(tag, 'RightAddon')
    )
        throw new Error(
            'SingleIcon, ClearButton, Indicator и Addon не поддержаны API SecondaryTabList',
        );
    if (!booleanProperty(tag, 'Label')) throw new Error('Вкладке требуется видимая подпись');
    return figma.code`{ id: ids[${index}], title: ${JSON.stringify(tag.getString('✎ Label'))}, disabled: ${flag(tag, 'DisabledState')} },`;
});
const tuple = Array.from({ length: tags.length }, () => "TabListTitle['id']").join(', ');
export default {
    id: 'core-tabs-secondary-desktop',
    imports: [
        "import React from 'react';",
        "import { SecondaryTabListDesktop } from '@alfalab/core-components/tabs/desktop';",
        "import type { TabListTitle, TabListProps } from '@alfalab/core-components/tabs/shared';",
    ],
    example: figma.code`function Example({ ids, onChange }: { ids: [${tuple}]; onChange?: TabListProps['onChange'] }) {
    if (new Set(ids).size !== ids.length) throw new Error('Идентификаторы вкладок должны быть уникальны');
    const [selectedId, setSelectedId] = React.useState<TabListTitle['id']>(ids[${selectedIndex}]);
    return <SecondaryTabListDesktop size="${size}" tagShape="${shapes[0]}" tagView="${view}" ${scrollable ? 'scrollable' : ''} selectedId={selectedId}
        onChange={(event, payload) => { setSelectedId(payload.selectedId); onChange?.(event, payload); }} titles={[${titles}]} />;
}`,
    metadata: { nestable: false },
};
