import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DATA_VERSION } from './version.js';

const server = new McpServer({
    name: '@alfalab/core-components-mcp',
    version: '0.1.0',
});

server.registerTool(
    'component_list',
    {
        description: 'List all available core-components with names and descriptions.',
    },
    async () => {
        const versionDir = join(dirname(fileURLToPath(import.meta.url)), 'data', DATA_VERSION);

        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        const components = files.map((file) => {
            const { displayName, description, packageName } = JSON.parse(
                readFileSync(join(versionDir, file), 'utf-8'),
            );

            return { displayName, description, packageName };
        });

        const list = components
            .map((c) => `**${c.displayName}** (${c.packageName}) — ${c.description}`)
            .join('\n');
        const text = `Version: ${DATA_VERSION}\n\n${list}`;

        return {
            content: [{ type: 'text', text }],
        };
    },
);

server.registerTool(
    'component_info',
    {
        description: 'Get component API information including props, types, and default values.',
        inputSchema: {
            component: z.string().describe('Component name (e.g. Button, Input, ActionButton)'),
        },
    },
    async ({ component }) => {
        const versionDir = join(dirname(fileURLToPath(import.meta.url)), 'data', DATA_VERSION);

        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        const slug = component.trim().toLowerCase().replace(/\s+/g, '-');

        const file = files.find((f) => {
            const name = f.replace('.json', '');
            if (name === slug) return true;
            const data = JSON.parse(readFileSync(join(versionDir, f), 'utf-8'));
            return data.displayName.toLowerCase() === component.trim().toLowerCase();
        });

        if (!file) {
            return {
                content: [{ type: 'text' as const, text: `Component "${component}" not found.` }],
            };
        }

        const { displayName, props } = JSON.parse(readFileSync(join(versionDir, file), 'utf-8'));

        const propsText = Object.values(props as Record<string, {
            name: string;
            description: string;
            type: { name: string };
            defaultValue: { value: string } | null;
            required: boolean;
        }>)
            .map((prop) => {
                const def = prop.defaultValue ? ` = ${prop.defaultValue.value}` : '';
                const req = prop.required ? ' (required)' : '';
                const desc = prop.description ? `\n    ${prop.description}` : '';
                return `- **${prop.name}**: \`${prop.type.name}\`${def}${req}${desc}`;
            })
            .join('\n');

        const text = `## ${displayName}\n\n### Props\n\n${propsText}`;

        return {
            content: [{ type: 'text' as const, text }],
        };
    },
);

//todo component_demo (Get demo source code for a component. Without a name, lists all demos; with a name, returns specific demo code.)

const transport = new StdioServerTransport();
await server.connect(transport);
