import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpensesChart = (props) => {
  const getUniqueMonths = (expenses) => {
    const uniqueMonths = [];
    expenses.forEach((expense) => {
      const dateObject = new Date(expense.date);
      const month = dateObject.toLocaleString('en-US', { month: 'long' });
      if (!uniqueMonths.includes(month)) {
        uniqueMonths.push(month);
      }
    });
    return uniqueMonths;
  };

  const months = getUniqueMonths(props.expenses);
  const reversedMonths = [...months].reverse(); // Reverse the sequence of months

  const categories = ['Expense', 'Income'];
  const datasets = categories.map((category) => {
    const data = reversedMonths.map((month) => {
      const totalAmount = props.expenses
        .filter((expense) => expense.categoryType === category)
        .reduce((total, expense) => {
          const dateObject = new Date(expense.date);
          const expenseMonth = dateObject.toLocaleString('en-US', { month: 'long' });
          if (expenseMonth === month) {
            return total + parseFloat(expense.amount);
          }
          return total;
        }, 0);
      return totalAmount;
    });

    return {
      label: category,
      data: data,
      backgroundColor: category === 'Expense' ? '#FF6384' : '#36A2EB',
      hoverBackgroundColor: category === 'Expense' ? '#FF6384' : '#36A2EB',
    };
  });

  const chartData = {
    labels: reversedMonths,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 0.6,
    categoryPercentage: 0.8,
  };

  return <Bar data={chartData} options={options} />;
};

export default ExpensesChart;
