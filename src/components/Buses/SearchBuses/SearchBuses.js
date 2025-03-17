import React, { useState } from "react";
import "./SearchBuses.css";
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

const SearchBuses = ({ onSearch }) => {

  const [state, setState] = useState({
    source: "Delhi",
    destination: "Mumbai",
    busClass: "Sleeper",
  });

  const [getDeparture, setDeparture] = useState({
    min: today.date,
    value: today.date,
    date: Number(today.dd),
    month: months[Number(today.mm) - 1],
    year: `${today.yyyy}`.slice(2, 4),
    day: today.day,
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
      busClass: state.busClass,
      departureDate: getDeparture,
    });
  };
  

  return (
    <div className="search-content-container">
      <div className="search-content">
        <form
          onSubmit={handleSearchClick}
          className="search-content-form"
        >
          <div className="trip-details">
            <div className="trip-details-input">
              <label htmlFor="from">From</label>
              <input
                autoComplete="off"
                id="from"
                type="text"
                placeholder="From"
                onChange={(e) =>
                  setState({ ...state, source: e.target.value })
                }
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
              <label htmlFor="departure">Departure</label>
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
                id="bus-class"
                type="text"
                placeholder="Bus Class"
                onChange={(e) =>
                  setState({ ...state, busClass: e.target.value })
                }
                value={state.busClass}
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

export default SearchBuses;