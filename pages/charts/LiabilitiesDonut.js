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
                    '#9A8C98', 
                    '#A296A0',
                    '#A99EA7',
                    '#B0A6AE',
                    '#B7AEB6',
                    '#BEB6BD',
                ],
                borderColor: [
                    '#9A8C98', 
                    '#A296A0',
                    '#A99EA7',
                    '#B0A6AE',
                    '#B7AEB6',
                    '#BEB6BD',
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