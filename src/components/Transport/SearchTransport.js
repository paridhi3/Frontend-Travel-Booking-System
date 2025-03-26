import React, { useState } from "react";
import "../../styles/transport/SearchTransport.css";
import { getDate } from "../../Utils";

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

const SearchTransport = ({ transportType, onSearch }) => {

  const initialState = () => {
    if (transportType === "flight") {
      return {
        source: "Delhi",
        destination: "Mumbai",
        travelClass: "Business",
      };
    } else if (transportType === "train") {
      return { source: "Delhi", destination: "Mumbai", travelClass: "General" };
    } else if (transportType === "bus") {
      return { source: "Delhi", destination: "Mumbai", travelClass: "AC" };
    }
    return { source: "", destination: "", travelClass: "" };
  };

  const [state, setState] = useState(initialState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const classOptions = {
    flight: ["BUSINESS", "ECONOMY", "FIRST_CLASS"],
    train: ["FIRST_CLASS", "GENERAL", "SECOND_CLASS", "SLEEPER"],
    bus: ["AC", "NON_AC", "SEATER", "SEMI_SLEEPER", "SLEEPER"],
  };

  const handleSelect = (selectedClass) => {
    setState({ ...state, travelClass: selectedClass });
    setIsMenuOpen(false);
  };

  const [getDeparture, setDeparture] = useState({
    min: today.date,
    value: "",
    date: null,
    month: null,
    year: null,
    day: null,
  });

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
      travelClass: state.travelClass,
      departureDate: getDeparture,
      transportType,
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
                  {getDeparture.month}
                  {getDeparture.date ? "'" : ""}
                  {getDeparture.year}
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

            <div
              className="trip-details-input"
              style={{ position: "relative" }}
            >
              <label htmlFor="class">Class</label>
              <div
                className="selected-class"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {state.travelClass || "Select Class"}
              </div>

              {isMenuOpen && (
                <div className="context-menu open">
                  {classOptions[transportType]?.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelect(option)}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #ddd",
                        background: "#fff",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#f0f0f0")
                      }
                      onMouseLeave={(e) => (e.target.style.background = "#fff")}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>


          </div>

          <button type="submit" id="search-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchTransport;
