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
    'hello_world',
    {
        description: 'Returns a simple greeting from the MCP server.',
        inputSchema: {
            name: z.string().optional().describe('Optional name to personalize the greeting'),
        },
    },
    async ({ name }) => {
        const target = name?.trim() || 'world';

        return {
            content: [
                {
                    type: 'text',
                    text: `Hello, ${target}! This response came from your MCP server.`,
                },
            ],
        };
    },
);

server.registerTool(
    'list_components',
    {
        description: 'List all available core-components with names and descriptions.',
    },
    async () => {
        const versionDir = join(dirname(fileURLToPath(import.meta.url)), 'data', DATA_VERSION);

        const files = readdirSync(versionDir).filter((f) => f.endsWith('.json'));

        const components = files.map((file) => {
            const raw = readFileSync(join(versionDir, file), 'utf-8');
            const data = JSON.parse(raw) as { displayName?: string; description?: string };

            return {
                displayName: data.displayName ?? file.replace('.json', ''),
                description: data.description ?? '',
            };
        });

        const text = components
            .map((c) => `**${c.displayName}** — ${c.description}`)
            .join('\n');

        return {
            content: [{ type: 'text', text }],
        };
    },
);

const transport = new StdioServerTransport();
await server.connect(transport);
