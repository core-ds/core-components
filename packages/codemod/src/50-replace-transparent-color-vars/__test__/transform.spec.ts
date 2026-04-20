import { applyTransform } from '@codeshift/test-utils';

import * as transformer from '../transform';

const inputCss = `
:root {
  --color-1: var(--color-dynamic-nulled);
  --color-2: var(--color-dynamic-primary-dark);
  --color-3: var(--color-dynamic-primary-light);
  --color-4: var(--color-dynamic-quaternary-dark);
  --color-5: var(--color-dynamic-quaternary-light);
  --color-6: var(--color-dynamic-quinary-dark);
  --color-7: var(--color-dynamic-quinary-light);
  --color-8: var(--color-dynamic-secondary-dark);
  --color-9: var(--color-dynamic-secondary-light);
  --color-10: var(--color-dynamic-senary-dark);
  --color-11: var(--color-dynamic-senary-light);
  --color-12: var(--color-dynamic-tertiary-dark);
  --color-13: var(--color-dynamic-tertiary-light);
  --color-14: var(--color-static-nulled);
  --color-15: var(--color-static-primary-dark);
  --color-16: var(--color-static-primary-light);
  --color-17: var(--color-static-quaternary-dark);
  --color-18: var(--color-static-quaternary-light);
  --color-19: var(--color-static-quinary-dark);
  --color-20: var(--color-static-quinary-light);
  --color-21: var(--color-static-secondary-dark);
  --color-22: var(--color-static-secondary-light);
  --color-23: var(--color-static-senary-dark);
  --color-24: var(--color-static-senary-light);
  --color-25: var(--color-static-tertiary-dark);
  --color-26: var(--color-static-tertiary-light);
}

.a {
  color: var(--color-dynamic-nulled);
  color: var(--color-dynamic-primary-dark);
  color: var(--color-dynamic-primary-light);
  color: var(--color-dynamic-quaternary-dark);
  color: var(--color-dynamic-quaternary-light);
  color: var(--color-dynamic-quinary-dark);
  background-color: var(--color-dynamic-quinary-light);
  background-color: var(--color-dynamic-secondary-dark);
  background-color: var(--color-dynamic-secondary-light);
  background-color: var(--color-dynamic-senary-dark);
  background-color: var(--color-dynamic-senary-light);
  background-color: var(--color-dynamic-tertiary-dark);
  border: 1px solid var(--color-dynamic-tertiary-light);
  border: 1px solid var(--color-static-nulled);
  border: 1px solid var(--color-static-primary-dark);
  border: 1px solid var(--color-static-primary-light);
  border: 1px solid var(--color-static-quaternary-dark);
  border: 1px solid var(--color-static-quaternary-light);
  background: var(--color-static-quinary-dark);
  background: var(--color-static-quinary-light);
  background: var(--color-static-secondary-dark);
  background: var(--color-static-secondary-light);
  background: var(--color-static-senary-dark);
  background: var(--color-static-senary-light);
  background: var(--color-static-tertiary-dark);
  background: var(--color-static-tertiary-light);
}
`;

const expectedCss = `
":root {
  --color-1: var(--color-light-transparent-default);
  --color-2: var(--color-dark-monochrome-white-8);
  --color-3: var(--color-light-monochrome-white-8);
  --color-4: var(--color-dark-monochrome-white-32);
  --color-5: var(--color-light-monochrome-white-32);
  --color-6: var(--color-dark-monochrome-white-16);
  --color-7: var(--color-light-monochrome-white-16);
  --color-8: var(--color-dark-monochrome-white-64);
  --color-9: var(--color-light-monochrome-white-64);
  --color-10: var(--color-dark-monochrome-white-12);
  --color-11: var(--color-light-monochrome-white-12);
  --color-12: var(--color-dark-monochrome-white-48);
  --color-13: var(--color-light-monochrome-white-48);
  --color-14: var(--color-light-transparent-default);
  --color-15: var(--color-static-monochrome-black-8);
  --color-16: var(--color-static-monochrome-white-8);
  --color-17: var(--color-static-monochrome-black-32);
  --color-18: var(--color-static-monochrome-white-32);
  --color-19: var(--color-static-monochrome-black-16);
  --color-20: var(--color-static-monochrome-white-16);
  --color-21: var(--color-static-monochrome-black-64);
  --color-22: var(--color-static-monochrome-white-64);
  --color-23: var(--color-static-monochrome-black-12);
  --color-24: var(--color-static-monochrome-white-12);
  --color-25: var(--color-static-monochrome-black-48);
  --color-26: var(--color-static-monochrome-white-48);
}

.a {
  color: var(--color-light-transparent-default);
  color: var(--color-dark-monochrome-white-8);
  color: var(--color-light-monochrome-white-8);
  color: var(--color-dark-monochrome-white-32);
  color: var(--color-light-monochrome-white-32);
  color: var(--color-dark-monochrome-white-16);
  background-color: var(--color-light-monochrome-white-16);
  background-color: var(--color-dark-monochrome-white-64);
  background-color: var(--color-light-monochrome-white-64);
  background-color: var(--color-dark-monochrome-white-12);
  background-color: var(--color-light-monochrome-white-12);
  background-color: var(--color-dark-monochrome-white-48);
  border: 1px solid var(--color-light-monochrome-white-48);
  border: 1px solid var(--color-light-transparent-default);
  border: 1px solid var(--color-static-monochrome-black-8);
  border: 1px solid var(--color-static-monochrome-white-8);
  border: 1px solid var(--color-static-monochrome-black-32);
  border: 1px solid var(--color-static-monochrome-white-32);
  background: var(--color-static-monochrome-black-16);
  background: var(--color-static-monochrome-white-16);
  background: var(--color-static-monochrome-black-64);
  background: var(--color-static-monochrome-white-64);
  background: var(--color-static-monochrome-black-12);
  background: var(--color-static-monochrome-white-12);
  background: var(--color-static-monochrome-black-48);
  background: var(--color-static-monochrome-white-48);
}"
`;

describe('css-codemod#replace-color-vars transform', () => {
    it('should transform correctly', async () => {
        const result = await applyTransform(transformer, inputCss);

        expect(result).toMatchInlineSnapshot(expectedCss);
    });
});
