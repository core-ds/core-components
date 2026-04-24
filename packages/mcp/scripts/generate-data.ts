import { globSync } from 'tinyglobby';

function main() {
    console.log('🔍  Search for components');

    const files = globSync('packages/*/src/Component.tsx', {
        absolute: true,
    });

    console.log(files);
}

main();
