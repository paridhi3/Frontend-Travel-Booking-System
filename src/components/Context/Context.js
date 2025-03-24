import React, { createContext, useState, useEffect } from "react";
import PassengerService from "../../service/PassengerService"; // Import Passenger Service
import AdminService from "../../service/AdminService"; // Import Admin Service

const MyContext = createContext();

const ContextProvider = (props) => {
  const [intoHome, setIntoHome] = useState(false);
  const onHomePage = (value) => setIntoHome(value);

  /***  OTHER STATE VARIABLES ***/
  const [portalView, setPortalView] = useState(false);
  const displayPortal = (value) => setPortalView(value);

  /***  USER STATE ***/
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [currUser, setCurrUser] = useState({});

  /***  ADMIN STATE ***/
  const [loggedInAdmin, setLoggedInAdmin] = useState(false);
  const [currAdmin, setCurrAdmin] = useState({});

  /***  LOAD STORED USER & ADMIN ***/
  useEffect(() => {

    // Load User from Local Storage
    const storedUser = localStorage.getItem("loggedInUser");
    const isUserLoggedIn = JSON.parse(localStorage.getItem("isUserLoggedIn"));

    if (storedUser && isUserLoggedIn) {
      setCurrUser(JSON.parse(storedUser));
      setLoggedInUser(true);
    } else {
      setCurrUser({});
      setLoggedInUser(false);
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("isUserLoggedIn");
    }

    // Load Admin from Local Storage
    const storedAdmin = localStorage.getItem("loggedInAdmin");
    const isAdminLoggedIn = JSON.parse(localStorage.getItem("isAdminLoggedIn"));

    if (storedAdmin && isAdminLoggedIn) {
      setCurrAdmin(JSON.parse(storedAdmin));
      setLoggedInAdmin(true);
    } else {
      setCurrAdmin({});
      setLoggedInAdmin(false);
      localStorage.removeItem("loggedInAdmin");
      localStorage.removeItem("isAdminLoggedIn");
    }
  }, []);

  /*** FUNCTION TO LOGIN USER ***/
  const addCurrUser = async (userData) => {
    try {
      if (!userData || !userData.email) {
        throw new Error("Invalid user data");
      }
      const response = await PassengerService.getPassengerByEmail(
        userData.email
      );
      setCurrUser(response.data);
      setLoggedInUser(true);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  /*** FUNCTION TO LOGIN ADMIN ***/
  const addCurrAdmin = async (adminData) => {
    try {
      if (!adminData || !adminData.email) {
        throw new Error("Invalid admin data");
      }
      const response = await AdminService.getAdminByEmail(adminData.email);
      console.log("Admin fetched from backend: ", response.data);
      setCurrAdmin(response.data);
      setLoggedInAdmin(true);
      localStorage.setItem("loggedInAdmin", JSON.stringify(response.data));
      localStorage.setItem("isAdminLoggedIn", JSON.stringify(true));
      console.log("Admin stored in state:", response.data);
    } catch (error) {
      console.error("Error logging in admin:", error);
    }
  };

  /*** FUNCTION TO LOGOUT USER ***/
  const logoutUser = () => {
    setCurrUser({});
    setLoggedInUser(false);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isUserLoggedIn");
  };

  /*** FUNCTION TO LOGOUT ADMIN ***/
  const logoutAdmin = () => {
    setCurrAdmin(null);
    setLoggedInAdmin(false);
    localStorage.removeItem("loggedInAdmin");
    localStorage.removeItem("isAdminLoggedIn");
  };

  /***  CONTEXT VALUE ***/
  const value = {
    intoHome, onHomePage,
    loggedInUser, setLoggedInUser,
    currUser, addCurrUser, logoutUser,
    loggedInAdmin, setLoggedInAdmin,
    currAdmin, addCurrAdmin, logoutAdmin,
    portalView, displayPortal,
  };

  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};

export { ContextProvider, MyContext };
