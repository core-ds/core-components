#!/usr/bin/env node

import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import pkg from '@alfalab/core-components-mcp/package.json' with { type: 'json' };

import { DATA_VERSION } from './version.mjs';

const server = new McpServer({
    name: '@alfalab/core-components-mcp',
    version: pkg.version,
});

const versionDir = path.join(
    path.dirname(import.meta.resolve('@alfalab/core-components-mcp/package.json')),
    'data',
    DATA_VERSION,
);

// Найти и распарсить JSON-файл компонента по имени или slug
function readComponentData(component: string): Record<string, unknown> | null {
    const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

    // Сначала ищем по kebab-slug (быстро), затем по displayName (медленно — читает все файлы)
    const slug = component.trim().toLowerCase().replace(/\s+/g, '-');
    const normalized = component.trim().toLowerCase();

    const file = files.find((f) => {
        if (f.replace('.json', '') === slug) return true;
        const data = JSON.parse(readFileSync(path.join(versionDir, f), 'utf-8'));

        return data.displayName.toLowerCase() === normalized;
    });

    return file ? JSON.parse(readFileSync(path.join(versionDir, file), 'utf-8')) : null;
}

function toText(data: unknown) {
    const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

    return { content: [{ type: 'text' as const, text }] };
}

server.registerTool(
    'component_list',
    {
        description: 'List all available core-components with names and descriptions.',
    },
    async () => {
        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        const list = files
            .map((file) => {
                const { displayName, description, packageName } = JSON.parse(
                    readFileSync(path.join(versionDir, file), 'utf-8'),
                );

                return `**${displayName}** (${packageName}) — ${description}`;
            })
            .join('\n');

        return toText(`Version: ${DATA_VERSION}\n\n${list}`);
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
        const data = readComponentData(component);

        if (!data) {
            return toText(`Component "${component}" not found.`);
        }

        return toText({ displayName: data.displayName, props: data.props });
    },
);

server.registerTool(
    'component_demo',
    {
        description:
            'Get demo source code for a component. Without a name, lists all demos; with a name, returns specific demo code.',
        inputSchema: {
            component: z.string().describe('Component name (e.g. Button, Input, ActionButton)'),
            name: z.string().optional().describe('Demo title to get specific demo code'),
        },
    },
    async ({ component, name }) => {
        const data = readComponentData(component);

        if (!data) {
            return toText(`Component "${component}" not found.`);
        }

        const demos = data.demos as Array<{ title: string; description: string }>;

        if (!name) {
            // Вернуть только заголовки и описания — без кода, для выбора нужного демо
            return toText(demos.map(({ title, description }) => ({ title, description })));
        }

        const demo = demos.find((d) => d.title.toLowerCase() === name.trim().toLowerCase());

        if (!demo) {
            return toText(`Demo "${name}" not found for component "${component}".`);
        }

        return toText(demo);
    },
);

const transport = new StdioServerTransport();

await server.connect(transport);
