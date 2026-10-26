// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=50305-25059
// source=packages/universal-modal/src/desktop/components/footer/index.tsx
// component=FooterDesktop
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const custom = instance.getEnum('Custom', { False: false, True: true });
const filledBackground = instance.getEnum('FilledBg', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// FilledBg и Overlap — визуальное состояние; не назначаем backgroundColor/sticky по одному кадру.
// Figma source: FilledBg selects the visible custom slot; it is not a runtime Footer prop.
const slot =
    hasContent && custom
        ? instance.getSlot(
              filledBackground ? 'FooterContent#118707:16' : 'FooterContentTransparent#118707:9',
          )
        : undefined;
let presetCode;
if (hasContent && !custom) {
    const preset = instance.findInstance('Presets');
    if (preset.type === 'INSTANCE' && preset.hasCodeConnect()) {
        const result = preset.executeTemplate();
        if (result.metadata?.nestable === true) presetCode = result.example;
    }
}
const content = custom ? slot : presetCode;
const example = !hasContent
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof FooterDesktop>['sticky']> }) {
  return <FooterDesktop sticky={sticky} />;
 }`
    : content
      ? figma.code`function Example({ footerContext }: { footerContext: Omit<ComponentProps<typeof FooterDesktop>, 'children'> }) {
  return <FooterDesktop {...footerContext}>${content}</FooterDesktop>;
 }`
      : figma.code`function Example({ footerProps }: { footerProps: ComponentProps<typeof FooterDesktop> }) {
  return <FooterDesktop {...footerProps} />;
 }`;

export default {
    id: 'core-universal-modal-universalmodalfooterdesktop',
    imports: [
        "import { FooterDesktop } from '@alfalab/core-components/universal-modal/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'footer',
            requiresParent: 'UniversalModalDesktop',
            composition: 'part',
            figmaOverlap: overlap,
            figmaFilledBackground: filledBackground,
            custom: custom,
            contentMode: hasContent,
        },
    },
};
