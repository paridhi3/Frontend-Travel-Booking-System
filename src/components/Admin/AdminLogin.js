import "./AdminLogin.css";
import React, { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { MyContext } from "../../components/Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../components/Modal/Modal";
import AdminService from "../../service/AdminService";
import { useNavigate } from "react-router-dom";

import showPwIcon from "../../images/show-pw.png";
import hidePwIcon from "../../images/hide-pw.png";

const AdminLogIn = () => {
  const navigate = useNavigate();
  const myContext = useContext(MyContext);

  useEffect(() => {
    myContext.onHomePage(false);
  }, [myContext]);

  const [validAdmin, setValidAdmin] = useState(true);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidAdmin(true);
    setWrongPassword(false);
  };

  // Handle form submission
  const formSubmit = async (e) => {
    e.preventDefault();

    setValidAdmin(true);

    try {
      console.log(
        "Admin credentials entered by Admin: ",
        state.email,
        state.password
      );

      // Call API for admin login
      const response = await AdminService.loginAdmin(
        state.email,
        state.password
      );

      if (response.data) {
        console.log("(AdminLogin.js) Admin logged in:", response.data);

        myContext.addCurrAdmin(response.data); // ✅ Store admin details

        myContext.displayPortal(true);

        // Persist login state
        localStorage.setItem("loggedInAdmin", JSON.stringify(response.data));
        localStorage.setItem("isAdminLoggedIn", JSON.stringify(true));

        console.log("Stored admin in localStorage:", localStorage.getItem("loggedInAdmin"));

        navigate("/adminPage");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          setWrongPassword(true);
        } else {
          setValidAdmin(false);
        }
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  useEffect(() => {
    console.log("Admin stored in state after update:", myContext.currAdmin);
  }, [myContext.currAdmin]);

  useEffect(() => {
    if (myContext.currAdmin && myContext.currAdmin.email) {
      setTimeout(() => {
        console.log("(AdminLogin.js) Updating portalView to true");
        myContext.displayPortal(true);
      }, 0);
    }
  }, [myContext, myContext.currAdmin]);
  

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={formSubmit}>
        <h1>
          <AiFillLock />
        </h1>
        {!validAdmin && (
          <h3 style={{ color: "red", paddingTop: "50px" }}>
            Couldn't find your admin account.
          </h3>
        )}
        {wrongPassword && <h3 style={{ color: "red" }}>Wrong Password!</h3>}
        <h2>Admin Login</h2>

        <input
          id="email"
          type="email"
          name="email"
          onChange={inputHandler}
          value={state.email}
          placeholder="Email*"
          required
        />

        <div className="password-container">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={inputHandler}
            value={state.password}
            placeholder="Password*"
            required
            className="password-input"
          />
          <img
            src={showPassword ? showPwIcon : hidePwIcon}
            alt="Toggle Password"
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button id="submit" type="submit">
          Log In
        </button>
      </form>

      {myContext.portalView &&
        myContext.currAdmin.email &&
        document.getElementById("portal") &&
        createPortal(<Modal type="logIn" />, document.getElementById("portal"))}
    </div>
  );
};

export default AdminLogIn;
