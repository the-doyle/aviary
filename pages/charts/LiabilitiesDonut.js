import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LiabilitiesDonut(props) {

    const data = {
        labels: props.data ? Object.keys(props.data) : [],
        datasets: [
            {
                label: props.label ? props.label : "",
                data: props.data ? Object.values(props.data) : [],
                backgroundColor: [
                    '#52525b', 
                    '#71717a',
                    '#a1a1aa',
                    '#d4d4d8',
                    '#e4e4e7',
                    '#f4f4f5',
                ],
                borderColor: [
                    '#52525b', 
                    '#71717a',
                    '#a1a1aa',
                    '#d4d4d8',
                    '#e4e4e7',
                    '#f4f4f5',
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
        },
        maintainAspectRatio: false,
    }

    return (
        <div className='mt-6'>
            <Doughnut 
                data={data} 
                options={options} 
                height="250px"
                width="250px"
            />
        </div>
    )
}