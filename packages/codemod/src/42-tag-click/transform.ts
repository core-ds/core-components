import { JSCodeshift } from 'jscodeshift';

import { tagTransformer } from '../42-tag-mobile/transform';

export default function transformer(file, api) {
    const j: JSCodeshift = api.jscodeshift;
    const source = j(file.source);

    const replacements = [{ name: 'view', from: 'outlined', to: 'filled' }];

    tagTransformer(source, j, replacements);

    return source.toSource({ quote: 'single' });
}
