import React, { useEffect } from "react";
import "./styles.css";
import Navbar from "../components/dashboard/Navbar";
import NavbarLogin from "../components/dashboard/NavbarLogin";
import Jumbotron from "../components/dashboard/Jumbotron";
import Body from "../components/dashboard/Body";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import ErrorModal from "../components/ErrorModal";

function Dashboard() {
  const { err, setError } = useAuth();
  useEffect(() => {
    setTimeout(() => setError(undefined), 5000);
  }, [err]);
  return (
    <>
      <div>
        <Navbar />
        {err !== undefined && <ErrorModal error={err.message} />}
        <NavbarLogin />
        <Jumbotron />
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
