// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=50305-25022
// source=packages/universal-modal/src/mobile/components/footer/index.tsx
// component=FooterMobile
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
              filledBackground ? 'FooterContent#118707:33' : 'FooterContentTransparent#118707:26',
          )
        : undefined;
let presetCode;
if (hasContent && !custom) {
    const preset = instance.findInstance('Preset');
    if (preset.type === 'INSTANCE' && preset.hasCodeConnect()) {
        const result = preset.executeTemplate();
        if (result.metadata?.nestable === true) presetCode = result.example;
    }
}
const content = custom ? slot : presetCode;
const example = !hasContent
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof FooterMobile>['sticky']> }) {
  return <FooterMobile sticky={sticky} />;
 }`
    : content
      ? figma.code`function Example({ footerContext }: { footerContext: Omit<ComponentProps<typeof FooterMobile>, 'children'> }) {
  return <FooterMobile {...footerContext}>${content}</FooterMobile>;
 }`
      : figma.code`function Example({ footerProps }: { footerProps: ComponentProps<typeof FooterMobile> }) {
  return <FooterMobile {...footerProps} />;
 }`;

export default {
    id: 'core-universal-modal-universalmodalfootermobile',
    imports: [
        "import { FooterMobile } from '@alfalab/core-components/universal-modal/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'footer',
            requiresParent: 'UniversalModalMobile',
            composition: 'part',
            figmaOverlap: overlap,
            figmaFilledBackground: filledBackground,
            custom: custom,
            contentMode: hasContent,
        },
    },
};
