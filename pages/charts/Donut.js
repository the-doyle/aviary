import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut(props) {

    const data = {
        labels: props.data ? Object.keys(props.data) : [],
        datasets: [
            {
                label: props.label ? props.label : "",
                data: props.data ? Object.values(props.data) : [],
                backgroundColor: [
                    '#1e293b',
                    '#475569',
                    '#64748b',
                    '#94a3b8',
                    '#cbd5e1',
                    '#e2e8f0',
                ],
                borderColor: [
                    '#1e293b',
                    '#475569',
                    '#64748b',
                    '#94a3b8',
                    '#cbd5e1',
                    '#e2e8f0',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false 
            },
        }
    }

    return (
        <div className='mt-6'>
            <Doughnut data={data} options={options} />
        </div>
    )
}