import React, { useState } from "react";
import { getDate } from "../../Utils";

// const months = [
//   " Jan", " Feb", " Mar", " Apr", " May", " Jun", " Jul", " Aug", " Sep", " Oct", " Nov", " Dec"
// ];

// const today = getDate(new Date());

const AdminPage = () => {
  //   const [state, setState] = useState({
  //     source: "Delhi",
  //     destination: "Mumbai",
  //     travelClass: "Business",
  //   });

  //   const [getDeparture, setDeparture] = useState({
  //     min: today.date,
  //     value: "",
  //     date: null,
  //     month: null,
  //     year: null,
  //     day: null,
  //   });

  //   const departureChange = (e) => {
  //     let date = new Date(e.target.value);
  //     const currentDate = getDate(date);
  //     setDeparture((prev) => ({
  //       ...prev,
  //       value: currentDate.date,
  //       date: Number(currentDate.dd),
  //       month: months[Number(currentDate.mm) - 1],
  //       year: `${currentDate.yyyy}`.slice(2, 4),
  //       day: currentDate.day,
  //     }));
  //   };

  //   const handleSearchClick = (e) => {
  //     e.preventDefault();
  //     onSearch({
  //       source: state.source,
  //       destination: state.destination,
  //       travelClass: state.travelClass,
  //       departureDate: getDeparture,
  //       transportType,
  //     });
  //   };

  return (
    <div className="search-content-container">
      <div className="search-content">
        <form className="search-content-form">
          <div className="trip-details">
            <div className="trip-details-input">
              <button>Add Flights</button>
            </div>

            <div className="trip-details-input">
              <button>Update Flights</button>
            </div>

            <div className="trip-details-input">
              <button>View Flights</button>
            </div>

            <div className="trip-details-input">
              <button>Delete Flights</button>
            </div>

            {/* <button type="submit" id="search-btn">
              Search
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
