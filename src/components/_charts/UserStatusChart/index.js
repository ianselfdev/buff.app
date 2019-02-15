//Core
import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

export const UserStatusChart = (props) => (
    <svg viewBox="-100 20 600 600">
        <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={props.data}
            colorScale={['goldenrod', 'lightgrey']}
            innerRadius={125}
            style={{ labels: { fontSize: 20, fill: 'transparent' } }}
        />
        <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 30, fill: 'goldenrod' }}
            x={200}
            y={200}
            text={props.status}
        />
    </svg>
);
