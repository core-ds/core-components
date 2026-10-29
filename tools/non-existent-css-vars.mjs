import path from 'node:path';

import { readPackagesFileSync } from './read-packages-file.cjs';

export const NON_EXISTENT_CSS_VARS_IGNORED_PACKAGES = readPackagesFileSync(
    path.resolve(import.meta.dirname, '.non-existent-css-vars-ignore-packages'),
);
