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
                    '#c084fc', //purple -> fuchsia
                    '#d8b4fe',
                    '#e9d5ff',
                    '#f5d0fe',
                    '#f0abfc',
                    '#e879f9',
                    // '#1e293b', //slate
                    // '#475569',
                    // '#64748b',
                    // '#94a3b8',
                    // '#cbd5e1',
                    // '#e2e8f0',
                ],
                borderColor: [
                    '#c084fc', //purple -> fuchsia
                    '#d8b4fe',
                    '#e9d5ff',
                    '#f5d0fe',
                    '#f0abfc',
                    '#e879f9',
                    // '#1e293b', //slate
                    // '#475569',
                    // '#64748b',
                    // '#94a3b8',
                    // '#cbd5e1',
                    // '#e2e8f0',
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