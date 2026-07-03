---
name: core-components
description: Work with @alfalab/core-components React UI library — imports, theming, MCP tools, and component patterns
license: MIT
---

# Core Components Skill

## Description

This skill provides guidance for working with the `@alfalab/core-components` React component library. It contains patterns, conventions, and best practices for using components effectively.

## Context

- **Library**: @alfalab/core-components
- **Components**: ~100 components available
- **Structure**: Desktop/Mobile responsive variants, theme support, TypeScript

## MCP Tools

- **Always use MCP tools** to get component data — never read source files, `CHANGELOG.md`, `package.json`, or `*.mdx` docs directly from the filesystem.
- If a tool returns "not found" — do not guess or invent the component API.

For tool reference and workflow: **read [MCP.md](./MCP.md)**.

Available tools: `component_list`, `component_info`, `component_demo`, `component_changelog`.

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

Never use individual packages (`@alfalab/core-components-button`). Root imports are the required pattern for this library.

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

Use responsive variant with `breakpoint` prop for automatic switching, or explicit variants when you need platform-specific behavior.

## Common Patterns

### Loading States

```tsx
<Button loading={isLoading} onClick={handleClick}>
    Submit
</Button>
```

### Addons/Slots

```tsx
<Button leftAddons={<Icon />} rightAddons={<Badge />}>
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

```tsx
import { CDNIcon } from '@alfalab/core-components/cdn-icon';

// Mono icon — inherits color from parent
<CDNIcon name="monkey_m" color="#FF5733" />

// Color icon — name contains "_color"
<CDNIcon name="monkey_color_m" />

// With fallback on load error
<CDNIcon name="monkey_m" fallback={<span>?</span>} onError={() => console.warn('Icon failed')} />
```

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

## CSS Variables

The library provides CSS custom properties for styling.

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

## Best Practices

1. **Use semantic prop names** - prefer `view`, `size`, `status` over custom styling
2. **Leverage built-in variants** - most components have pre-defined views
3. **Use breakpoints for responsive** - set once at root, components inherit
4. **Use `dataTestId`** - for testing automation
5. **Check component demos** - always verify with official examples

## Component Categories

| Category     | Components                                                    |
| ------------ | ------------------------------------------------------------- |
| Typography   | Title, TitleResponsive, TitleMobile, Text                     |
| Icons        | CDNIcon                                                       |
| Inputs       | Input, Textarea, Checkbox, Radio, Switch, Select, MaskedInput |
| Buttons      | Button, ActionButton, IconButton, CustomButton                |
| Layout       | Grid, Gap, Space, Stack, Plate                                |
| Navigation   | Tabs, SidePanel, NavigationBar, Pagination                    |
| Feedback     | Toast, Notification, Spinner, ProgressBar                     |
| Data Display | Badge, Tag, Amount, Skeleton, Status                          |
| Modals       | Modal, Drawer, BottomSheet, Popover                           |
| Forms        | FormControl, Slider, DateInput, FileUploadItem                |

## Troubleshooting

- **Component not found**: Check if desktop/mobile variant is exported
- **Props not working**: Verify correct prop name via `component_info`
- **Styling issues**: Ensure theme CSS is imported
- **Type errors**: Check prop types via `component_info`

## When to Use This Skill

- Creating new UI with core-components
- Finding appropriate component for a use case
- Understanding component API and props
- Looking up demo examples
- Migrating from legacy components
- Checking what changed between component versions
- Migrating from older versions of components to newer ones
- Migrating from deprecated components to current ones

## Deprecated Components Migration

If the user references a deprecated component, inform them that it is no longer supported and no MCP data is available for it. Then offer to help migrate to the replacement:

> **ComponentName** is deprecated and is not available in the current version of MCP. The recommended replacement is **ReplacementName**. Would you like me to help migrate to it?

Do not attempt to use the deprecated component's API or guess its props — always redirect to the replacement.

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
2. component_info("ReplacementName")   → check the new API
3. component_demo("ReplacementName")   → find a relevant demo
4. Rewrite usage with the new component API
```
