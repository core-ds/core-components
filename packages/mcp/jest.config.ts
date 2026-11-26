import { createDefaultEsmPreset } from 'ts-jest';

const config = createDefaultEsmPreset({ tsconfig: 'tsconfig.json' });

export default config;
