import React, { Fragment, type ReactNode } from 'react';

export interface AddonsConfig {
    priority: number;
    predicate: boolean;
    render: () => ReactNode;
}

export const getAddonsByPriority = (addons: AddonsConfig[]) => {
    const result = addons
        .filter((addon) => addon.predicate)
        .sort((a, b) => b.priority - a.priority)
        .map((addon, index) => {
            const key = `addon-${index}`;

            return <Fragment key={key}>{addon.render()}</Fragment>;
        });

    return result.length > 0 ? result : undefined;
};
