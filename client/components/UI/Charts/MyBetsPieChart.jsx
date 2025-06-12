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
                    label: label,
                    data: data.map(d => d.total),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                }]
            },
            options: {
                radius: '60%',
                responsive: true,
                maintainAspectRatio: false,
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
        <div className="w-full lg:w-4/5 bg-white rounded-lg shadow-sm dark:bg-gray-800 p-2 lg:p-6 p-1 mx-auto">
            <div className="flex justify-between items-start w-1/2">
                <div>
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{label}</h5>
                </div>
            </div>
            <div className="py-1 md:py-6">
                <canvas ref={chartRef} className='h-auto' />
            </div>
        </div>
    );
}