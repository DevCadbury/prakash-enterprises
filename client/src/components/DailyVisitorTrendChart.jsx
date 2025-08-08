import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DailyVisitorTrendChart = ({ dailyData = [] }) => {
  // Process the data to ensure we have all days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const processedData = daysOfWeek.map((day, index) => {
    const dayData = dailyData.find((d) => {
      const date = new Date(d._id);
      return date.getDay() === index;
    });
    return {
      day,
      count: dayData ? dayData.count : 0,
      date: dayData ? dayData._id : null,
    };
  });

  const chartData = {
    labels: processedData.map((d) => d.day),
    datasets: [
      {
        label: "Daily Visitors",
        data: processedData.map((d) => d.count),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgb(59, 130, 246)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            return `${context.parsed.y} visitors`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
            weight: "500",
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
            weight: "500",
          },
          callback: function (value) {
            return value + " visitors";
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div className="w-full h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DailyVisitorTrendChart;
