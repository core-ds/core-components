import { Transform } from 'jscodeshift';

import { addOrReplaceNumericOrBooleanAttribute, findCoreComponentJSXElement } from '../utils';

const transformer: Transform = (file, api) => {
    const j = api.jscodeshift;
    const source = j(file.source);
    const component = findCoreComponentJSXElement(source, j, 'button', 'Button');

    if (component) {
        addOrReplaceNumericOrBooleanAttribute(source, j, component, 'breakpoint', 768);
    }

    return source.toSource({ quote: 'single' });
};

export default transformer;
