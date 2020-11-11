import React from "react";
import "./styles.css";
import Navbar from "../components/dashboard/Navbar";
import NavbarLogin from "../components/dashboard/NavbarLogin";
import Jumbotron from "../components/dashboard/Jumbotron";
import Body from "../components/dashboard/Body";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />
      <NavbarLogin />
      <Jumbotron />
      <Body />
      <Footer />
    </>
  );
}

export default Dashboard;
