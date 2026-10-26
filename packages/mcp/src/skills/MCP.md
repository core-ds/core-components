# MCP Tools Reference

## Available MCP Tools

Use these tools when working with components:

- `core-components-mcp_component_list` - List all available components
- `core-components-mcp_component_info` - Get component API (props, types, defaults)
- `core-components-mcp_component_demo` - Get demo examples
- `core-components-mcp_component_changelog` - Get changelog for a component

## Rules

- **Always use MCP tools** to get component data — never read the library's source files, `CHANGELOG.md`, `package.json`, or `*.mdx` docs directly from the filesystem (e.g. from `node_modules/@alfalab/*`). Reading the user's own project files (including its `package.json`) is fine.
- If a tool returns "not found" — do not guess or invent the component API.
- Deprecated components (see the table in [SKILL.md](./SKILL.md#deprecated-components-migration)) have no MCP data — tools return "not found" for them. Do not retry; tell the user the component is not available in the current version of MCP and offer to migrate to the replacement. Migrate following the [Migration workflow](./SKILL.md#migration-workflow) in SKILL.md, using the tools above to get the replacement's API and demos.

## When to Call Each Tool

**`component_list`** — call when:

- User asks to build UI but doesn't specify which component to use
- You need to check whether a specific component exists
- You want to discover related components (e.g., all date-related inputs)

**`component_info`** — call when:

- You need to know available props and their types
- User asks how a specific component works
- You need to check a prop's default value or allowed values
- A prop doesn't work as expected or there is a type error — verify the prop name and type
- You need `dataTestId` modifiers for nested elements — they are listed in the `dataTestId` prop description

**`component_demo`** — is a two-step tool:

- First call **without `name`** to list available demos (titles and descriptions only, no code):
    ```
    component_demo("Button")
    ```
- Then call **with `name`** (exact demo title from the list) to get the demo source code:
    ```
    component_demo("Button", "Виды кнопок")
    ```
    The result contains separate `desktop` and `mobile` fields — each is an independent source code string for the respective variant.

**`component_changelog`** — supports three modes:

- Call **without version params** to get the full changelog for the current and previous major versions (e.g. 50.x.x and 49.x.x):
    ```
    component_changelog("Button")
    ```
- Call **with `version`** to get the entry for a specific release:
    ```
    component_changelog("Button", version: "50.13.0")
    ```
- Call **with `v1` and `v2`** to see all changes between two versions (diff mode):
    ```
    component_changelog("Button", v1: "50.0.0", v2: "50.13.0")
    ```

Use changelog when: user asks what changed in a version, needs to understand breaking changes, or is upgrading from one version to another.

## Example: Upgrading a Component

User asks: _"What changed in Button between 50.0.0 and 50.13.0?"_

```
1. component_changelog("Button", v1: "50.0.0", v2: "50.13.0") → get all changes between versions
```
