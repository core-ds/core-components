/**
 * Figma Code Connect — Button.
 *
 * Связывает component set из Web :: Core с @alfalab/core-components/button.
 * Маппинг — по канону bridge Button.
 *
 * Слоты Addon лежат внутри FRAME, поэтому figma.children их не видит
 * (см. figma/code-connect#372). Иконки в сниппете — через nestedProps + Type Addon.
 * Конкретный glyph в swap (кроме эталона diamonds) в сниппете не отражается.
 *
 * Не мапятся (нет свойств в Figma): block, textResizing, nowrap, allowBackdropBlur.
 */
import figma from '@figma/code-connect/react';
import { Diamonds20Icon } from '@alfalab/icons-glyph-26/Diamonds20Icon';
import { Diamonds24Icon } from '@alfalab/icons-glyph-26/Diamonds24Icon';
import { Icon20Adapter } from '@alfalab/core-components-shared/icon-20-adapter';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';

const sharedProps = {
    view: figma.enum('View', {
        Accent: 'accent',
        Primary: 'primary',
        Secondary: 'secondary',
        Outlined: 'outlined',
        Transparent: 'transparent',
        Text: 'text',
    }),
    size: figma.enum('Size', {
        '32': 32,
        '40': 40,
        '48': 48,
        '56': 56,
        '64': 64,
        '72': 72,
    }),
    shape: figma.enum('Shape', {
        Rectangular: 'rectangular',
        Rounded: 'rounded',
    }),
    disabled: figma.enum('DisabledState', {
        True: true,
    }),
    leftAddon: figma.boolean('LeftAddon', {
        true: figma.nestedProps('LeftAddon', {
            icon: figma.enum('Type', {
                'Icon-24': <Diamonds24Icon />,
                'Icon-20': <Icon20Adapter icon={Diamonds20Icon} />,
                'Icon-16': <Icon20Adapter icon={Diamonds20Icon} />,
                SwapMe: <Diamonds24Icon />,
                Spinner: undefined,
                Indicator: undefined,
            }),
            loading: figma.enum('Type', {
                Spinner: true,
            }),
        }),
        false: { icon: undefined, loading: undefined },
    }),
    rightAddon: figma.boolean('RightAddon', {
        true: figma.nestedProps('RightAddon', {
            icon: figma.enum('Type', {
                'Icon-24': <Diamonds24Icon />,
                'Icon-20': <Icon20Adapter icon={Diamonds20Icon} />,
                'Icon-16': <Icon20Adapter icon={Diamonds20Icon} />,
                SwapMe: <Diamonds24Icon />,
                Spinner: undefined,
                Indicator: undefined,
            }),
        }),
        false: { icon: undefined },
    }),
    children: figma.boolean('Label', {
        true: figma.string('✎ Label'),
        false: undefined,
    }),
    hint: figma.boolean('Hint', {
        true: figma.string('✎ Hint'),
        false: undefined,
    }),
};

figma.connect(
    ButtonDesktop,
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-50695',
    {
        props: sharedProps,
        example: ({ view, size, shape, disabled, leftAddon, rightAddon, children, hint }) => (
            <ButtonDesktop
                view={view}
                size={size}
                shape={shape}
                disabled={disabled}
                loading={leftAddon.loading}
                leftAddons={leftAddon.icon}
                rightAddons={rightAddon.icon}
                hint={hint}
            >
                {children}
            </ButtonDesktop>
        ),
    },
);

figma.connect(
    ButtonMobile,
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-52208',
    {
        props: sharedProps,
        example: ({ view, size, shape, disabled, leftAddon, rightAddon, children, hint }) => (
            <ButtonMobile
                view={view}
                size={size}
                shape={shape}
                disabled={disabled}
                loading={leftAddon.loading}
                leftAddons={leftAddon.icon}
                rightAddons={rightAddon.icon}
                hint={hint}
            >
                {children}
            </ButtonMobile>
        ),
    },
);

figma.connect(
    ButtonDesktop,
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=650-19395',
    {
        props: sharedProps,
        example: ({ view, size, shape, disabled, leftAddon, rightAddon, children, hint }) => (
            <ButtonDesktop
                view={view}
                size={size}
                shape={shape}
                disabled={disabled}
                loading={leftAddon.loading}
                leftAddons={leftAddon.icon}
                rightAddons={rightAddon.icon}
                hint={hint}
                colors='inverted'
            >
                {children}
            </ButtonDesktop>
        ),
    },
);

figma.connect(
    ButtonMobile,
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=650-20356',
    {
        props: sharedProps,
        example: ({ view, size, shape, disabled, leftAddon, rightAddon, children, hint }) => (
            <ButtonMobile
                view={view}
                size={size}
                shape={shape}
                disabled={disabled}
                loading={leftAddon.loading}
                leftAddons={leftAddon.icon}
                rightAddons={rightAddon.icon}
                hint={hint}
                colors='inverted'
            >
                {children}
            </ButtonMobile>
        ),
    },
);
