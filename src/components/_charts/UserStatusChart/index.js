//Core
import React from 'react';
import { VictoryPie } from 'victory';

export const UserStatusChart = (props) => (
    <svg viewBox="0 30 400 400">
        <defs>
            <linearGradient id="gradient" x1="40%" y1="30%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#1A491D" />
                <stop offset="100%" stopColor="#4A914F" />
            </linearGradient>
        </defs>
        <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={props.data}
            colorScale={['url(#gradient)', 'black']}
            innerRadius={115}
            style={{
                labels: { fontSize: 20, fill: 'transparent' },
            }}
        />
    </svg>
);
