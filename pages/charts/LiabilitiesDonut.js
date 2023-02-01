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
                    '#4f46e5', //indigo
                    '#6366f1',
                    '#818cf8',
                    '#a5b4fc',
                    '#c7d2fe',
                    '#e0e7ff',
                ],
                borderColor: [
                    '#4f46e5', //indigo
                    '#6366f1',
                    '#818cf8',
                    '#a5b4fc',
                    '#c7d2fe',
                    '#e0e7ff',
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