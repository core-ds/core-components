import React from 'react';

import { isChildInstanceOf } from '../../utils';
import { THead } from '../thead';
import { type THeadCellProps } from '../thead-cell';

export function findAllHeadCellsProps(children: React.ReactElement | React.ReactElement[]) {
    const result: THeadCellProps[] = [];

    React.Children.forEach(children, (child) => {
        if (isChildInstanceOf(child, THead)) {
            React.Children.forEach(child.props.children, (headChild) => {
                result.push(headChild.props);
            });
        }
    });

    return result;
}
