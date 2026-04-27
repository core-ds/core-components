import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

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

const transport = new StdioServerTransport();
await server.connect(transport);
