import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    {
        day: 'Mon',
        Earned: '300',
    },
    {
        day: 'Tue',
        Earned: '0',
    },
    {
        day: 'Wed',
        Earned: '747',
    },
    {
        day: 'Thu',
        Earned: '820.92',
    },
    {
        day: 'Fri',
        Earned: '2100',
    },
    {
        day: 'Sat',
        Earned: '878',
    },
    {
        day: 'Sun',
        Earned: '926.12',
    },
    {
        day: 'Mon',
        Earned: '300',
    },
    {
        day: 'Tue',
        Earned: '321',
    },
    {
        day: 'Wed',
        Earned: '747',
    },
    {
        day: 'Thu',
        Earned: '820.92',
    },
    {
        day: 'Fri',
        Earned: '210',
    },
    {
        day: 'Sat',
        Earned: '478',
    },
    {
        day: 'Sun',
        Earned: '926.12',
    },
];

export const UserStatsByGame = (props) => {
    return (
        <AreaChart width={720} height={260} data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#474B5E" />
            <XAxis dataKey="day" fontSize=".7rem" />
            <YAxis fontSize=".7rem" />
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
            <Area
                type="linear"
                dataKey="Earned"
                strokeWidth={3}
                stroke="#3A873F"
                fill="#3A873F55"
            />
        </AreaChart>
    );
};
