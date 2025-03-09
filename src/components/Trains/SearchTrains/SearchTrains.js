import React, { useState } from "react";
import "./SearchTrains.css";
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
// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const today = getDate(new Date());

const SearchTrains = ({ type }) => {

  const [state, setState] = useState({
    fromValue: "Delhi",
    toValue: "Mumbai",
    classValue: "First Class"
  });

  const [getDeparture, setDeparture] = useState({
    min: today.date,
    value: today.date,
    date: Number(today.dd),
    month: months[Number(today.mm) - 1],
    year: `${today.yyyy}`.slice(2, 4),
    day: today.day,
  });

  /*--------------------------------------*/
  // const [getReturn, setReturn] = useState({
  //   value: today.date,
  //   min: today.date,
  //   date: Number(today.dd),
  //   month: months[Number(today.mm) - 1],
  //   year: `${today.yyyy}`.slice(2, 4),
  //   day: today.day,
  // });
  /*--------------------------------------*/

  const departureChange = (e) => {
    let date = new Date(e.target.value);
    const currentDate = getDate(date);
    setDeparture({
      ...getDeparture,
      value: currentDate.date,
      date: Number(currentDate.dd),
      month: months[Number(currentDate.mm) - 1],
      year: `${currentDate.yyyy}`.slice(2, 4),
      day: currentDate.day,
    });

    /*--------------------------------------*/
    // const dayAfter = getDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
    // setReturn({
    //   min: currentDate.date,
    //   value: dayAfter.date,
    //   date: Number(dayAfter.dd),
    //   month: months[Number(dayAfter.mm) - 1],
    //   year: `${dayAfter.yyyy}`.slice(2, 4),
    //   day: dayAfter.day,
    // });
    /*--------------------------------------*/

  };

/*--------------------------------------*/
  // const returnChange = (e) => {
  //   let date = new Date(e.target.value);
  //   const currentDate = getDate(date);
  //   setReturn({
  //     ...getReturn,
  //     value: currentDate.date,
  //     date: Number(currentDate.dd),
  //     month: months[Number(currentDate.mm) - 1],
  //     year: `${currentDate.yyyy}`.slice(2, 4),
  //     day: currentDate.day,
  //   });
  // };
/*--------------------------------------*/

  return (
    <div className="search-content-container">
      <div className="search-content">
        <form onSubmit={(e) => e.preventDefault()} className="search-content-form">

          <div className="trip-details">

            <div className="trip-details-input">
              <label htmlFor="from">From</label>
              <input
                autoComplete="off"
                id="from"
                type="text"
                placeholder="From"
                onChange={(e) =>
                  setState({ ...state, formValue: e.target.value })
                }
                value={state.fromValue}
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
                  setState({ ...state, toValue: e.target.value })
                }
                value={state.toValue}
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
                id="train-class"
                type="text"
                placeholder="Train Class"
                onChange={(e) =>
                  setState({ ...state, classValue: e.target.value })
                }
                value={state.classValue}
              />
            </div>

            {/* <div className="trip-details-input">
              <label htmlFor="class">Class</label>
              <select
                id="train-class"
                className="styled-input" // Apply the same styles as the input
                value={state.classValue}
                onChange={(e) =>
                  setState({ ...state, classValue: e.target.value })
                }
              >
                <option value="First Class">First Class</option>
                <option value="Second Class">Second Class</option>
                <option value="Sleeper">Sleeper</option>
                <option value="General">General</option>
              </select>
            </div> */}

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

export default SearchTrains;
