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
        // Получить список всех json-файлов из директории версии
        const versionDir = join(dirname(fileURLToPath(import.meta.url)), 'data', DATA_VERSION);
        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        // Привести имя компонента к kebab-slug для сравнения с именем файла
        const slug = component.trim().toLowerCase().replace(/\s+/g, '-');

        // Найти файл по slug или по displayName
        const file = files.find((f) => {
            const fileName = f.replace('.json', '');
            if (fileName === slug) {
                return true;
            }
            const data = JSON.parse(readFileSync(join(versionDir, f), 'utf-8'));
            return data.displayName.toLowerCase() === component.trim().toLowerCase();
        });

        if (!file) {
            return {
                content: [{ type: 'text' as const, text: `Component "${component}" not found.` }],
            };
        }

        const { displayName, props } = JSON.parse(readFileSync(join(versionDir, file), 'utf-8'));

        return {
            content: [
                { type: 'text' as const, text: JSON.stringify({ displayName, props }, null, 2) },
            ],
        };
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
        // Получить список всех json-файлов из директории версии
        const versionDir = join(dirname(fileURLToPath(import.meta.url)), 'data', DATA_VERSION);
        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        // Привести имя компонента к kebab-slug для сравнения с именем файла
        const slug = component.trim().toLowerCase().replace(/\s+/g, '-');

        // Найти файл по slug или по displayName
        const file = files.find((f) => {
            const fileName = f.replace('.json', '');
            if (fileName === slug) {
                return true;
            }
            const data = JSON.parse(readFileSync(join(versionDir, f), 'utf-8'));
            return data.displayName.toLowerCase() === component.trim().toLowerCase();
        });

        if (!file) {
            return {
                content: [{ type: 'text' as const, text: `Component "${component}" not found.` }],
            };
        }

        const { demos } = JSON.parse(readFileSync(join(versionDir, file), 'utf-8'));

        // Вернуть список демо без кода, если имя не указано
        if (!name) {
            const list = demos.map(({ title, description }: { title: string; description: string }) => ({
                title,
                description,
            }));
            return {
                content: [{ type: 'text' as const, text: JSON.stringify(list, null, 2) }],
            };
        }

        // Найти демо по заголовку
        const demo = demos.find(
            (d: { title: string }) => d.title.toLowerCase() === name.trim().toLowerCase(),
        );

        if (!demo) {
            return {
                content: [{ type: 'text' as const, text: `Demo "${name}" not found for component "${component}".` }],
            };
        }

        return {
            content: [{ type: 'text' as const, text: JSON.stringify(demo, null, 2) }],
        };
    },
);

const transport = new StdioServerTransport();
await server.connect(transport);
