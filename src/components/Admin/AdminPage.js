import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlightService from "../services/FlightService"; // Adjust the path as per your project structure

const AdminPage = () => {
  const location = useLocation();
  const [selectedAction, setSelectedAction] = useState(null);

  // FLIGHTS -------------------------------------------------------------------
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
    flightClass: "ECONOMY",
  });

  // Fetch flights when the component loads
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await FlightService.getAllFlights();
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await FlightService.addFlight(formData);
      fetchFlights(); // Refresh the list after adding
      setSelectedAction(null); // Hide form after submission
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };  

  const handleDeleteFlight = async (id) => {
    try {
      await FlightService.deleteFlight(id);
      fetchFlights(); // Refresh the list
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };
//-------------------------------------------------------------------------------  

  const renderForm = () => {
    if (selectedAction === "add" || selectedAction === "update") {
      if (location.pathname === "/manageFlight") {
        return (
          <form className="add-update-form" onSubmit={handleAddFlight}>
            <label>
              Airline Name: <input type="text" required />
            </label>
            <label>
              From: <input type="text" required />
            </label>
            <label>
              To: <input type="text" required />
            </label>
            <label>
              Departure Time: <input type="time" required />
            </label>
            <label>
              Arrival Time: <input type="time" required />
            </label>
            <label>
              Price: <input type="number" required />
            </label>
            <label>
              Total Seats: <input type="number" required />
            </label>
            <label>
              Flight Class:
              <select required>
                <option value="ECONOMY">Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST_CLASS">First Class</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      }

      if (location.pathname === "/manageTrain") {
        return (
          <form className="add-update-form">
            <label>
              Train Name: <input type="text" required />
            </label>
            <label>
              From: <input type="text" required />
            </label>
            <label>
              To: <input type="text" required />
            </label>
            <label>
              Departure Time: <input type="time" required />
            </label>
            <label>
              Arrival Time: <input type="time" required />
            </label>
            <label>
              Price: <input type="number" required />
            </label>
            <label>
              Total Seats: <input type="number" required />
            </label>
            <label>
              Train Class:
              <select required>
                <option value="FIRST_CLASS">FIRST_CLASS</option>
                <option value="GENERAL">GENERAL</option>
                <option value="SECOND_CLASS">SECOND_CLASS</option>
                <option value="SLEEPER">SLEEPER</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      }

      if (location.pathname === "/manageBus") {
        return (
          <form className="add-update-form">
            <label>
              Bus Name: <input type="text" required />
            </label>
            <label>
              From: <input type="text" required />
            </label>
            <label>
              To: <input type="text" required />
            </label>
            <label>
              Departure Time: <input type="time" required />
            </label>
            <label>
              Arrival Time: <input type="time" required />
            </label>
            <label>
              Price: <input type="number" required />
            </label>
            <label>
              Total Seats: <input type="number" required />
            </label>
            <label>
              Bus Class:
              <select required>
                <option value="SEATER">Seater</option>
                <option value="NON_AC">Non-AC</option>
                <option value="AC">AC</option>
                <option value="SLEEPER">Sleeper</option>
                <option value="SEMI_SLEEPER">Semi-Sleeper</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      }

      return null; // Return null if none of the paths match
    }
  };

  const renderTable = () => {
    if (selectedAction === "view") {
      if (location.pathname === "/manageFlight") {
        return (
          <table border="1">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Airline Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Flight Class</th>
                <th>Total Seats</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.name}</td>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.time}</td>
                  <td>
                    <button onClick={() => handleDeleteFlight(flight.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      if (location.pathname === "/manageTrain") {
        return (
          <table border="1">
            <thead>
              <tr>
                <th>Train ID</th>
                <th>Train Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Train Class</th>
                <th>Total Seats</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.name}</td>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.time}</td>
                  <td>
                    <button onClick={() => handleDeleteTrain(flight.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      if (location.pathname === "/manageBus") {
        return (
          <table border="1">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Bus Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Bus Class</th>
                <th>Total Seats</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.name}</td>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.time}</td>
                  <td>
                    <button onClick={() => handleDeleteBus(flight.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      return null;
    }
  };

  useEffect(() => {
    console.log("Selected Action Changed: ", selectedAction);
  }, [selectedAction]);

  return (
    <div className="admin-content-container">
      <div className="admin-content">
        <form className="admin-content-form">
          {location.pathname === "/manageFlight" && (
            <div className="trip-details">
              <div className="trip-details-input">
                <button type="button" onClick={() => setSelectedAction("add")}>
                  Add Flights
                </button>
              </div>

              <div className="trip-details-input">
                <button
                  type="button"
                  onClick={() => setSelectedAction("update")}
                >
                  Update Flights
                </button>
              </div>

              <div className="trip-details-input">
                <button type="button" onClick={() => setSelectedAction("view")}>
                  View Flights
                </button>
              </div>

              <div className="trip-details-input">
                <button>Delete Flights</button>
              </div>

              {location.pathname === "/manageTrain" && (
                <div className="trip-details">
                  <div className="trip-details-input">
                    <button
                      type="button"
                      onClick={() => setSelectedAction("add")}
                    >
                      Add Trains
                    </button>
                  </div>

                  <div className="trip-details-input">
                    <button
                      type="button"
                      onClick={() => setSelectedAction("update")}
                    >
                      Update Trains
                    </button>
                  </div>

                  <div className="trip-details-input">
                    <button
                      type="button"
                      onClick={() => setSelectedAction("view")}
                    >
                      View Trains
                    </button>
                  </div>

                  <div className="trip-details-input">
                    <button>Delete Trains</button>
                  </div>

                  {/* <div>
                    {renderForm()}
                    {renderTable()}
                  </div> */}
                </div>
              )}
            </div>
          )}

          {location.pathname === "/manageBus" && (
            <div className="trip-details">
              <div className="trip-details-input">
                <button type="button" onClick={() => setSelectedAction("add")}>
                  Add Buses
                </button>
              </div>

              <div className="trip-details-input">
                <button
                  type="button"
                  onClick={() => setSelectedAction("update")}
                >
                  Update Buses
                </button>
              </div>

              <div className="trip-details-input">
                <button type="button" onClick={() => setSelectedAction("view")}>
                  View Buses
                </button>
              </div>

              <div className="trip-details-input">
                <button>Delete Buses</button>
              </div>
            </div>
          )}
        </form>
        {renderForm()}
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminPage;
