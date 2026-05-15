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

## Available MCP Tools

Use these tools when working with components:

- `core-components-mcp_component_list` - List all available components
- `core-components-mcp_component_info` - Get component API (props, types, defaults)
- `core-components-mcp_component_demo` - Get demo examples

## MCP Tool Workflow

### Recommended sequence

Always follow this order when working with components:

```
1. component_list          → find the right component (when unsure)
2. component_info(name)    → get props, types, and defaults
3. component_demo(name)    → list available demos
4. component_demo(name, title) → get specific demo code
```

### When to call each tool

**`component_list`** — call when:

- User asks to build UI but doesn't specify which component to use
- You need to check whether a specific component exists
- You want to discover related components (e.g., all date-related inputs)

**`component_info`** — call when:

- You need to know available props and their types
- User asks how a specific component works
- You need to check a prop's default value or allowed values

**`component_demo`** — is a two-step tool:

- First call **without `name`** to list available demos (titles and descriptions only, no code):
    ```
    component_demo("Button")
    ```
- Then call **with `name`** to get the actual demo source code:
    ```
    component_demo("Button", "Loading")
    ```

### Example: building a feature

User asks: _"Add a date picker to this form"_

```
1. component_list()                          → find: UniversalDateInput, DateInput, CalendarInput
2. component_info("UniversalDateInput")      → check props: value, onChange, view, etc.
3. component_demo("UniversalDateInput")      → list demos: "Basic", "Range", "With label"
4. component_demo("UniversalDateInput", "Basic") → get code to use as reference
```

## Import Patterns

### Installation Options

```bash
# Install entire library
yarn add @alfalab/core-components

# Install individual component
yarn add @alfalab/core-components-button
```

### Import Variants

Components can be imported from two sources:

| Source             | Example                                                    |
| ------------------ | ---------------------------------------------------------- |
| Individual package | `import { Button } from '@alfalab/core-components-button'` |
| Root package       | `import { Button } from '@alfalab/core-components/button'` |

Both approaches are equivalent. Use individual packages for installing without the entire library.

### Build Variants

Components are shipped in three build variants:

```tsx
// ES5 (default)
import { Button } from '@alfalab/core-components-button';
import { Button } from '@alfalab/core-components/button';

// ES5 with CSS Modules
import { Button } from '@alfalab/core-components/button/cssm';
import { Button } from '@alfalab/core-components-button/cssm';

// ES2020
import { Button } from '@alfalab/core-components/button/modern';
import { Button } from '@alfalab/core-components-button/modern';
```

### Desktop/Mobile Variants

Some components have responsive variants:

| Variant              | Root package                              | Individual package                        |
| -------------------- | ----------------------------------------- | ----------------------------------------- |
| Responsive (default) | `@alfalab/core-components/button`         | `@alfalab/core-components-button`         |
| Desktop only         | `@alfalab/core-components/button/desktop` | `@alfalab/core-components-button/desktop` |
| Mobile only          | `@alfalab/core-components/button/mobile`  | `@alfalab/core-components-button/mobile`  |

```tsx
// Responsive (auto-detects viewport)
import { Button } from '@alfalab/core-components-button';

// Explicit desktop variant
import { ButtonDesktop } from '@alfalab/core-components-button/desktop';

// Explicit mobile variant
import { ButtonMobile } from '@alfalab/core-components-button/mobile';
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
import { Typography } from '@alfalab/core-components-typography';

<Typography.Title tag="h1" view="xlarge">Page title</Typography.Title>
<Typography.TitleResponsive tag="h2" view="large">Section title</Typography.TitleResponsive>

// Inline/block text — use Text package
import { Text } from '@alfalab/core-components-text';

<Text tag="p" view="primary-medium">Body text</Text>
<Text tag="span" view="secondary-small" rowLimit={2}>Truncated text</Text>
```

### Icons

```tsx
import { CDNIcon } from '@alfalab/core-components-cdn-icon';

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

### Installation

```bash
yarn add @alfalab/core-components-config
```

### Parameters

| Parameter            | Type                                 | Default     | Description                                 |
| -------------------- | ------------------------------------ | ----------- | ------------------------------------------- |
| `breakpoint`         | `number`                             | `1024`      | Viewport width for switching mobile/desktop |
| `client`             | `'desktop' \| 'mobile'`              | `'desktop'` | Target client for SSR                       |
| `getPortalContainer` | `() => Element \| null \| undefined` | -           | Custom container for portals                |

### Usage

```tsx
import { CoreConfigContext } from '@alfalab/core-components-config';

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
import { useCoreConfig } from '@alfalab/core-components-config';

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

### Product Bundles

Pre-configured bundles for specific products:

```css
@import '@alfalab/core-components/vars/bundle/click.css';
```

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
