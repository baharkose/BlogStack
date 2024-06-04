import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

const Dashboard = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>dsadasdasdas</div>;
};

export const blogLoader = async () => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}`);
  const data = await res.json();
  return data;
};

export default Dashboard;
