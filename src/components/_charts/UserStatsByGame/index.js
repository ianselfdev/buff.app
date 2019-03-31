import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const UserStatsByGame = (props) => {
    let { data } = props;

    if (data.length === 0) {
        data = [
            { day: 'Mon', Earned: 152 },
            { day: 'Tue', Earned: 3 },
            { day: 'Thu', Earned: 80 },
            { day: 'Wed', Earned: 57.2 },
            { day: 'Fri', Earned: 60 },
            { day: 'Sat', Earned: 121 },
            { day: 'Sun', Earned: 87 },
            { day: 'Mon', Earned: 152 },
            { day: 'Tue', Earned: 3 },
            { day: 'Thu', Earned: 80 },
            { day: 'Wed', Earned: 57.2 },
            { day: 'Fri', Earned: 60 },
            { day: 'Sat', Earned: 121 },
            { day: 'Sun', Earned: 87 },
            { day: 'Mon', Earned: 152 },
            { day: 'Tue', Earned: 3 },
            { day: 'Thu', Earned: 80 },
            { day: 'Wed', Earned: 57.2 },
            { day: 'Fri', Earned: 60 },
            { day: 'Sat', Earned: 121 },
            { day: 'Sun', Earned: 87 },
        ];
    }

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
