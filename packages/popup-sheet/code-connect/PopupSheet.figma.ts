// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=373-16737
// source=packages/popup-sheet/src/Component.tsx
// component=PopupSheet
import figma from 'figma';
const instance = figma.selectedInstance;
const hasCloser = instance.getBoolean('Cross');
// SwapMe is a placeholder, not the application's actual content.
export default {
    id: 'core-popup-sheet',
    imports: [
        "import { PopupSheet, type PopupSheetProps } from '@alfalab/core-components/popup-sheet';",
    ],
    example: figma.code`function Example({ open, onClose, children, padding }: Pick<PopupSheetProps, 'open' | 'onClose' | 'children' | 'padding'>) {
 return <PopupSheet open={open} onClose={onClose} padding={padding} hasCloser={${hasCloser ? 'true' : 'false'}}>{children}</PopupSheet>;
 }`,
    metadata: { nestable: false },
};
