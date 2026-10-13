---
name: core-components
description: Work with @alfalab/core-components React UI library — imports, theming, CSS variables, and component patterns. Use when building or editing UI with @alfalab/core-components, choosing a component for a use case, looking up component props, demos or changelog, setting up themes, CSS variables or CoreConfig, or migrating from deprecated components and older library versions.
license: MIT
---

# Core Components Skill

## Description

This skill provides guidance for working with the `@alfalab/core-components` React component library. It contains patterns, conventions, and best practices for using components effectively.

## Context

- **Library**: @alfalab/core-components
- **Components**: ~100 components available
- **Structure**: Desktop/Mobile responsive variants, theme support, TypeScript

## Component Data

- If the core-components MCP server is available, **read [MCP.md](./MCP.md)** and use the MCP server as the primary source of component data (props, demos, changelog).
- Without MCP, rely on this skill, the project's existing code and the TypeScript types of the installed `@alfalab/core-components` version.
- If you cannot verify a component's API (props, allowed values, `dataTestId` modifiers) — do not guess or invent it. Say so explicitly.

## Working Scenarios

Before suggesting code, check the installed `@alfalab/core-components` version in the project's `package.json` — import paths, peer package names and available components depend on it.

### New code

Follow the current patterns from this skill: root package imports, current (non-deprecated) components, CSS variables instead of hardcoded values.

### Editing existing code

Consistency with the existing code takes priority:

- If the project uses legacy patterns (individual packages like `@alfalab/core-components-button`, old peer package names, a specific build variant like `/cssm` or `/modern`) — **keep the same style** in your change.
- Make a **minimal diff**: change only what the task requires.
- **Do not start a mass migration** (imports, versions, deprecated components) unless the user explicitly asks for it. You may mention that a migration is possible.

### Legacy vs Current

Do not write legacy patterns in new code. Use this table when the user asks to migrate:

| Legacy (do not use in new code)                             | Current                                                                                    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Individual packages `@alfalab/core-components-button`       | Root package `@alfalab/core-components/button`                                             |
| `@alfalab/core-config`, `@alfalab/stack-context`            | `@alfalab/core-components-config`, `@alfalab/core-components-stack-context` (v49+)         |
| `data-test-id` attribute passed to a component              | `dataTestId` prop                                                                          |
| Custom desktop/mobile detection (`window.innerWidth`, etc.) | `CoreConfig` + responsive components, or `useIsDesktop` from `@alfalab/core-components/mq` |
| Deprecated components (`Alert`, `Loader`, `DateInput`, …)   | Replacements from [Deprecated Components Migration](#deprecated-components-migration)      |

## Import Patterns

### Installation

```bash
# Main library
yarn add @alfalab/core-components

# Required peer dependencies
yarn add @alfalab/core-components-config @alfalab/core-components-stack-context
```

Both peer packages are mandatory for the library to function correctly.

> **Note:** Starting from `@alfalab/core-components@49` the peer package names changed:
>
> - `@alfalab/core-config` → `@alfalab/core-components-config`
> - `@alfalab/stack-context` → `@alfalab/core-components-stack-context`
>
> If the project uses `@alfalab/core-components` below v49, install the old package names instead.

- **`@alfalab/core-components-config`** — provides `CoreConfigContext` and `useCoreConfig` for global configuration of responsive components (breakpoint, client type, portal container). See [CoreConfig](#coreconfig) section.
- **`@alfalab/core-components-stack-context`** — provides `StackingContext` and `stackingOrder` constants for z-index management. Used internally by overlay components (Modal, Popover, Toast, etc.). Rarely used directly.

### Import Rule

**Always import from the root package** `@alfalab/core-components/<component>`:

```tsx
import { Button } from '@alfalab/core-components/button';
```

Never use individual packages (`@alfalab/core-components-button`) in new code. Root imports are the required pattern for this library. When editing existing code that already uses individual packages, see [Working Scenarios](#working-scenarios).

### Build Variants

Components are shipped in three build variants:

```tsx
// ES5 (default)
import { Button } from '@alfalab/core-components/button';

// ES5 with CSS Modules
import { Button } from '@alfalab/core-components/button/cssm';

// ES2020
import { Button } from '@alfalab/core-components/button/modern';
```

### Desktop/Mobile Variants

Some components have responsive variants:

| Variant              | Import path                               |
| -------------------- | ----------------------------------------- |
| Responsive (default) | `@alfalab/core-components/button`         |
| Desktop only         | `@alfalab/core-components/button/desktop` |
| Mobile only          | `@alfalab/core-components/button/mobile`  |

```tsx
// Responsive (auto-detects viewport)
import { Button } from '@alfalab/core-components/button';

// Explicit desktop variant
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';

// Explicit mobile variant
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
```

Use responsive variant for automatic switching, or explicit variants when you need platform-specific behavior. Set the breakpoint once for the whole app via [CoreConfig](#coreconfig); use the `breakpoint` prop only to override it for a specific component.

## Common Patterns

### Composition from Library Components

Build UI from library components instead of raw HTML and custom styles where an equivalent exists:

| Instead of                                 | Use                                                      |
| ------------------------------------------ | -------------------------------------------------------- |
| `<h1>`–`<h6>`, `<p>`, `<span>` with styles | `Typography.Title`, `Typography.TitleResponsive`, `Text` |
| `margin` between blocks                    | `Gap` (fixed spacer), `Space` (spacing between children) |
| Custom loading placeholders                | `<Skeleton visible={isLoading}>…</Skeleton>`             |
| `<a>`                                      | `Link`                                                   |
| `<button>` with custom styles              | `Button`, `IconButton`, `CustomButton`                   |

```tsx
import { Gap } from '@alfalab/core-components/gap';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { Space } from '@alfalab/core-components/space';

// Equal spacing between children
<Space size={16}>
    <Skeleton visible={isLoading}>
        <Text view='primary-medium'>{title}</Text>
    </Skeleton>
    <Skeleton visible={isLoading}>
        <Text view='secondary-medium'>{description}</Text>
    </Skeleton>
</Space>

// Single spacer between blocks
<Header />
<Gap size={24} />
<Content />
```

`Link` with `target='_blank'` sets `rel='noreferrer noopener'` automatically.

### Loading States

```tsx
<Button loading={isLoading} onClick={handleClick}>
    Submit
</Button>
```

### Addons/Slots

```tsx
<Button leftAddons={<Icon />} rightAddons={<Indicator value={3} />}>
    Label
</Button>
```

### Typography

```tsx
// Titles — use Typography package
import { Typography } from '@alfalab/core-components/typography';

<Typography.Title tag="h1" view="xlarge">Page title</Typography.Title>
<Typography.TitleResponsive tag="h2" view="large">Section title</Typography.TitleResponsive>

// Inline/block text — use Text package
import { Text } from '@alfalab/core-components/text';

<Text tag="p" view="primary-medium">Body text</Text>
<Text tag="span" view="secondary-small" rowLimit={2}>Truncated text</Text>
```

### Icons

There are two ways to use icons:

| Option                 | When to use                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `@alfalab/icons-glyph` | Icon is fixed in code. Icons are React components, mono, recolored via `color`       |
| `CDNIcon`              | Icon must be changeable without frontend changes — e.g. icon name comes from backend |

`@alfalab/icons-glyph` is a separate package — add it to the project dependencies:

```bash
yarn add @alfalab/icons-glyph
```

```tsx
import { ChevronRightMIcon } from '@alfalab/icons-glyph/ChevronRightMIcon';

<ChevronRightMIcon color='var(--color-light-neutral-700)' />;
```

> **Note:** passing `var(--color-*)` as a prop value works only if CSS variables are kept in the final CSS. If the project build removes or inlines CSS variables (e.g. `postcss-custom-properties` with `preserve: false`, or CSS purging that doesn't see variables used in JS), the color will not apply. In that case set the color via a CSS class or use the JS token:
>
> ```tsx
> import { colorLightNeutral700 } from '@alfalab/core-components/vars/colors-bluetint.module';
>
> <ChevronRightMIcon color={colorLightNeutral700} />;
> ```

```tsx
import { CDNIcon } from '@alfalab/core-components/cdn-icon';

// Mono icon — inherits color from parent
<CDNIcon name="monkey_m" color="#FF5733" />

// Color icon — name contains "_color"
<CDNIcon name="monkey_color_m" />

// With fallback on load error
<CDNIcon name="monkey_m" fallback={<span>?</span>} onError={() => console.warn('Icon failed')} />
```

### Wrapping Components

When creating a wrapper around a library component, reuse its exported props type via `Omit` / `&` instead of duplicating props:

```tsx
import { Button, type ButtonProps } from '@alfalab/core-components/button';

type SubmitButtonProps = Omit<ButtonProps, 'view' | 'type' | 'children'> & {
    label: string;
};

export const SubmitButton = ({ label, ...restProps }: SubmitButtonProps) => (
    <Button {...restProps} view='primary' type='submit'>
        {label}
    </Button>
);
```

Props types are exported next to components: `ButtonProps` from `@alfalab/core-components/button`, `ButtonDesktopProps` from `@alfalab/core-components/button/desktop`, etc. Forward `className` and `dataTestId` to the wrapped component.

## Theming

### Themes Package

Themes are shipped as separate package `@alfalab/core-components-themes`:

```bash
yarn add @alfalab/core-components-themes
```

### Available Themes

| Theme    | Package path                                   | Purpose                    |
| -------- | ---------------------------------------------- | -------------------------- |
| Mobile   | `@alfalab/core-components-themes/mobile.css`   | Mobile application styling |
| Site     | `@alfalab/core-components-themes/site.css`     | Site/website styling       |
| Corp     | `@alfalab/core-components-themes/corp.css`     | Corporate styling          |
| Click    | `@alfalab/core-components-themes/click.css`    | Click banking styling      |
| Intranet | `@alfalab/core-components-themes/intranet.css` | Intranet styling           |

### Dark Mode

```css
@import '@alfalab/core-components-themes/dark.css';
```

### Color Palettes

Default palette is `bluetint`. Additional palettes available:

| Palette     | CSS                                                    |
| ----------- | ------------------------------------------------------ |
| Bluetint    | `@alfalab/core-components/vars/colors-bluetint.css`    |
| Decorative  | `@alfalab/core-components/vars/colors-decorative.css`  |
| Qualitative | `@alfalab/core-components/vars/colors-qualitative.css` |
| Sequential  | `@alfalab/core-components/vars/colors-sequential.css`  |
| PFM         | `@alfalab/core-components/vars/colors-pfm.css`         |
| Students    | `@alfalab/core-components/vars/colors-students.css`    |

Import color palette:

```css
@import '@alfalab/core-components/vars/colors-bluetint.css';
```

Import color in JS:

```tsx
import { colorLightDecorativeOrange } from '@alfalab/core-components/vars/colors-decorative.module';
```

## CoreConfig

Global configuration for responsive components. Instead of setting `breakpoint` on each component, use the context provider.

### Parameters

| Parameter            | Type                                 | Default     | Description                                 |
| -------------------- | ------------------------------------ | ----------- | ------------------------------------------- |
| `breakpoint`         | `number`                             | `1024`      | Viewport width for switching mobile/desktop |
| `client`             | `'desktop' \| 'mobile'`              | `'desktop'` | Target client for SSR                       |
| `getPortalContainer` | `() => Element \| null \| undefined` | -           | Custom container for portals                |

### Usage

```tsx
import { CoreConfigContext } from '@alfalab/core-components/config';

const coreConfig = {
    breakpoint: 1024,
    client: 'desktop',
};

<CoreConfigContext.Provider value={coreConfig}>
    <App />
</CoreConfigContext.Provider>;
```

### Using config in components

```tsx
import { useCoreConfig } from '@alfalab/core-components/config';

const MyComponent = () => {
    const config = useCoreConfig();

    return <div>Breakpoint: {config.breakpoint}</div>;
};
```

### Desktop/Mobile Detection

Do not invent your own desktop/mobile detection (`window.innerWidth`, resize listeners, user-agent parsing). Use `@alfalab/core-components/mq`:

```tsx
import { Mq, useIsDesktop, useMatchMedia } from '@alfalab/core-components/mq';

// Desktop/mobile switch — respects CoreConfig breakpoint and client
const isDesktop = useIsDesktop();

// Arbitrary media query
const [matches] = useMatchMedia('(min-width: 600px)');

// Conditional rendering
<Mq query='(min-width: 600px)'>
    <Content />
</Mq>;
```

Prefer CSS media queries for purely visual changes and responsive components for desktop/mobile switching. `matchMedia` is more expensive than CSS and works only on the client — with SSR it can cause a mismatch between server and client markup.

## CSS Variables

The library provides CSS custom properties for styling.

### Usage Rules

**Always use existing variables (tokens) instead of hardcoded values** in custom styles:

- **Colors** — only `var(--color-*)`. No `#fff`, `rgba(...)`, named colors.
- **Spacing / gap** — only `var(--gap-*)`. No magic px values.
- **Border radius** — `var(--border-radius-*)`.
- **Shadows** — `var(--shadow-*)`.

If no suitable token exists, say so explicitly instead of silently hardcoding a value.

### Product Bundles

The recommended way to connect variables in a project is a prepared product bundle. Import it once in a root CSS file — after that all variables and mixins are available everywhere:

```css
/* app.css */
@import '@alfalab/core-components/vars/bundle/corp.css';
```

Available bundles: `click.css`, `corp.css`, `intranet.css`, `mobile.css`, `site.css` — all in `@alfalab/core-components/vars/bundle/`.

### Import All Variables

```css
@import '@alfalab/core-components/vars';
```

Or import as JS variables:

```tsx
import * as vars from '@alfalab/core-components/vars';

vars.gap2xl === '32px'; // true
```

### Available Variable Sets

| Category           | Import path                                          |
| ------------------ | ---------------------------------------------------- |
| All variables      | `@alfalab/core-components/vars`                      |
| Gaps/Spacing       | `@alfalab/core-components/vars/gaps.css`             |
| Border radius      | `@alfalab/core-components/vars/border-radius.css`    |
| Shadows (bluetint) | `@alfalab/core-components/vars/shadows-bluetint.css` |
| Typography         | `@alfalab/core-components/vars/typography.css`       |
| Mixins             | `@alfalab/core-components/vars/mixins.css`           |

## Test IDs

Components accept a `dataTestId` prop (camelCase), which is rendered as the `data-test-id` attribute in the DOM:

```tsx
<Button dataTestId='submit-button'>Submit</Button>
// → <button data-test-id="submit-button">
```

Nested elements get derived ids: `dataTestId` + `-` + modifier (e.g. `submit-button-loader` for the Button spinner). The available modifiers are listed in the `dataTestId` prop description. Do not guess modifiers.

For React Testing Library, configure the attribute once in the test setup:

```ts
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });
```

Then use `screen.getByTestId('submit-button')`.

## Best Practices

1. **Use semantic prop names** - prefer `view`, `size`, `status` over custom styling
2. **Leverage built-in variants** - most components have pre-defined views
3. **Use breakpoints for responsive** - set once at root, components inherit
4. **Use `dataTestId`** - for testing automation, see [Test IDs](#test-ids)
5. **Check component demos** - verify usage with official examples when they are available

## Component Categories

| Category     | Components                                                    |
| ------------ | ------------------------------------------------------------- |
| Typography   | Title, TitleResponsive, TitleMobile, Text                     |
| Icons        | CDNIcon, icons from `@alfalab/icons-glyph` (separate package) |
| Inputs       | Input, Textarea, Checkbox, Radio, Switch, Select, MaskedInput |
| Buttons      | Button, ActionButton, IconButton, CustomButton                |
| Layout       | Grid, Gap, Space, Plate                                       |
| Navigation   | Tabs, SidePanel, NavigationBar, Pagination                    |
| Feedback     | Toast, Notification, Spinner, ProgressBar                     |
| Data Display | StatusBadge, Indicator, Tag, Amount, Skeleton, Status         |
| Modals       | Modal, Drawer, BottomSheet, Popover                           |
| Overlay      | Stack (z-index management), Portal                            |
| Forms        | FormControl, Slider, UniversalDateInput, FileUploadItem       |

## Troubleshooting

- **Component not found**: Check if desktop/mobile variant is exported
- **Props not working**: Verify the prop name against the component's props
- **Styling issues**: Ensure theme CSS is imported
- **Type errors**: Check the component's exported props type (e.g. `ButtonProps`)

## Deprecated Components Migration

If the user references a deprecated component, inform them that it is no longer supported. Then offer to help migrate to the replacement:

> **ComponentName** is deprecated and no longer supported. The recommended replacement is **ReplacementName**. Would you like me to help migrate to it?

Do not attempt to use the deprecated component's API or guess its props — always redirect to the replacement.

When editing existing code that uses a deprecated component (see [Editing existing code](#editing-existing-code)):

- If the task does not touch the deprecated component — leave it as is. You may mention that a replacement exists.
- If the task requires changing the deprecated component's usage — do not guess its API. Tell the user that the component is deprecated and offer to migrate to the replacement first. Migrate only after the user agrees.

| Deprecated         | Replacement               |
| ------------------ | ------------------------- |
| `ConfirmationV1`   | `Confirmation`            |
| `FileUploadItemV1` | `FileUploadItem`          |
| `PassCodeV1`       | `PassCode`                |
| `PatternLockV1`    | `PatternLock`             |
| `Alert`            | `Plate`                   |
| `Badge`            | `StatusBadge`             |
| `CalendarInput`    | `UniversalDateInput`      |
| `DateInput`        | `UniversalDateInput`      |
| `DateRangeInput`   | `UniversalDateInput`      |
| `DateTimeInput`    | `UniversalDateInput`      |
| `TimeInput`        | `UniversalDateInput`      |
| `IntlPhoneInput`   | `InternationalPhoneInput` |
| `Loader`           | `Spinner`                 |

### Migration workflow

When a user's code uses a deprecated component:

```
1. Identify the replacement from the table above
2. Check the replacement's API (props, types, defaults)
3. Find a relevant usage example for the replacement
4. Rewrite usage with the new component API
```
