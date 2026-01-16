import fs from 'fs';
import path from 'path';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const coreDsPath = process.env.CORE_DS_PATH || '../core-components';

function findComponentPath(componentName: string): string | null {
    const packagesPath = path.join(coreDsPath, 'packages');

    const directPath = path.join(packagesPath, componentName);

    if (fs.existsSync(directPath) && fs.statSync(directPath).isDirectory()) {
        return directPath;
    }

    // If not found directly, search through all packages

    const packages = fs.readdirSync(packagesPath);

    for (const pkg of packages) {
        const pkgPath = path.join(packagesPath, pkg);

        if (fs.statSync(pkgPath).isDirectory()) {
            if (pkg === componentName) {
                return pkgPath;
            }

            const srcPath = path.join(pkgPath, 'src');

            if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
                const componentFiles = fs.readdirSync(srcPath);

                if (
                    componentFiles.some(
                        (file) =>
                            file === `${componentName}.tsx` ||
                            file === `${componentName}.ts` ||
                            file === 'index.tsx' ||
                            file === 'index.ts',
                    )
                ) {
                    return pkgPath;
                }
            }
        }
    }

    return null;
}

function findComponentSourcePath(componentName: string): string | null {
    const componentPath = findComponentPath(componentName);

    if (!componentPath) {
        return null;
    }

    const srcPath = path.join(componentPath, 'src');

    if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
        return srcPath;
    }

    // If src directory doesn't exist, check if componentPath itself contains source files
    try {
        const files = fs.readdirSync(componentPath);
        const hasSourceFiles = files.some(
            (file) =>
                file.endsWith('.tsx') ||
                file.endsWith('.ts') ||
                file === 'index.ts' ||
                file === 'index.tsx',
        );

        if (hasSourceFiles) {
            return componentPath;
        }
    } catch (error) {
        // If we can't read the directory, continue with other approaches
    }

    // For components with nested structure like calendar-input
    const componentsPath = path.join(componentPath, 'src', 'components');

    if (fs.existsSync(componentsPath) && fs.statSync(componentsPath).isDirectory()) {
        const componentSubPath = path.join(componentsPath, componentName);

        if (fs.existsSync(componentSubPath) && fs.statSync(componentSubPath).isDirectory()) {
            return componentSubPath;
        }
    }

    // For components with platform-specific implementations
    const desktopPath = path.join(componentPath, 'src', 'desktop');

    if (fs.existsSync(desktopPath) && fs.statSync(desktopPath).isDirectory()) {
        return desktopPath;
    }

    const mobilePath = path.join(componentPath, 'src', 'mobile');

    if (fs.existsSync(mobilePath) && fs.statSync(mobilePath).isDirectory()) {
        return mobilePath;
    }

    // If we still haven't found anything, return the component path
    return componentPath;
}

// Enhanced search for stories files
function findStoriesFiles(componentName: string): Array<{ fileName: string; content: string }> {
    const componentPath = findComponentPath(componentName);

    if (!componentPath) {
        return [];
    }

    const storiesFiles: Array<{ fileName: string; content: string }> = [];

    // Search in multiple possible locations for stories
    const possibleLocations: string[] = [
        path.join(componentPath, 'src'),
        path.join(componentPath, 'src', 'docs'),
        path.join(componentPath, 'src', 'components'),
        path.join(componentPath, 'src', 'components', componentName),
    ];

    for (const location of possibleLocations) {
        if (fs.existsSync(location) && fs.statSync(location).isDirectory()) {
            const files = fs.readdirSync(location);
            const componentStories = files.filter(
                (file) =>
                    file.includes('.stories.') &&
                    (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.mdx')),
            );

            for (const file of componentStories) {
                const filePath = path.join(location, file);
                const content = fs.readFileSync(filePath, 'utf-8');

                storiesFiles.push({ fileName: file, content });
            }
        }
    }

    return storiesFiles;
}

function findComponentFiles(componentName: string): string[] {
    const componentSourcePath = findComponentSourcePath(componentName);

    if (!componentSourcePath) {
        return [];
    }

    const componentFiles: string[] = [];

    const files = fs.readdirSync(componentSourcePath);

    const componentFilePattern = new RegExp('^Component\\..*\\.tsx$');

    for (const file of files) {
        if (componentFilePattern.test(file)) {
            componentFiles.push(file);
        }
    }

    // If no Component.*.tsx files found, try to find Component.tsx or Component.ts
    if (componentFiles.length === 0) {
        const componentFilePattern2 = new RegExp('^Component\\.(tsx|ts)$');

        for (const file of files) {
            if (componentFilePattern2.test(file)) {
                componentFiles.push(file);
            }
        }
    }

    // If no specific component files found, return all .tsx/.ts files
    if (componentFiles.length === 0) {
        const allComponentFiles = files.filter(
            (file) => file.endsWith('.tsx') || file.endsWith('.ts'),
        );

        // For calendar specifically, we want to include the main Component.responsive.tsx
        if (componentName === 'calendar') {
            const mainComponentFile = 'Component.responsive.tsx';

            if (files.includes(mainComponentFile)) {
                return [mainComponentFile];
            }
        }

        return allComponentFiles;
    }

    return componentFiles;
}

const server = new McpServer({
    name: 'Core-DS Expert',
    version: '0.0.1',
});

server.tool('list_components', {}, async () => {
    try {
        // Check if core-ds path exists
        if (!fs.existsSync(coreDsPath)) {
            return {
                content: [{ type: 'text', text: `Core-DS path does not exist: ${coreDsPath}` }],
                isError: true,
            };
        }

        const packagesPath = path.join(coreDsPath, 'packages');

        // Check if packages directory exists
        if (!fs.existsSync(packagesPath)) {
            return {
                content: [
                    { type: 'text', text: `Packages directory does not exist: ${packagesPath}` },
                ],
                isError: true,
            };
        }

        const packages = fs.readdirSync(packagesPath);

        // Filter out directories that don't look like component packages
        const componentNames = packages.filter((pkg) => {
            const pkgPath = path.join(packagesPath, pkg);

            return fs.statSync(pkgPath).isDirectory();
        });

        return {
            content: [{ type: 'text', text: JSON.stringify(componentNames, null, 2) }],
        };
    } catch (error) {
        return {
            content: [{ type: 'text', text: `Failed to read packages directory: ${error}` }],
            isError: true,
        };
    }
});

server.tool(
    'get_component_stories',
    {
        componentName: z.string().describe("Name of the component, e.g., 'Button'"),
    },
    async ({ componentName }) => {
        try {
            const storiesFiles = findStoriesFiles(componentName);

            if (storiesFiles.length === 0) {
                return {
                    content: [
                        { type: 'text', text: `No stories found for component: ${componentName}` },
                    ],
                };
            }

            // Read all stories files
            const storiesContent = storiesFiles.map((file) => ({
                fileName: file.fileName,
                content: file.content,
            }));

            return {
                content: [
                    {
                        type: 'text',
                        text: `Stories found for ${componentName}:\n\n${storiesContent.map((s) => `File: ${s.fileName}\n${s.content}\n`).join('\n')}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [{ type: 'text', text: `Error reading component stories: ${error}` }],
                isError: true,
            };
        }
    },
);

// Tool to get component props from the main component file
server.tool(
    'get_component_props',
    {
        componentName: z.string().describe("Name of the component, e.g., 'Button'"),
    },
    async ({ componentName }) => {
        try {
            const componentSourcePath = findComponentSourcePath(componentName);

            if (!componentSourcePath) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Component source path not found for: ${componentName}`,
                        },
                    ],
                };
            }

            const componentFiles = findComponentFiles(componentName);

            if (componentFiles.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No component files found for component: ${componentName}`,
                        },
                    ],
                };
            }

            // Read all component files
            const componentContents = componentFiles.map((file) => {
                const filePath = path.join(componentSourcePath, file);

                const content = fs.readFileSync(filePath, 'utf-8');

                return {
                    fileName: file,
                    content,
                };
            });

            return {
                content: [
                    {
                        type: 'text',
                        text: `Component files for ${componentName}:\n\n${componentContents.map((c) => `File: ${c.fileName}\n${c.content}\n`).join('\n')}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [{ type: 'text', text: `Error reading component props: ${error}` }],
                isError: true,
            };
        }
    },
);

async function main() {
    const transport = new StdioServerTransport();

    await server.connect(transport);
}

main();
