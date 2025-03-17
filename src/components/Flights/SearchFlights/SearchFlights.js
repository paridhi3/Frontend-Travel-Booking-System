import React, { useState } from "react";
import "./SearchFlights.css";
import { getDate } from "./getDate";

const months = [
  " Jan",
  " Feb",
  " Mar",
  " Apr",
  " May",
  " Jun",
  " Jul",
  " Aug",
  " Sep",
  " Oct",
  " Nov",
  " Dec",
];

const today = getDate(new Date());

const SearchFlights = ({ onSearch }) => {
  const [state, setState] = useState({
    source: "Delhi",
    destination: "Mumbai",
    flightClass: "Business",
  });

  // const [getDeparture, setDeparture] = useState({
  //   min: today.date,
  //   value: today.date,
  //   date: Number(today.dd),
  //   month: months[Number(today.mm) - 1],
  //   year: `${today.yyyy}`.slice(2, 4),
  //   day: today.day,
  // });

  const [getDeparture, setDeparture] = useState({
    min: today.date, // Keep min as today
    value: "", // Set default date as none
    date: null, // No default date
    month: null,
    year: null,
    day: null,
  });

  // const departureChange = (e) => {
  //   let date = new Date(e.target.value);
  //   const currentDate = getDate(date);
  //   setDeparture({
  //     ...getDeparture,
  //     value: currentDate.date,
  //     date: Number(currentDate.dd),
  //     month: months[Number(currentDate.mm) - 1],
  //     year: `${currentDate.yyyy}`.slice(2, 4),
  //     day: currentDate.day,
  //   });
  // };

  const departureChange = (e) => {
    let date = new Date(e.target.value);
    const currentDate = getDate(date);
    setDeparture((prev) => ({
      ...prev,
      value: currentDate.date,
      date: Number(currentDate.dd),
      month: months[Number(currentDate.mm) - 1],
      year: `${currentDate.yyyy}`.slice(2, 4),
      day: currentDate.day,
    }));
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearch({
      source: state.source,
      destination: state.destination,
      flightClass: state.flightClass,
      departureDate: getDeparture,
    });
  };

  return (
    <div className="search-content-container">
      <div className="search-content">
        <form onSubmit={handleSearchClick} className="search-content-form">
          <div className="trip-details">
            <div className="trip-details-input">
              <label htmlFor="from">From</label>
              <input
                autoComplete="off"
                id="from"
                type="text"
                placeholder="From"
                onChange={(e) => setState({ ...state, source: e.target.value })}
                value={state.source}
              />
            </div>

            <div className="trip-details-input">
              <label htmlFor="to">To</label>
              <input
                autoComplete="off"
                id="to"
                type="text"
                placeholder="To"
                onChange={(e) =>
                  setState({ ...state, destination: e.target.value })
                }
                value={state.destination}
              />
            </div>

            <div className="trip-details-input">
              <label htmlFor="departure">Departure Date</label>
              <nav className="departure-display">
                <p>
                  <span>{getDeparture.date}</span>
                  {getDeparture.month}'{getDeparture.year}
                  <br />
                  {getDeparture.day}
                </p>
                <input
                  autoComplete="off"
                  id="departure"
                  type="date"
                  min={getDeparture.min}
                  value={getDeparture.value}
                  onChange={departureChange}
                />
              </nav>
            </div>

            {/*--------------------------------------*/}
            <div className="trip-details-input">
              <label htmlFor="class">Class</label>
              <input
                autoComplete="off"
                id="flight-class"
                type="text"
                placeholder="Flight Class"
                onChange={(e) =>
                  setState({ ...state, flightClass: e.target.value })
                }
                value={state.flightClass}
              />
            </div>
            {/*--------------------------------------*/}
          </div>

          <button type="submit" id="search-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchFlights;
