import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpensesSplineChart = (props) => {
  // Helper function to get unique months from expenses
  const getUniqueMonths = (expenses) => {
    const uniqueMonths = [];
    expenses.forEach((expense) => {
      const month = expense.date.toLocaleString('en-US', { month: 'long' });
      if (!uniqueMonths.includes(month)) {
        uniqueMonths.push(month);
      }
    });
    return uniqueMonths;
  };  

  // Prepare labels for x-axis (months)
  const months = getUniqueMonths(props.expenses);

  // Prepare datasets for each category
  const categories = ['Expense', 'Income'];
  const datasets = categories.map((category) => {
    const data = months.map((month) => {
      const totalAmount = props.expenses
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => {
          const expenseMonth = expense.date.toLocaleString('en-US', { month: 'long' });
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
      borderColor: category === 'Expense' ? '#FF6384' : '#36A2EB',
      fill: false,
    };
  });

  const chartData = {
    labels: months,
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
    elements: {
      line: {
        tension: 0.4, // Adjust the tension of the spline curve (0 - 1)
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ExpensesSplineChart;



// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const ExpensesChart = (props) => {
//   const getUniqueMonths = (expenses) => {
//     const uniqueMonths = [];
//     expenses.forEach((expense) => {
//       const month = expense.date.toLocaleString('en-US', { month: 'long' });
//       if (!uniqueMonths.includes(month)) {
//         uniqueMonths.push(month);
//       }
//     });
//     return uniqueMonths;
//   };  

//   const months = getUniqueMonths(props.expenses);

//   const categories = ['Expense', 'Income'];
//   const datasets = categories.map((category) => {
//     const data = months.map((month) => {
//       const totalAmount = props.expenses
//         .filter((expense) => expense.category === category)
//         .reduce((total, expense) => {
//           const expenseMonth = expense.date.toLocaleString('en-US', { month: 'long' });
//           if (expenseMonth === month) {
//             return total + parseFloat(expense.amount);
//           }
//           return total;
//         }, 0);
//       return totalAmount;
//     });

//     return {
//       label: category,
//       data: data,
//       backgroundColor: category === 'Expense' ? '#FF6384' : '#36A2EB',
//       hoverBackgroundColor: category === 'Expense' ? '#FF6384' : '#36A2EB',
//     };
//   });

//   const chartData = {
//     labels: months,
//     datasets: datasets,
//   };

//   const options = {
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         type: 'linear',
//         beginAtZero: true,
//         grid: {
//           display: true,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     barPercentage: 0.6, 
//     categoryPercentage: 0.8, 
//   };

//   return <Bar data={chartData} options={options} />;
// };

// export default ExpensesChart;

