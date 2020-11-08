import React from "react";
import "./styles.css";
import Navbar from "../components/dashboard/Navbar";
import NavbarLogin from "../components/dashboard/NavbarLogin";
import Jumbotron from "../components/dashboard/Jumbotron";

function Dashboard() {
  return (
    <>
      <Navbar />
      <NavbarLogin />
      <Jumbotron />
    </>
  );
}

export default Dashboard;
