import "./Header.css";
import logo from "../../images/logo-white.png";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaBus, FaTrain } from "react-icons/fa";
import { MyContext } from "../Context/Context";
import { capitalizeFullName } from "../../Utils";
// import { useEffect } from 'react';

const Header = () => {
  const myContext = useContext(MyContext);

  const currUser =
    myContext.currUser && Object.keys(myContext.currUser).length > 0
      ? myContext.currUser
      : null;

  const currAdmin =
    myContext.currAdmin && Object.keys(myContext.currAdmin).length > 0
      ? myContext.currAdmin
      : null;

  const currLoggedIn =
    (myContext.currUser && Object.keys(myContext.currUser).length > 0
      ? myContext.currUser
      : null) ||
    (myContext.currAdmin && Object.keys(myContext.currAdmin).length > 0
      ? myContext.currAdmin
      : null);

  console.log("(Header.js) currLoggedIn:", currLoggedIn);
  console.log("(Header.js) myContext.currUser:", myContext.currUser);
  console.log("(Header.js) myContext.currAdmin:", myContext.currAdmin);

  return (
    <div className="header">
      <nav className="header-contents">
        <Link to={"/"}>
          <img className="logo" src={logo} alt="logo" />
        </Link>
        {/* {myContext.loggedInUser || myContext.loggedInAdmin ? ( */}
        {currLoggedIn && Object.keys(currLoggedIn).length > 0 ? (
          <Link to={"/dashboard"} className="user-profile">
            <img
              className="user-image"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMVEXk5ueutLe+wsTn6eqrsbSorrLZ3N3h4+Syt7rQ09W4vcDW2dvq7OzIzM7d4OG7wMNVLcDiAAADHElEQVR4nO2ayXLDIAxAwcKYnf//23pJ2ziJbYkgkgNvppde/EYgEFKE6HQ6nU6n0+l0Op0OAgD47PcDiJS0TiKEz5gE4aNT44bMUbePCKQolZJ/KKWMnZpqQMr3BjdGGdtFAyCOzwpbPGxo5KDla4VVI4sWwQB7rLBYmMRvEeJ45rCguS1CPI3DFgxmi4u1+LVIrA7pci1WDKfEhInDEorMtyCQkRJSWS4L8FiH2YLJQQS0wiwx8IQCrk+Ie4uJRUIYgoNUkSMU4CmBYEpTfGrcQsGRIBNJYZZwDLc6IT9vFvUdwkCW8NXXI5ByY5VgyA9qIDgukESWkKa2BOXe+KO6BKqa2VM9PYokal8fgKgt+SUKIjF+g0T9PVGSHbUlvuKcQBfa/zCcmF9xdwRiTcNyi9LTg6PUTUQHaRgqK3DEQHDUmGCJ1TbPw4P27uB5gtHusJGpRwEECa63KCkU1W/Qfwt0gvC8RDewt5hyjK0zdJryds5Q77CRuYeIeQ2ObA2rX65jwdc0u7O46hrVv8FfEOzBoGENg2k0eQGRD4KhVGw071g0vHsx+VEqNx1AgfBuvyhKqYF9xvBEmOwgl2ng+mcG+5n56PzVSXtrrU/TZ0a080dhR+NRMYQgtI0xO7NshRlpXB6i9VMILbIDYFoHw+unH3JDzf920SbgFJnDraOTT59/cJFm8BPT0gDowZyclfcio8y+fjxgmY2TSv712KgZjvloyidT4UMNZ+uNi0G/OqQxjKbSERa0oz299hqyQnUBaXhDYUGZd68UsPS98KwxvLM1QLyzEncWUhfna0nb8Eij9DFU0sQ9tnBF9Q68uyMfLIqKT1cxDpsG/ScmprZDgUX1OKwWpBWhDmLRELoWVfNiB352XfF8eATdRYKpam7uQb/YiV1TGrhfHjEuxiqBG0BwKiwWHhEItsz4BdF4B8ZduTFedlGYd8TKZX8RyFMmOpfTmIKhH13iosLh35YLF+tBHe8Ucn5gUX9CVMbFUVEyjC6QON0ULRJ0kchn51WbfTkXvecSQxtO0wMacboxO51Op/Pd/ADgoCQ35HRZWgAAAABJRU5ErkJggg=="
              alt="profile img"
            />
            <p className="user-name">
              {currLoggedIn.fullName
                ? capitalizeFullName(currLoggedIn.fullName.split(" ")[0])
                : "Guest"}
            </p>
          </Link>
        ) : (
          <Link to={"/login"} className="user-profile">
            <img
              className="user-image"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMVEXk5ueutLe+wsTn6eqrsbSorrLZ3N3h4+Syt7rQ09W4vcDW2dvq7OzIzM7d4OG7wMNVLcDiAAADHElEQVR4nO2ayXLDIAxAwcKYnf//23pJ2ziJbYkgkgNvppde/EYgEFKE6HQ6nU6n0+l0Op0OAgD47PcDiJS0TiKEz5gE4aNT44bMUbePCKQolZJ/KKWMnZpqQMr3BjdGGdtFAyCOzwpbPGxo5KDla4VVI4sWwQB7rLBYmMRvEeJ45rCguS1CPI3DFgxmi4u1+LVIrA7pci1WDKfEhInDEorMtyCQkRJSWS4L8FiH2YLJQQS0wiwx8IQCrk+Ie4uJRUIYgoNUkSMU4CmBYEpTfGrcQsGRIBNJYZZwDLc6IT9vFvUdwkCW8NXXI5ByY5VgyA9qIDgukESWkKa2BOXe+KO6BKqa2VM9PYokal8fgKgt+SUKIjF+g0T9PVGSHbUlvuKcQBfa/zCcmF9xdwRiTcNyi9LTg6PUTUQHaRgqK3DEQHDUmGCJ1TbPw4P27uB5gtHusJGpRwEECa63KCkU1W/Qfwt0gvC8RDewt5hyjK0zdJryds5Q77CRuYeIeQ2ObA2rX65jwdc0u7O46hrVv8FfEOzBoGENg2k0eQGRD4KhVGw071g0vHsx+VEqNx1AgfBuvyhKqYF9xvBEmOwgl2ng+mcG+5n56PzVSXtrrU/TZ0a080dhR+NRMYQgtI0xO7NshRlpXB6i9VMILbIDYFoHw+unH3JDzf920SbgFJnDraOTT59/cJFm8BPT0gDowZyclfcio8y+fjxgmY2TSv712KgZjvloyidT4UMNZ+uNi0G/OqQxjKbSERa0oz299hqyQnUBaXhDYUGZd68UsPS98KwxvLM1QLyzEncWUhfna0nb8Eij9DFU0sQ9tnBF9Q68uyMfLIqKT1cxDpsG/ScmprZDgUX1OKwWpBWhDmLRELoWVfNiB352XfF8eATdRYKpam7uQb/YiV1TGrhfHjEuxiqBG0BwKiwWHhEItsz4BdF4B8ZduTFedlGYd8TKZX8RyFMmOpfTmIKhH13iosLh35YLF+tBHe8Ucn5gUX9CVMbFUVEyjC6QON0ULRJ0kchn51WbfTkXvecSQxtO0wMacboxO51Op/Pd/ADgoCQ35HRZWgAAAABJRU5ErkJggg=="
              alt="profile img"
            />
            <p className="user-name">Login</p>
          </Link>
        )}
      </nav>

      {(!currAdmin || currUser) && (
        <div className="pages-link">
          <NavLink
            className={({ isActive }) =>
              `page-link ${
                isActive ||
                (myContext.intoHome && window.location.pathname === "/")
                  ? "active"
                  : ""
              }`
            }
            to="/flight"
          >
            <GiCommercialAirplane /> Flights
          </NavLink>

          <NavLink className={"page-link"} to={"/train"}>
            <FaTrain /> Trains
          </NavLink>

          <NavLink className={"page-link"} to={"/bus"}>
            <FaBus /> Buses
          </NavLink>
        </div>
      )}

      {currAdmin && (
        <div className="pages-link">
          <NavLink
            className={({ isActive }) =>
              `page-link ${
                isActive ||
                (window.location.pathname === "/adminPage")
                  ? "active"
                  : ""
              }`
            }
            to="/manageFlight"
          >
            <GiCommercialAirplane /> Manage Flights
          </NavLink>

          <NavLink className={"page-link"} to={"/manageTrain"}>
            <FaTrain /> Manage Trains
          </NavLink>

          <NavLink className={"page-link"} to={"/manageBus"}>
            <FaBus /> Manage Buses
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default Header;
//--------------------------------------------------------------------------
// import "./Header.css";
// import logo from "../../images/logo-white.png";
// import React, { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { GiCommercialAirplane } from "react-icons/gi";
// import { FaBus, FaTrain } from "react-icons/fa";
// import { MyContext } from "../Context/Context";
// import { capitalizeFullName } from "../../Utils";

// const Header = () => {
//   const myContext = useContext(MyContext);
//   const currLoggedIn = myContext.currUser || myContext.currAdmin;
//   console.log("(Header.js) Current User:", currLoggedIn);

//   return (
//     <div className="header">
//       <nav className="header-contents">
//         <Link to={"/"}>
//           <img className="logo" src={logo} alt="logo" />
//         </Link>

//         {currLoggedIn ? (
//           <Link to={"/dashboard"} className="user-profile">
//             <img
//               className="user-image"
//               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMV..."
//               alt="profile img"
//             />
//             <p className="user-name">
//               {currLoggedIn.fullName
//                 ? capitalizeFullName(currLoggedIn.fullName.split(" ")[0])
//                 : "Guest"}
//             </p>
//           </Link>
//         ) : (
//           <Link to={"/login"} className="user-profile">
//             <img
//               className="user-image"
//               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMVEXk5ueutLe+wsTn6eqrsbSorrLZ3N3h4+Syt7rQ09W4vcDW2dvq7OzIzM7d4OG7wMNVLcDiAAADHElEQVR4nO2ayXLDIAxAwcKYnf//23pJ2ziJbYkgkgNvppde/EYgEFKE6HQ6nU6n0+l0Op0OAgD47PcDiJS0TiKEz5gE4aNT44bMUbePCKQolZJ/KKWMnZpqQMr3BjdGGdtFAyCOzwpbPGxo5KDla4VVI4sWwQB7rLBYmMRvEeJ45rCguS1CPI3DFgxmi4u1+LVIrA7pci1WDKfEhInDEorMtyCQkRJSWS4L8FiH2YLJQQS0wiwx8IQCrk+Ie4uJRUIYgoNUkSMU4CmBYEpTfGrcQsGRIBNJYZZwDLc6IT9vFvUdwkCW8NXXI5ByY5VgyA9qIDgukESWkKa2BOXe+KO6BKqa2VM9PYokal8fgKgt+SUKIjF+g0T9PVGSHbUlvuKcQBfa/zCcmF9xdwRiTcNyi9LTg6PUTUQHaRgqK3DEQHDUmGCJ1TbPw4P27uB5gtHusJGpRwEECa63KCkU1W/Qfwt0gvC8RDewt5hyjK0zdJryds5Q77CRuYeIeQ2ObA2rX65jwdc0u7O46hrVv8FfEOzBoGENg2k0eQGRD4KhVGw071g0vHsx+VEqNx1AgfBuvyhKqYF9xvBEmOwgl2ng+mcG+5n56PzVSXtrrU/TZ0a080dhR+NRMYQgtI0xO7NshRlpXB6i9VMILbIDYFoHw+unH3JDzf920SbgFJnDraOTT59/cJFm8BPT0gDowZyclfcio8y+fjxgmY2TSv712KgZjvloyidT4UMNZ+uNi0G/OqQxjKbSERa0oz299hqyQnUBaXhDYUGZd68UsPS98KwxvLM1QLyzEncWUhfna0nb8Eij9DFU0sQ9tnBF9Q68uyMfLIqKT1cxDpsG/ScmprZDgUX1OKwWpBWhDmLRELoWVfNiB352XfF8eATdRYKpam7uQb/YiV1TGrhfHjEuxiqBG0BwKiwWHhEItsz4BdF4B8ZduTFedlGYd8TKZX8RyFMmOpfTmIKhH13iosLh35YLF+tBHe8Ucn5gUX9CVMbFUVEyjC6QON0ULRJ0kchn51WbfTkXvecSQxtO0wMacboxO51Op/Pd/ADgoCQ35HRZWgAAAABJRU5ErkJggg=="
//               alt="profile img"
//             />
//             <p className="user-name">Login</p>
//           </Link>
//         )}
//       </nav>

//       <div className="pages-link">
//         <NavLink
//           className={({ isActive }) =>
//             `page-link ${isActive || (myContext.intoHome && window.location.pathname === "/") ? "active" : ""}`
//           }
//           to="/flight"
//         >
//           <GiCommercialAirplane /> Flights
//         </NavLink>

//         <NavLink className="page-link" to="/train">
//           <FaTrain /> Trains
//         </NavLink>

//         <NavLink className="page-link" to="/bus">
//           <FaBus /> Buses
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Header;
