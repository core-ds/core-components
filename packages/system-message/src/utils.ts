import { getDataTestId } from '@alfalab/core-components-shared';

import { Caption } from './components/caption';
import { Controls } from './components/controls';
import { Graphic } from './components/graphic';
import { Subtitle } from './components/subtitle';
import { Title } from './components/title';

export function createCompound<T>(functionComponent: T) {
    return Object.assign(functionComponent, {
        Graphic,
        Title,
        Subtitle,
        Caption,
        Controls,
    });
}

export function getSystemMessageTestIds(dataTestId: string) {
    return {
        systemMessage: dataTestId,
        caption: getDataTestId(dataTestId, 'caption'),
        controls: getDataTestId(dataTestId, 'controls'),
        graphic: getDataTestId(dataTestId, 'graphic'),
        subtitle: getDataTestId(dataTestId, 'subtitle'),
        title: getDataTestId(dataTestId, 'title'),
    };
}
