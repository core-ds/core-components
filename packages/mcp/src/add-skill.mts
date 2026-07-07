import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import path from 'path';

export function addSkill(): void {
    const sourceDir = path.join(import.meta.dirname, 'skills');
    const targetDir = path.join(process.cwd(), '.agents', 'skills', 'core-components');

    mkdirSync(targetDir, { recursive: true });

    const files = readdirSync(sourceDir).filter((f) => f.endsWith('.md'));

    for (const file of files) {
        const targetPath = path.join(targetDir, file);
        const existed = existsSync(targetPath);

        copyFileSync(path.join(sourceDir, file), targetPath);

        console.log(existed ? `Skill updated: ${targetPath}` : `Skill added: ${targetPath}`);
    }
}
