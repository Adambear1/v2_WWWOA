import React from "react";
import "./styles.css";
import Navbar from "../components/dashboard/Navbar";
import NavbarLogin from "../components/dashboard/NavbarLogin";
import Jumbotron from "../components/dashboard/Jumbotron";
import Body from "../components/dashboard/Body";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { setErr, error } = useAuth();
  console.log(error && error);
  console.log(setErr && setErr);
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
