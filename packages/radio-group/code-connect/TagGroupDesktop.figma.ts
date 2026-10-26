// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=171-11319
// source=packages/radio-group/src/desktop/Component.desktop.tsx
// component=RadioGroupDesktop
import figma from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', { '32': 32, '40': 40, '48': 48, '56': 56 });
const errorState = instance.getEnum('ErrorState', { False: false, True: true });
const label = instance.getBoolean('GroupTitle') ? instance.getString('✎ Group title') : undefined;
const error = errorState
    ? instance.getBoolean('ErrorMessage')
        ? instance.getString('✎ Error message')
        : true
    : undefined;
const hint =
    !errorState && instance.getBoolean('Hint') ? instance.getString('✎ Hint message') : undefined;
const items = instance.getSlot('Items');
if (!items?.length || !items.connectedInstances.length)
    throw new Error('Items должен содержать подключённые Tag');
const tags = items.connectedInstances.map((child) => {
    const checked = child.getEnum('SelectedState', { False: false, True: true });
    const childSize = child.getEnum('Size', { '32': 32, '40': 40, '48': 48, '56': 56 });
    if (typeof checked !== 'boolean') throw new Error('Не прочитан SelectedState вложенного Tag');
    if (childSize !== size) throw new Error('Размер каждого Tag должен совпадать с Size группы');
    return { checked, example: child.executeTemplate().example };
});
const initialChecked = tags.map((tag) => tag.checked);
const tagElements = tags.map((tag) => figma.code`(${tag.example}),`.sections);

export default {
    id: 'core-tag-group-desktop',
    imports: [
        "import React from 'react';",
        "import { RadioGroupDesktop } from '@alfalab/core-components/radio-group/desktop';",
        "import { CheckboxGroupDesktop } from '@alfalab/core-components/checkbox-group/desktop';",
        "import { TagDesktop } from '@alfalab/core-components/tag/desktop';",
    ],
    example: figma.code`type Scenario =
    | {
          mode: 'single';
          name: string;
          values: readonly string[];
          onChange: NonNullable<React.ComponentProps<typeof RadioGroupDesktop>['onChange']>;
      }
    | {
          mode: 'multiple';
          values: readonly string[];
          onChange: NonNullable<React.ComponentProps<typeof CheckboxGroupDesktop>['onChange']>;
      };

function Example({ scenario }: { scenario: Scenario }) {
    // values задаёт продукт в порядке Tag из макета; выбранность сохранена из Figma.
    const [checked, setChecked] = React.useState<boolean[]>(${JSON.stringify(initialChecked)});
    const tags: React.ReactElement<React.ComponentProps<typeof TagDesktop>>[] = [${tagElements}];
    if (scenario.values.length !== tags.length || scenario.values.some(value => !value) || new Set(scenario.values).size !== tags.length) {
        throw new Error('Передай уникальный непустой value для каждого Tag в порядке макета');
    }
    if (scenario.mode === 'single') {
        if (checked.filter(Boolean).length > 1) {
            throw new Error('В макете выбрано несколько Tag: для single выбери ровно один или ни одного');
        }
        const selectedIndex = checked.findIndex(Boolean);
        const value = selectedIndex < 0 ? null : scenario.values[selectedIndex];
        return <RadioGroupDesktop type="tag" direction="horizontal" name={scenario.name} value={value}
            onChange={(event, payload) => {
                setChecked(scenario.values.map(value => value === payload.value));
                scenario.onChange(event, payload);
            }}
            ${figma.helpers.react.renderProp('label', label)}
            ${figma.helpers.react.renderProp('error', error)}
            ${figma.helpers.react.renderProp('hint', hint)}
        >{tags.map((tag, index) => React.cloneElement(tag, { value: scenario.values[index] }))}</RadioGroupDesktop>;
    }
    return <CheckboxGroupDesktop type="tag" direction="horizontal"
        onChange={(event, payload) => {
            const index = scenario.values.indexOf(payload.name ?? '');
            if (index < 0) throw new Error('Неизвестный Tag в событии группы');
            setChecked(previous => previous.map((value, i) => i === index ? payload.checked : value));
            scenario.onChange(event, payload);
        }}
        ${figma.helpers.react.renderProp('label', label)}
        ${figma.helpers.react.renderProp('error', error)}
        ${figma.helpers.react.renderProp('hint', hint)}
    >{tags.map((tag, index) => React.cloneElement(tag, { name: scenario.values[index], checked: checked[index] }))}</CheckboxGroupDesktop>;
}`,
    metadata: { nestable: false, props: { initialChecked } },
};
