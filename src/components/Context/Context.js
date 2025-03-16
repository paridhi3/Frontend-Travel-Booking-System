import React, { createContext, useState } from "react";
import PassengerService from "../../service/PassengerService"; // Import service


const MyContext = createContext();

const ContextProvider= (props)=>{
    const [intoHome, setIntoHome] = useState(false);
    const onHomePage= (value)=>{
        setIntoHome(value);
    }

    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInSetter= (value)=>{
        setLoggedIn(value);
    }

    const [users, setUsers] = useState({});

    // const addUsers= (user)=>{
    //     setUsers({
    //         ...users,
    //         [user.email]: {
    //             name: user.name,
    //             password: user.password,
    //             age: user.age,
    //             gender: user.gender,
    //             contact: user.contact,
    //         },
    //     })
    // }

    const addUsers = (user) => {
        setUsers((prevUsers) => ({
            ...prevUsers, // ✅ Preserve previous users
            [user.email]: { ...user }, // ✅ Store user data
        }));
    };

    const [currUser, setCurrUser] = useState({});

    const addCurrUser = async (userData) => {
        try {
            console.log("(Context.js) Adding current user:", userData);

            if (!userData || !userData.email) {
                throw new Error("Invalid user data");
            }

            const response = await PassengerService.getPassengerByEmail(userData.email); // Fetch user details
            console.log("(Context.js) Fetched user details (response.data):", response.data);

            setCurrUser(response.data);
            
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const [portalView, setPortalView] = useState(false);
    const displayPortal=(value)=>{
        setPortalView(value);
    }

    const [price, putPrice] = useState(0);
    const setPrice=(value)=>{
        putPrice(value);
    }

    const value = {
        intoHome, onHomePage,
        loggedIn, loggedInSetter,
        users, addUsers,
        currUser, addCurrUser,
        portalView, displayPortal,
        price, setPrice,
    };

    return(
        <MyContext.Provider value={{...value}}>
            {props.children}
        </MyContext.Provider>
    )
}
export {ContextProvider, MyContext};