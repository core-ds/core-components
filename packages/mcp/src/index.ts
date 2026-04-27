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
    'list_components',
    {
        description: 'List all available core-components with names and descriptions.',
    },
    async () => {
        const versionDir = join(dirname(fileURLToPath(import.meta.url)), 'data', DATA_VERSION);

        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        const components = files.map((file) => {
            const { displayName, description, packageName } = JSON.parse(readFileSync(join(versionDir, file), 'utf-8'));

            return { displayName, description, packageName };
        });

        const list = components.map((c) => `**${c.displayName}** (${c.packageName}) — ${c.description}`).join('\n');
        const text = `Version: ${DATA_VERSION}\n\n${list}`;

        return {
            content: [{ type: 'text', text }],
        };
    },
);

const transport = new StdioServerTransport();
await server.connect(transport);
