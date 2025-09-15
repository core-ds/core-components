const { withCustomConfig } = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

(function generatePropsMeta() {
    const componentsDir = path.resolve(__dirname, '../../../packages/');

    const outDir = path.resolve(__dirname, '../../props-meta');

    const parser = withCustomConfig(path.resolve(__dirname, '../../tsconfig.json'), {
        shouldRemoveUndefinedFromOptional: true,
    });
    const components = fs
        .readdirSync(componentsDir)
        .filter((component) => {
            const folderPath = path.join(componentsDir, component);
            return fs.statSync(folderPath).isDirectory();
        })
        .reduce((acc, component) => {
            const files = glob
                .sync(path.join(componentsDir, component, '**/*.tsx'))
                .filter(
                    (file) => !['stories', 'test'].some((substring) => file.includes(substring)),
                );

            if (!files.length) {
                return acc;
            }

            return [...acc, { name: component, files }];
        }, []);

    components.forEach((component) => {
        const parsed = parser.parse(component.files);

        const meta = parsed.reduce((acc, component) => {
            const filteredProps = Object.values(component.props).filter((p) => {
                return !['HTMLAttributes', 'AriaAttributes', 'DOMAttributes'].includes(
                    p?.parent?.name,
                );
            });

            return {
                ...acc,
                [component.displayName]: {
                    description: component.description,
                    props: filteredProps.map((p) => ({
                        name: p.name,
                        type: p.type.name,
                        required: p.required,
                        defaultValue: p.defaultValue?.value,
                        description: p.description,
                    })),
                },
            };
        }, {});

        const outFile = path.join(outDir, `${component.name}.json`);
        fs.writeFileSync(outFile, JSON.stringify(meta, null, 2));

        console.log(`✅\u3164File [${component.name}] generated`);
    });
})();
