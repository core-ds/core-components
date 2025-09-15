import { type FC } from 'react';

import { Col, type ColProps } from './col';
import { Row, type RowProps } from './row';

export const Grid: {
    Row: FC<RowProps>;
    Col: FC<ColProps>;
} = {
    Row,
    Col,
};
