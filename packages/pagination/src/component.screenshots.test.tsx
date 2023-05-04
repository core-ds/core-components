import { createPreview } from '../../screenshot-utils';

describe('Pagination ', () => {
    createPreview(
        {
            componentName: 'Pagination',
            knobs: {
                pagesCount: 3,
            },
        },
        'transform:scale(2.9)',
    );
});
