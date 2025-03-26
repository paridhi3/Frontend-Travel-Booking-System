import "./Dashboard.css";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../components/Context/Context";
import Modal from "../../components/Modal/Modal";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { capitalizeFullName } from "../../Utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const myContext = useContext(MyContext);
  //   const currLoggedIn =
  //     (myContext.currUser && Object.keys(myContext.currUser).length > 0
  //       ? myContext.currUser
  //       : null) ||
  //     (myContext.currAdmin && Object.keys(myContext.currAdmin).length > 0
  //       ? myContext.currAdmin
  //       : null);

  // Ensure currLoggedIn doesn't become null, avoiding runtime errors
  const currLoggedIn =
    myContext.currUser && Object.keys(myContext.currUser).length > 0
      ? myContext.currUser
      : myContext.currAdmin && Object.keys(myContext.currAdmin).length > 0
      ? myContext.currAdmin
      : null;

  useEffect(() => {
    myContext.onHomePage(false);
    myContext.displayPortal(false); // Reset portal view when the dashboard loads
  }, [myContext, navigate]);

  const signOutClicked = () => {
    if (myContext.currUser && Object.keys(myContext.currUser).length > 0) {
      myContext.logoutUser();
      // myContext.displayPortal(true);
      // localStorage.removeItem("loggedInUser");
      // localStorage.removeItem("isUserLoggedIn");
    } else if (
      myContext.currAdmin &&
      Object.keys(myContext.currAdmin).length > 0
    ) {
      myContext.logoutAdmin();
      // myContext.displayPortal(true);
      // localStorage.removeItem("loggedInAdmin"); // ✅ Clear stored admin data
      // localStorage.removeItem("isAdminLoggedIn");
    }
    myContext.displayPortal(true);
      // myContext.displayPortal(false);
      navigate("/");
  };

  const viewBookingHistoryClicked = () => {
    navigate("/bookingHistory", {
      state: { passengerId: myContext.currUser.passengerId },
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="left-side">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMVEXk5ueutLe+wsTn6eqrsbSorrLZ3N3h4+Syt7rQ09W4vcDW2dvq7OzIzM7d4OG7wMNVLcDiAAADHElEQVR4nO2ayXLDIAxAwcKYnf//23pJ2ziJbYkgkgNvppde/EYgEFKE6HQ6nU6n0+l0Op0OAgD47PcDiJS0TiKEz5gE4aNT44bMUbePCKQolZJ/KKWMnZpqQMr3BjdGGdtFAyCOzwpbPGxo5KDla4VVI4sWwQB7rLBYmMRvEeJ45rCguS1CPI3DFgxmi4u1+LVIrA7pci1WDKfEhInDEorMtyCQkRJSWS4L8FiH2YLJQQS0wiwx8IQCrk+Ie4uJRUIYgoNUkSMU4CmBYEpTfGrcQsGRIBNJYZZwDLc6IT9vFvUdwkCW8NXXI5ByY5VgyA9qIDgukESWkKa2BOXe+KO6BKqa2VM9PYokal8fgKgt+SUKIjF+g0T9PVGSHbUlvuKcQBfa/zCcmF9xdwRiTcNyi9LTg6PUTUQHaRgqK3DEQHDUmGCJ1TbPw4P27uB5gtHusJGpRwEECa63KCkU1W/Qfwt0gvC8RDewt5hyjK0zdJryds5Q77CRuYeIeQ2ObA2rX65jwdc0u7O46hrVv8FfEOzBoGENg2k0eQGRD4KhVGw071g0vHsx+VEqNx1AgfBuvyhKqYF9xvBEmOwgl2ng+mcG+5n56PzVSXtrrU/TZ0a080dhR+NRMYQgtI0xO7NshRlpXB6i9VMILbIDYFoHw+unH3JDzf920SbgFJnDraOTT59/cJFm8BPT0gDowZyclfcio8y+fjxgmY2TSv712KgZjvloyidT4UMNZ+uNi0G/OqQxjKbSERa0oz299hqyQnUBaXhDYUGZd68UsPS98KwxvLM1QLyzEncWUhfna0nb8Eij9DFU0sQ9tnBF9Q68uyMfLIqKT1cxDpsG/ScmprZDgUX1OKwWpBWhDmLRELoWVfNiB352XfF8eATdRYKpam7uQb/YiV1TGrhfHjEuxiqBG0BwKiwWHhEItsz4BdF4B8ZduTFedlGYd8TKZX8RyFMmOpfTmIKhH13iosLh35YLF+tBHe8Ucn5gUX9CVMbFUVEyjC6QON0ULRJ0kchn51WbfTkXvecSQxtO0wMacboxO51Op/Pd/ADgoCQ35HRZWgAAAABJRU5ErkJggg=="
            alt="Profile"
          />
          <p>
            <span id="name">
              {/* {currLoggedIn.fullName
                ? capitalizeFullName(currLoggedIn.fullName.split(" ")[0])
                : "Guest"} */}
              {currLoggedIn
                ? capitalizeFullName(currLoggedIn?.fullName?.split(" ")[0])
                : null}
            </span>
          </p>
          <button onClick={signOutClicked}>Sign Out</button>
        </div>
        <div className="right-side">
          <p>
            Name:{" "}
            <span id="name">
              {/* {currLoggedIn.fullName
                ? capitalizeFullName(currLoggedIn.fullName.split(" ")[0])
                : "Guest"} */}
              {currLoggedIn
                ? capitalizeFullName(currLoggedIn?.fullName?.split(" ")[0])
                : null}
            </span>
          </p>
          <p>
            Email ID: <span id="email">{currLoggedIn?.email}</span>
          </p>

          {/* Display only if it's admin */}
          {myContext.currAdmin?.email && (
            <>
              <button className="go-to-admin-page">
                <Link to="/adminPage">Admin Page</Link>
              </button>
            </>
          )}

          {/* Display extra user details only if it's a user */}
          {myContext.currUser?.email && (
            <>
              <p>
                Contact:{" "}
                <span id="contact">{myContext.currUser.contact || "N/A"}</span>
              </p>
              <p>
                Gender:{" "}
                <span id="gender">{myContext.currUser.gender || "N/A"}</span>
              </p>
              <p>
                Age: <span id="age">{myContext.currUser.age || "N/A"}</span>
              </p>

              <button
                className="booking-history"
                onClick={viewBookingHistoryClicked}
              >
                View Booking History
              </button>
            </>
          )}
        </div>
      </div>
      {myContext.portalView &&
        createPortal(
          <Modal type="logOut" />,
          document.getElementById("portal")
        )}
    </div>
  );
};

export default Dashboard;
