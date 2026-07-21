/**
 * Figma Code Connect — Button.
 *
 * Связывает component set из Web :: Core с @alfalab/core-components/button.
 * Маппинг — по канону bridge Button (варианты, label/hint, addons, SingleIcon, loading).
 *
 * Не мапятся (нет свойств в Figma): block, textResizing, nowrap, allowBackdropBlur.
 */
import figma from '@figma/code-connect/react';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';

const DESKTOP = 'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-50695';
const MOBILE = 'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-52208';
const DESKTOP_INVERTED =
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=650-19395';
const MOBILE_INVERTED =
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=650-20356';

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
    // Loading: LeftAddon + вложенный Addon Type=Spinner.
    leftAddonMeta: figma.boolean('LeftAddon', {
        true: figma.nestedProps('LeftAddon', {
            loading: figma.enum('Type', {
                Spinner: true,
            }),
        }),
        false: { loading: undefined },
    }),
    leftAddons: figma.boolean('LeftAddon', {
        true: figma.children('LeftAddon'),
        false: undefined,
    }),
    rightAddons: figma.boolean('RightAddon', {
        true: figma.children('RightAddon'),
        false: undefined,
    }),
};

const labelProps = {
    children: figma.boolean('Label', {
        true: figma.string('✎ Label'),
        false: undefined,
    }),
    hint: figma.boolean('Hint', {
        true: figma.string('✎ Hint'),
        false: undefined,
    }),
};

figma.connect(ButtonDesktop, DESKTOP, {
    variant: { SingleIcon: 'False' },
    props: { ...sharedProps, ...labelProps },
    example: ({
        view,
        size,
        shape,
        disabled,
        leftAddonMeta,
        leftAddons,
        rightAddons,
        children,
        hint,
    }) => (
        <ButtonDesktop
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            hint={hint}
        >
            {children}
        </ButtonDesktop>
    ),
});

figma.connect(ButtonDesktop, DESKTOP, {
    variant: { SingleIcon: 'True' },
    props: sharedProps,
    example: ({ view, size, shape, disabled, leftAddonMeta, leftAddons, rightAddons }) => (
        <ButtonDesktop
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
        />
    ),
});

figma.connect(ButtonMobile, MOBILE, {
    variant: { SingleIcon: 'False' },
    props: { ...sharedProps, ...labelProps },
    example: ({
        view,
        size,
        shape,
        disabled,
        leftAddonMeta,
        leftAddons,
        rightAddons,
        children,
        hint,
    }) => (
        <ButtonMobile
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            hint={hint}
        >
            {children}
        </ButtonMobile>
    ),
});

figma.connect(ButtonMobile, MOBILE, {
    variant: { SingleIcon: 'True' },
    props: sharedProps,
    example: ({ view, size, shape, disabled, leftAddonMeta, leftAddons, rightAddons }) => (
        <ButtonMobile
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
        />
    ),
});

figma.connect(ButtonDesktop, DESKTOP_INVERTED, {
    variant: { SingleIcon: 'False' },
    props: { ...sharedProps, ...labelProps },
    example: ({
        view,
        size,
        shape,
        disabled,
        leftAddonMeta,
        leftAddons,
        rightAddons,
        children,
        hint,
    }) => (
        <ButtonDesktop
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            hint={hint}
            colors='inverted'
        >
            {children}
        </ButtonDesktop>
    ),
});

figma.connect(ButtonDesktop, DESKTOP_INVERTED, {
    variant: { SingleIcon: 'True' },
    props: sharedProps,
    example: ({ view, size, shape, disabled, leftAddonMeta, leftAddons, rightAddons }) => (
        <ButtonDesktop
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            colors='inverted'
        />
    ),
});

figma.connect(ButtonMobile, MOBILE_INVERTED, {
    variant: { SingleIcon: 'False' },
    props: { ...sharedProps, ...labelProps },
    example: ({
        view,
        size,
        shape,
        disabled,
        leftAddonMeta,
        leftAddons,
        rightAddons,
        children,
        hint,
    }) => (
        <ButtonMobile
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            hint={hint}
            colors='inverted'
        >
            {children}
        </ButtonMobile>
    ),
});

figma.connect(ButtonMobile, MOBILE_INVERTED, {
    variant: { SingleIcon: 'True' },
    props: sharedProps,
    example: ({ view, size, shape, disabled, leftAddonMeta, leftAddons, rightAddons }) => (
        <ButtonMobile
            view={view}
            size={size}
            shape={shape}
            disabled={disabled}
            loading={leftAddonMeta.loading}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            colors='inverted'
        />
    ),
});
