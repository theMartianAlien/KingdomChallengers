import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function MyBetsPieChart({ data, colors, label }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');

        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(d => d.key),
                datasets: [{
                    label: {label},
                    data: data.map(d => d.total),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff' // Dark mode support
                        }
                    }
                }
            }
        });

        return () => pieChart.destroy();
    }, []);

    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between items-start w-full">
                <div>
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{label}</h5>
                </div>
            </div>           
            <div className="py-6">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}