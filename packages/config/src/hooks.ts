import { useContext } from 'react';

import { DisabledContext } from '@alfalab/core-components-config//disabled-context';

export function useDisabled(disabled?: boolean | undefined) {
    const disabledFromContext = useContext(DisabledContext);

    return disabled ?? disabledFromContext;
}
