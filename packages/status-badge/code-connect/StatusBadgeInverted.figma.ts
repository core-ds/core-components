// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=722-45749
// source=packages/status-badge/src/index.ts
// component=StatusBadge
import figma from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
    '16': 16,
    '20': 20,
    '24': 24,
    '32': 32,
    '40': 40,
});
const view = instance.getEnum('View', {
    NegativeCross: 'negative-cross',
    NegativeAlert: 'negative-alert',
    NegativeBlock: 'negative-block',
    AttentionAlert: 'attention-alert',
    PositiveCheckmark: 'positive-checkmark',
    NeutralInformation: 'neutral-information',
    NeutralOperation: 'neutral-operation',
    NeutralCross: 'neutral-cross',
});
if (!size || !view) throw new Error('Неизвестный вариант StatusBadge');
export default {
    id: 'core-status-badge-inverted',
    imports: ["import { StatusBadge } from '@alfalab/core-components/status-badge';"],
    example: figma.code`<StatusBadge view="${view}" size={${size}} colors="inverted" />`,
    metadata: { nestable: true },
};
