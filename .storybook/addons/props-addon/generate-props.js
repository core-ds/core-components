const { withCustomConfig } = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function generatePropsMeta() {
    const componentsDir = path.resolve(__dirname, '../../../packages/toast/src/desktop/'); // todo тут тестовый путь для одного компонента

    const outFile = path.resolve(__dirname, '../../propsMeta.json');

    const files = glob.sync(path.join(componentsDir, '**/*.tsx'));

    if (!files.length) {
        console.warn('⚠️ Нет файлов для парсинга!');
        return;
    }

    const parser = withCustomConfig(path.resolve(__dirname, '../../tsconfig.json'), {
        shouldRemoveUndefinedFromOptional: true,
    });

    const parsed = parser.parse(files);

    const meta = {};
    parsed.forEach((comp) => {
        const filteredProps = Object.values(comp.props).filter((p) => {
            // todo тут можно провести фильтрацию не нужных пропов которые наследуются от react и т.д.

            if (['HTMLAttributes', 'AriaAttributes', 'DOMAttributes'].includes(p?.parent?.name)) {
                return false;
            }

            return true;
        });

        meta[comp.displayName] = {
            description: comp.description,
            props: filteredProps.map((p) => ({
                name: p.name,
                type: p.type.name,
                required: p.required,
                defaultValue: p.defaultValue?.value,
                description: p.description,
            })),
        };
    });

    fs.writeFileSync(outFile, JSON.stringify(meta, null, 2));
    console.log(`✅ propsMeta.json сгенерирован! (${Object.keys(meta).length} компонентов)`);
}

generatePropsMeta();
