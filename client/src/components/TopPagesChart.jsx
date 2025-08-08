import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopPagesChart = ({ pageStats = [] }) => {
  // Process the data and limit to top 8 pages
  const topPages = pageStats.slice(0, 8);

  const chartData = {
    labels: topPages.map((page) => {
      const pageName =
        page.page === "home"
          ? "Home Page"
          : page.page === "admin"
          ? "Admin Panel"
          : page.page === "contact"
          ? "Contact Page"
          : page.page === "services"
          ? "Services Page"
          : page.page === "about"
          ? "About Page"
          : page.page.charAt(0).toUpperCase() + page.page.slice(1);
      return pageName;
    }),
    datasets: [
      {
        label: "Page Views",
        data: topPages.map((page) => page.count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(245, 158, 11, 0.8)", // Yellow
          "rgba(239, 68, 68, 0.8)", // Red
          "rgba(139, 92, 246, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(14, 165, 233, 0.8)", // Sky
          "rgba(34, 197, 94, 0.8)", // Emerald
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(139, 92, 246)",
          "rgb(236, 72, 153)",
          "rgb(14, 165, 233)",
          "rgb(34, 197, 94)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        hoverBorderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(139, 92, 246)",
          "rgb(236, 72, 153)",
          "rgb(14, 165, 233)",
          "rgb(34, 197, 94)",
        ],
        hoverBorderWidth: 3,
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
            return `${context.parsed.y} views`;
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
            size: 11,
            weight: "500",
          },
          maxRotation: 45,
          minRotation: 0,
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
            return value + " views";
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
      bar: {
        borderRadius: 8,
      },
    },
  };

  return (
    <div className="w-full h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopPagesChart;
