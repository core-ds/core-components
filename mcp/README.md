# Core-DS MCP Server

A lightweight Model Context Protocol (MCP) server for exploring the "core-ds" design system.

## Overview

This MCP server provides tools to explore and understand the "core-ds" component library by exposing information about components, their documentation, usage examples, and type definitions.

## Tools

1. **`list_components`** - Lists all available component names in the core-ds library
2. **`get_component_stories`** - Retrieves usage examples from \*.stories.tsx files for a specific component
3. **`get_component_props`** - Retrieves the main component file to see TypeScript interfaces/types

## Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Build the project:
    ```bash
    npm run build
    ```

## Usage

The server expects the core-ds repository to be located at `../core-components` relative to this project. You can also specify a custom path using the `CORE_DS_PATH` environment variable:

```bash
CORE_DS_PATH=/path/to/core-components npm run start
```

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Test the setup
npm run test
```

## How to use with Cline

To use this MCP server with Cline, add the following configuration to your Cline settings:

```json
{
    "mcpServers": {
        "core-ds-expert": {
            "disabled": false,
            "timeout": 60,
            "type": "stdio",
            "command": "node",
            "args": ["/path/to/core-components/mcp/dist/index.js"],
            "env": {
                "CORE_DS_PATH": "/path/to/core-components"
            }
        }
    }
}
```
