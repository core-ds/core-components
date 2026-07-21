/**
 * Figma Code Connect — Button (v1).
 *
 * Связывает component set из Web :: Core с @alfalab/core-components/button.
 * Маппинг props — по канону bridge Button (вариант Figma ↔ props в коде).
 *
 * Вне v1 (следующий PR): leftAddons / rightAddons (Addon + иконки),
 * SingleIcon, loading, block, textResizing, nowrap, allowBackdropBlur.
 */
import figma from '@figma/code-connect/react';

import { ButtonDesktop } from '../src/desktop';
import { ButtonMobile } from '../src/mobile';

const buttonProps = {
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
    // В сниппет попадает только disabled при True (False не дублируем).
    disabled: figma.enum('DisabledState', {
        True: true,
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
        props: buttonProps,
        example: ({ view, size, shape, disabled, children, hint }) => (
            <ButtonDesktop view={view} size={size} shape={shape} disabled={disabled} hint={hint}>
                {children}
            </ButtonDesktop>
        ),
    },
);

figma.connect(
    ButtonMobile,
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-52208',
    {
        props: buttonProps,
        example: ({ view, size, shape, disabled, children, hint }) => (
            <ButtonMobile view={view} size={size} shape={shape} disabled={disabled} hint={hint}>
                {children}
            </ButtonMobile>
        ),
    },
);

figma.connect(
    ButtonDesktop,
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=650-19395',
    {
        props: buttonProps,
        example: ({ view, size, shape, disabled, children, hint }) => (
            <ButtonDesktop
                view={view}
                size={size}
                shape={shape}
                disabled={disabled}
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
        props: buttonProps,
        example: ({ view, size, shape, disabled, children, hint }) => (
            <ButtonMobile
                view={view}
                size={size}
                shape={shape}
                disabled={disabled}
                hint={hint}
                colors='inverted'
            >
                {children}
            </ButtonMobile>
        ),
    },
);
