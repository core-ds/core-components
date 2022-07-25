// eslint-disable-next-line prefer-destructuring
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

jest.autoMockOff();

defineTest(__dirname, 'transform', null, 'transform', { parser: 'tsx' });
defineTest(__dirname, 'transform', { packages: 'modal,button' }, 'transform-with-packages', {
    parser: 'tsx',
});
