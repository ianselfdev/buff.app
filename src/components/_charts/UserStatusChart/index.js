//Core
import React from 'react';
import { VictoryPie } from 'victory';

export const UserStatusChart = (props) => (
    <svg viewBox="0 30 400 400">
        <defs>
            <linearGradient id="gradient" x1="100%" y1="10%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={`${props.color}00`} />
                <stop offset="100%" stopColor={props.color} />
            </linearGradient>
        </defs>
        <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={props.data}
            colorScale={['url(#gradient)', '#1c1c1c']}
            innerRadius={115}
            style={{
                labels: { fontSize: 20, fill: 'transparent' },
            }}
        />
    </svg>
);
