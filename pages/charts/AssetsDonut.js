import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut(props) {

    let arrayLabel = props.data ? Object.keys(props.data) : []

    let arrayData = props.data ? Object.values(props.data) : [] 

    let arrayOfObj = arrayLabel.map(function(d, i) {
        return {
            label: d,
            data: arrayData[i] || 0
        };
    });

    let sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return b.data < a.data;
    });

    let newArrayLabel = [];
    let newArrayData = [];

    sortedArrayOfObj.forEach(function(d) {
        newArrayLabel.push(d.label);
        newArrayData.push(d.data);
    });

    const data = {
        labels: newArrayLabel,
        datasets: [
            {
                label: props.label ? props.label : "",
                data: newArrayData,
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
        <div className=''>
            <Doughnut 
                data={data} 
                options={options} 
                height="250px"
                width="250px"
            />
            
        </div>
    )
}