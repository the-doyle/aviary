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
                    '#bbf7d0', //green -> cyan
                    '#86efac',
                    '#4ade80',
                    '#22d3ee',
                    '#67e8f9',
                    '#a5f3fc',
                    // '#1e293b', //slate
                    // '#475569',
                    // '#64748b',
                    // '#94a3b8',
                    // '#cbd5e1',
                    // '#e2e8f0',
                ],
                borderColor: [
                    '#bbf7d0', //green -> cyan
                    '#86efac',
                    '#4ade80',
                    '#22d3ee',
                    '#67e8f9',
                    '#a5f3fc',
                    // '#1e293b', (slate)
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