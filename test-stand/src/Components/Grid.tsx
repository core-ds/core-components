import React from 'react';
import { Grid } from '@alfalab/core-components-grid';
import { Wrapper } from './Wrapper';

const style: React.CSSProperties = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    background: '#ff5c5c',
    textAlign: 'center',
    marginTop: 10,
};

const GridExample = () => {
    return (
        <Wrapper>
            <Grid.Row>
                <Grid.Col width={{ desktop: { m: 12 } }}>
                    <div style={{ ...style, background: '#f04539', marginTop: 0 }}>12</div>
                </Grid.Col>
            </Grid.Row>
            <Grid.Row>
                {[1, 2].map(key => (
                    <Grid.Col width='6' key={key}>
                        <div style={style}>6</div>
                    </Grid.Col>
                ))}
            </Grid.Row>
            <Grid.Row>
                {[1, 2, 3].map(key => (
                    <Grid.Col width='4' key={key}>
                        <div style={{ ...style, background: '#f04539' }}>4</div>
                    </Grid.Col>
                ))}
            </Grid.Row>
            <Grid.Row>
                {[1, 2, 3, 4].map(key => (
                    <Grid.Col width='3' key={key}>
                        <div style={style}>3</div>
                    </Grid.Col>
                ))}
            </Grid.Row>
            <Grid.Row>
                {[1, 2, 3, 4, 5, 6].map(key => (
                    <Grid.Col width='2' key={key}>
                        <div style={{ ...style, background: '#f04539' }}>2</div>
                    </Grid.Col>
                ))}
            </Grid.Row>
            <Grid.Row>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(key => (
                    <Grid.Col width='1' key={key}>
                        <div style={style}>1</div>
                    </Grid.Col>
                ))}
            </Grid.Row>
        </Wrapper>
    );
};

export default GridExample;
