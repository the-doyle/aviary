import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

export default function HistoryLine(props) {

    let data = [] 
    let labels = [] 
    const firstAccount = props.data && props.data.length > 0 ? props.data[0].name : '' 

    if (props.data) {
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].name === firstAccount) {
                data.push(props.data[i].balance)
                labels.push(props.data[i].date)
            }
        }
    }

    const lineData = {
        labels: labels,
        datasets: [
            {
                fill: true,
                label: props.label ? props.label : "",
                data: data,
                borderColor: '#22c55e',
                backgroundColor: '#dcfce7',
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false 
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                tension: .3
            }
        },
        maintainAspectRatio: false,
    }

    return (
        <div className='opacity-40'>
            <Line 
                data={lineData} 
                options={options} 
                height="500px"
                width="500px"
            />
            
        </div>
    )
}