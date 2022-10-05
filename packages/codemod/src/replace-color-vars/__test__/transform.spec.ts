import { applyTransform } from '@codeshift/test-utils';

import * as transformer from '../transform';

const inputCss = `
:root {
  --color-1: var(--color-light-border-secondary-inverted);
  --color-2: var(--color-light-border-tertiary-inverted);
  --color-3: var(--color-light-graphic-neutral);
  --color-4: var(--color-light-bg-neutral);
  --color-5: var(--color-dark-graphic-neutral);
  --color-6: var(--color-dark-bg-neutral);
  --color-7: var(--color-static-bg-neutral-light);
  --color-8: var(--color-static-bg-neutral-dark);
}

.a {
  color: var(--color-light-border-secondary-inverted);
  color: var(--color-light-border-secondary-inverted-tint-10);
  color: var(--color-light-border-secondary-inverted-shade-20);
  color: var(--color-light-border-secondary-inverted-alpha-30);
  background-color: var(--color-light-border-tertiary-inverted);
  border: 1px solid var(--color-light-graphic-neutral);
  background: var(--color-light-bg-neutral);
  background: var(--color-dark-graphic-neutral);
  background: var(--color-dark-bg-neutral);
  background: var(--color-static-bg-neutral-light);
  background: var(--color-static-bg-neutral-dark);
}
`;

const expectedCss = `
":root {
  --color-1: var(--color-light-border-underline);
  --color-2: var(--color-light-border-underline-inverted);
  --color-3: var(--color-light-graphic-quaternary);
  --color-4: var(--color-light-bg-quaternary);
  --color-5: var(--color-dark-graphic-quaternary);
  --color-6: var(--color-dark-bg-quaternary);
  --color-7: var(--color-static-bg-quaternary-light);
  --color-8: var(--color-static-bg-quaternary-dark);
}

.a {
  color: var(--color-light-border-underline);
  color: var(--color-light-border-underline-tint-10);
  color: var(--color-light-border-underline-shade-20);
  color: var(--color-light-border-underline-alpha-30);
  background-color: var(--color-light-border-underline-inverted);
  border: 1px solid var(--color-light-graphic-quaternary);
  background: var(--color-light-bg-quaternary);
  background: var(--color-dark-graphic-quaternary);
  background: var(--color-dark-bg-quaternary);
  background: var(--color-static-bg-quaternary-light);
  background: var(--color-static-bg-quaternary-dark);
}"
`;

describe('css-codemod#replace-color-vars transform', () => {
    it('should transform correctly', async () => {
        const result = await applyTransform(transformer, inputCss);

        expect(result).toMatchInlineSnapshot(expectedCss);
    });
});
