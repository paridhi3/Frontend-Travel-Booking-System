// import React, { createContext, useState, useEffect } from "react";
// import PassengerService from "../../service/PassengerService"; // Import service

// const MyContext = createContext();

// const ContextProvider = (props) => {
//     const [intoHome, setIntoHome] = useState(false);

//     const onHomePage = (value) => {
//         setIntoHome(value);
//     };

//     const [loggedIn, setLoggedIn] = useState(false);
//     const loggedInSetter = (value) => {
//         setLoggedIn(value);
//         localStorage.setItem("isLoggedIn", JSON.stringify(value)); //  Persist login state
//     };

//     const [currUser, setCurrUser] = useState({});

//     //  Load user from localStorage when the app starts
//     useEffect(() => {
//         const storedUser = localStorage.getItem("loggedInUser");
//         const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

//         if (storedUser && isLoggedIn) {
//             setCurrUser(JSON.parse(storedUser));
//             setLoggedIn(true);
//         } else {
//             //  Ensure currUser is reset if not logged in
//             setCurrUser({});
//             setLoggedIn(false);
//             localStorage.removeItem("loggedInUser"); //  Clear stale user data
//             localStorage.removeItem("isLoggedIn");   //  Clear login state
//         }
//     }, []);

//     const addCurrUser = async (userData) => {
//         try {
//             console.log("(Context.js) Adding current user:", userData);

//             if (!userData || !userData.email) {
//                 throw new Error("Invalid user data");
//             }

//             const response = await PassengerService.getPassengerByEmail(userData.email);
//             console.log("(Context.js) Fetched user details (response.data):", response.data);

//             setCurrUser(response.data);
//             setLoggedIn(true);

//             //  Store user in localStorage for persistence
//             localStorage.setItem("loggedInUser", JSON.stringify(response.data));
//             localStorage.setItem("isLoggedIn", JSON.stringify(true));

//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     };

//     const logout = () => {
//         setCurrUser({});
//         setLoggedIn(false);
//         localStorage.removeItem("loggedInUser"); //  Clear stored user on logout
//         localStorage.removeItem("isLoggedIn");   //  Clear login state
//     };

//     const [portalView, setPortalView] = useState(false);
//     const displayPortal = (value) => {
//         setPortalView(value);
//     };

//     const [price, putPrice] = useState(0);
//     const setPrice = (value) => {
//         putPrice(value);
//     };

//     const value = {
//         intoHome, onHomePage,
//         loggedIn, loggedInSetter,
//         currUser, addCurrUser, logout, //  Added logout function
//         portalView, displayPortal,
//         price, setPrice,
//     };

//     return (
//         <MyContext.Provider value={value}>
//             {props.children}
//         </MyContext.Provider>
//     );
// };

// export { ContextProvider, MyContext };
import React, { createContext, useState, useEffect } from "react";
import PassengerService from "../../service/PassengerService"; // Import Passenger Service
import AdminService from "../../service/AdminService"; // Import Admin Service

const MyContext = createContext();

const ContextProvider = (props) => {
    const [intoHome, setIntoHome] = useState(false);
    const onHomePage = (value) => setIntoHome(value);

    /***  USER STATE ***/
    const [loggedInUser, setLoggedIn] = useState(false);
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
            setLoggedIn(true);
        } else {
            setCurrUser({});
            setLoggedIn(false);
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
            const response = await PassengerService.getPassengerByEmail(userData.email);
            setCurrUser(response.data);
            setLoggedIn(true);
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
            const response = await AdminService.loginAdmin(adminData.email, adminData.password);
            setCurrAdmin(response.data);
            setLoggedInAdmin(true);
            localStorage.setItem("loggedInAdmin", JSON.stringify(response.data));
            localStorage.setItem("isAdminLoggedIn", JSON.stringify(true));
        } catch (error) {
            console.error("Error logging in admin:", error);
        }
    };

    /*** FUNCTION TO LOGOUT USER ***/
    const logoutUser = () => {
        setCurrUser({});
        setLoggedIn(false);
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("isUserLoggedIn");
    };

    /*** FUNCTION TO LOGOUT ADMIN ***/
    const logoutAdmin = () => {
        setCurrAdmin({});
        setLoggedInAdmin(false);
        localStorage.removeItem("loggedInAdmin");
        localStorage.removeItem("isAdminLoggedIn");
    };

    /***  OTHER STATE VARIABLES ***/
    const [portalView, setPortalView] = useState(false);
    const displayPortal = (value) => setPortalView(value);
    
    const [price, putPrice] = useState(0);
    const setPrice = (value) => putPrice(value);

    /***  CONTEXT VALUE ***/
    const value = {
        intoHome, onHomePage,
        loggedInUser, setLoggedIn, currUser, addCurrUser, logoutUser, 
        loggedInAdmin, setLoggedInAdmin, currAdmin, addCurrAdmin, logoutAdmin,
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
