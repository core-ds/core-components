import { copyFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

export function addSkill(): void {
    const sourcePath = path.join(import.meta.dirname, 'skills', 'SKILL.md');
    const targetDir = path.join(process.cwd(), '.agents', 'skills', 'core-components');
    const targetPath = path.join(targetDir, 'SKILL.md');

    const existed = existsSync(targetPath);

    mkdirSync(targetDir, { recursive: true });
    copyFileSync(sourcePath, targetPath);

    console.log(existed ? `Skill updated: ${targetPath}` : `Skill added: ${targetPath}`);
}
