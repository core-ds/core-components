#!/usr/bin/env node

import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import pkg from '@alfalab/core-components-mcp/package.json' with { type: 'json' };

import { DATA_VERSION } from './version.mjs';

if (process.argv[2] === 'add-skill') {
    const { addSkill } = await import('./add-skill.mjs');

    addSkill();
    process.exit(0);
}

const server = new McpServer({
    name: '@alfalab/core-components-mcp',
    version: pkg.version,
});

const versionDir = path.join(import.meta.dirname, 'data', DATA_VERSION);

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

server.registerTool(
    'component_changelog',
    {
        /*
         * Три режима работы:
         *   1. full   — только component: весь changelog текущего мажора
         *   2. single — component + version: запись одной конкретной версии
         *   3. diff   — component + v1 + v2: все изменения между двумя версиями
         */
        description:
            'Get changelog for a core-component. Three modes: omit version params to get the full current-major changelog; pass version for a single entry; pass v1 and v2 to see everything that changed between those releases.',
        inputSchema: {
            component: z.string().describe('Component name (e.g. Button, Input, ActionButton)'),
            version: z.string().optional().describe('Single version to look up, e.g. "1.1.0"'),
            v1: z
                .string()
                .optional()
                .describe('Older version boundary for diff mode, e.g. "1.0.0"'),
            v2: z
                .string()
                .optional()
                .describe('Newer version boundary for diff mode, e.g. "1.1.2"'),
        },
    },
    async ({ component, version, v1, v2 }) => {
        const data = readComponentData(component);

        if (!data) {
            return toText(`Component "${component}" not found.`);
        }

        const changelog = data.changelog as Array<{ version: string; description: string }>;

        if (!changelog?.length) {
            return toText(`No changelog data available for "${component}".`);
        }

        // Разбираем строку "X.Y.Z" в массив чисел для числового сравнения
        const parseVersion = (v: string) => v.split('.').map(Number) as [number, number, number];

        const compareVersions = (a: string, b: string) => {
            const [aMajor, aMinor, aPatch] = parseVersion(a);
            const [bMajor, bMinor, bPatch] = parseVersion(b);

            if (aMajor !== bMajor) {
                return aMajor - bMajor;
            }
            if (aMinor !== bMinor) {
                return aMinor - bMinor;
            }

            return aPatch - bPatch;
        };

        // Режим single: найти и вернуть запись для одной версии
        if (version) {
            const entry = changelog.find((e) => e.version === version.trim());

            if (!entry) {
                const available = changelog.map((e) => e.version).join(', ');

                return toText(
                    `No changelog entry found for ${component} version "${version}". Available versions: ${available}.`,
                );
            }

            return toText(entry);
        }

        // Режим diff: вернуть все записи строго между from и to
        if (v1 && v2) {
            const [from, to] = compareVersions(v1, v2) <= 0 ? [v1, v2] : [v2, v1];

            const entries = changelog.filter(
                (e) =>
                    // Берём версии после from (не включая его) и до to (включая)
                    compareVersions(e.version, from) > 0 && compareVersions(e.version, to) <= 0,
            );

            if (!entries.length) {
                return toText(
                    `No changelog entries found between ${from} and ${to} for "${component}".`,
                );
            }

            return toText({ from, to, entries });
        }

        // Режим full: вернуть весь changelog текущего мажора
        return toText(changelog);
    },
);

const transport = new StdioServerTransport();

await server.connect(transport);
