import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const UsersChart = ({ users }) => {
  let data = {
    labels: [],
    datasets: [
      {
        label: "Сховати",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  users.forEach((user, i) => {
    data.labels.push(user.firstname);
    data.datasets[0].data.push(user.weight / user.height);
    data.datasets[0].backgroundColor.push("rgba(255, 99, 132, 0.2)");
    data.datasets[0].borderColor.push("rgba(255, 99, 132, 0.2)");
    console.log("user", user);
  });

  return (
    <>
      <div className="header">
        <h3 className="mt-5 mb-3 text-center">Статистика</h3>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default UsersChart;
