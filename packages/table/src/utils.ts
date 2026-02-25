import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EmptyProps {}

export function isChildInstanceOf<P extends EmptyProps>(
    child: React.ReactElement,
    Component: React.ComponentType<P>,
) {
    // мы не можем полагаться на child.type === Component, см. https://github.com/gaearon/react-hot-loader/issues/304
    return child.type === React.createElement(Component, {} as P).type;
}
