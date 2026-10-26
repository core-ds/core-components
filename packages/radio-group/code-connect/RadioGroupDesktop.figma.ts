// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=175-53923
// source=packages/radio-group/src/desktop/Component.desktop.tsx
// component=RadioGroupDesktop
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const type = instance.getEnum('Type', {
    Vertical: 'vertical',
    Horizontal: 'horizontal',
});
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
if (!items || !items.length) throw new Error('Заполни Items');
const radios = items.connectedInstances;
if (!radios.length) throw new Error('Items должен содержать подключённые Radio');
const rendered = radios.map((child, index) => {
    const result = child.executeTemplate();
    const props = result.metadata?.props;
    if (typeof props?.checked !== 'boolean')
        throw new Error('Требуются metadata.props.checked у Radio');
    return {
        id: `option-${index + 1}`,
        checked: props.checked,
        example: result.example,
    };
});
if (rendered.filter((item) => item.checked).length > 1)
    throw new Error('RadioGroup допускает один выбранный Radio');
const value = rendered.find((item) => item.checked)?.id ?? null;
const content = rendered.map(
    (item) =>
        figma.code`{React.cloneElement(${item.example}, { value: ${JSON.stringify(item.id)} })}`
            .sections,
);

export default {
    id: 'core-radio-group-radiogroupdesktop',
    imports: [
        "import React from 'react';",
        "import { RadioGroupDesktop } from '@alfalab/core-components/radio-group/desktop';",
    ],
    example: figma.code`function Example({ name }: { name: string }) {
  const [value, setValue] = React.useState<string | null>(${JSON.stringify(value)});
  return <RadioGroupDesktop name={name} value={value} onChange={(_event, payload) => setValue(payload.value)} direction="${type}"
    ${figma.helpers.react.renderProp('label', label)} ${figma.helpers.react.renderProp('error', error)} ${figma.helpers.react.renderProp('hint', hint)}
  >${content}</RadioGroupDesktop>;
}`,
    metadata: { nestable: false },
};
