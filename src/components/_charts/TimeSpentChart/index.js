//Core
import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

//Instruments
import { legend } from './legend';

const COLORS = ['#3B8C41', '#E1C63B', '#DB7B35', '#447CBE'];

export const TimeSpentChart = (props) => {
    let { data } = props;
    const demoMode = localStorage.getItem('demoMode');

    if (data.length === 0 || !!demoMode) {
        data = [
            { name: 'DOTA 2', value: 26 },
            { name: 'League of Legends', value: 3 },
            { name: 'Fortnite', value: 18 },
            { name: 'CS:GO', value: 12 },
        ];
    }

    return (
        <PieChart width={370} height={270}>
            <Pie
                dataKey="value"
                data={data}
                isAnimationActive={false}
                cx={110}
                cy={125}
                outerRadius={90}
                innerRadius={40}
                fill="#3b8c41"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        stroke="none"
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Legend
                content={legend}
                layout="vertical"
                align="right"
                verticalAlign="top"
                iconType="circle"
            />
            <Tooltip
                contentStyle={{ backgroundColor: '#1C1C1C', borderRadius: 4 }}
                labelStyle={{
                    color: '#5A5A5A',
                    fontSize: '0.7rem',
                }}
                itemStyle={{
                    color: '#49AE51',
                    fontSize: '0.8rem',
                }}
            />
        </PieChart>
    );
};
