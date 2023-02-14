import React, { useState } from 'react';
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

    let [style, setStyle] = useState(typeof document !== 'undefined' ? getComputedStyle(document.body) : null)

    let borderColor = style 
        ? props.column && props.column === 'sum_assets' 
            ? style.getPropertyValue('--color-assets') 
            : props.column && props.column == 'sum_liabilities' 
                ? style.getPropertyValue('--color-liabilities')
                : style.getPropertyValue('--color-brand')
        : null 

    let backgroundColor = style 
        ? props.column && props.column === 'sum_assets' 
            ? style.getPropertyValue('--color-assets-light') 
            : props.column && props.column == 'sum_liabilities' 
                ? style.getPropertyValue('--color-liabilities-light')
                : style.getPropertyValue('--color-brand-light')
        : null 

    const lineData = borderColor && backgroundColor ? {
        labels: props.data.map(function (entry) { return entry.date }),
        datasets: [
            {
                fill: true,
                label: props.label ? props.label : "",
                data: props.data.map(function (entry) { return props.column ? entry[props.column] : entry['net_worth'] }),
                borderColor: borderColor,
                backgroundColor: backgroundColor,
            },
        ],
    } : null 

    const options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial'
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    family: "Montserrat",
                    size: 12,
                    beginAtZero: true,
                    callback: function(value) {
                        return '$' + Intl.NumberFormat('en-US', {
                            notation: "compact",
                            maximumFractionDigits: 1
                          }).format(value);
                    }
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

    return typeof document !== 'undefined' && lineData ? (
        <div className='h-60 lg:h-96'>
            <Line 
                data={lineData} 
                options={options} 
                height="500px"
                width="500px"
            />
            
        </div>
    ) : null
}