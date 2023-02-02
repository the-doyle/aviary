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
                    '#0284c7', //sky
                    '#0ea5e9',
                    '#38bdf8',
                    '#7dd3fc',
                    '#bae6fd',
                    '#e0f2fe',
                ],
                borderColor: [
                    '#0284c7', //sky
                    '#0ea5e9',
                    '#38bdf8',
                    '#7dd3fc',
                    '#bae6fd',
                    '#e0f2fe',
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