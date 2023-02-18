import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut(props) {

    let [style, setStyle] = useState(typeof document !== 'undefined' ? getComputedStyle(document.body) : null)

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
                    '#16a34a', //green
                    '#22c55e',
                    '#4ade80',
                    '#86efac',
                    '#bbf7d0',
                    '#dcfce7',
                    // style.getPropertyValue('--color-assets') 
                ],
                borderColor: [
                    '#16a34a', //green
                    '#22c55e',
                    '#4ade80',
                    '#86efac',
                    '#bbf7d0',
                    '#dcfce7',
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