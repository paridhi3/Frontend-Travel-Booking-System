import React, { createContext, useState, useEffect } from "react";
import PassengerService from "../../service/PassengerService"; // Import service

const MyContext = createContext();

const ContextProvider = (props) => {
    const [intoHome, setIntoHome] = useState(false);

    const onHomePage = (value) => {
        setIntoHome(value);
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInSetter = (value) => {
        setLoggedIn(value);
        localStorage.setItem("isLoggedIn", JSON.stringify(value)); // ✅ Persist login state
    };

    const [currUser, setCurrUser] = useState({});

    // ✅ Load user from localStorage when the app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

        if (storedUser && isLoggedIn) {
            setCurrUser(JSON.parse(storedUser));
            setLoggedIn(true);
        } else {
            // ✅ Ensure currUser is reset if not logged in
            setCurrUser({});
            setLoggedIn(false);
            localStorage.removeItem("loggedInUser"); // ✅ Clear stale user data
            localStorage.removeItem("isLoggedIn");   // ✅ Clear login state
        }
    }, []);

    const addCurrUser = async (userData) => {
        try {
            console.log("(Context.js) Adding current user:", userData);

            if (!userData || !userData.email) {
                throw new Error("Invalid user data");
            }

            const response = await PassengerService.getPassengerByEmail(userData.email);
            console.log("(Context.js) Fetched user details (response.data):", response.data);

            setCurrUser(response.data);
            setLoggedIn(true);

            // ✅ Store user in localStorage for persistence
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            localStorage.setItem("isLoggedIn", JSON.stringify(true));

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const logout = () => {
        setCurrUser({});
        setLoggedIn(false);
        localStorage.removeItem("loggedInUser"); // ✅ Clear stored user on logout
        localStorage.removeItem("isLoggedIn");   // ✅ Clear login state
    };

    const [portalView, setPortalView] = useState(false);
    const displayPortal = (value) => {
        setPortalView(value);
    };

    const [price, putPrice] = useState(0);
    const setPrice = (value) => {
        putPrice(value);
    };

    const value = {
        intoHome, onHomePage,
        loggedIn, loggedInSetter,
        currUser, addCurrUser, logout, // ✅ Added logout function
        portalView, displayPortal,
        price, setPrice,
    };

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    );
};

export { ContextProvider, MyContext };
