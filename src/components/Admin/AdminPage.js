import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import FlightService from "../../service/FlightService";
import TrainService from "../../service/TrainService";
import BusService from "../../service/BusService";
import BookingService from "../../service/BookingService";
import { capitalizeFullName } from "../../Utils.js";

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedMode, setSelectedMode] = useState("flight"); // Default mode
  const [items, setItems] = useState([]); // Holds flights, trains, or buses
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
    class: "",
  });

  useEffect(() => {
    if (
      location.pathname.includes("manageFlight") ||
      location.pathname.includes("adminPage")
    ) {
      setSelectedMode("flight");
    } else if (location.pathname.includes("manageTrain")) {
      setSelectedMode("train");
    } else if (location.pathname.includes("manageBus")) {
      setSelectedMode("bus");
    }
  }, [location.pathname]);

  const fetchData = useCallback(async () => {
    try {
      let response;
      if (selectedMode === "flight") {
        response = await FlightService.getAllFlights();
      } else if (selectedMode === "train") {
        response = await TrainService.getAllTrains();
      } else {
        response = await BusService.getAllBuses();
      }
      console.log("(AdminPage.js - fetchData) response.data: ", response.data);
      setItems(response.data);
    } catch (error) {
      console.error(`Error fetching ${selectedMode}s:`, error);
      console.error("Response data:", error.response?.data);
    }
  }, [selectedMode]);

  useEffect(() => {
    fetchData();
  }, [selectedMode, fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "(AdminPage.js - handleSubmit) Submitting formData: ",
      formData
    );

    try {
      if (selectedAction === "add" || selectedAction === "update") {
        let formattedData = {
          source: formData.from,
          destination: formData.to,
          departureTime: formData.departureTime + ":00",
          arrivalTime: formData.arrivalTime + ":00",
          price: parseFloat(formData.price),
          totalSeats: parseInt(formData.totalSeats),
        };

        if (selectedMode === "flight") {
          formattedData = {
            ...formattedData,
            airlineName: formData.name,
            flightClass: formData.class,
          };
          if (selectedAction === "add") {
            await FlightService.addFlight(formattedData);
            alert("Flight added successfully!");
          } else if (selectedAction === "update") {
            await FlightService.updateFlight(formData.id, formattedData);
            alert("Flight updated successfully!");
          }
        } else if (selectedMode === "train") {
          formattedData = {
            ...formattedData,
            trainName: formData.name,
            trainClass: formData.class,
          };
          if (selectedAction === "add") {
            await TrainService.addTrain(formattedData);
            alert("Train added successfully!");
          } else if (selectedAction === "update") {
            await TrainService.updateTrain(formData.id, formattedData);
            alert("Train updated successfully!");
          }
        } else if (selectedMode === "bus") {
          formattedData = {
            ...formattedData,
            busName: formData.name,
            busClass: formData.class,
          };
          if (selectedAction === "add") {
            await BusService.addBus(formattedData);
            alert("Bus added successfully!");
          } else if (selectedAction === "update") {
            await BusService.updateBus(formData.id, formattedData);
            alert("Bus updated successfully!");
          }
        }
      }

      fetchData();
      setSelectedAction(null);
    } catch (error) {
      console.error(`Error ${selectedAction}ing ${selectedMode}:`, error);
      console.error("Response data:", error.response?.data);
    }
  };

  const prepareUpdateForm = (item) => {
    setFormData({
      id: item.flightId || item.trainId || item.busId,
      name: item.airlineName || item.trainName || item.busName,
      from: item.source,
      to: item.destination,
      departureTime:
        item.departureTime.split(":")[0] +
        ":" +
        item.departureTime.split(":")[1],
      arrivalTime:
        item.arrivalTime.split(":")[0] + ":" + item.arrivalTime.split(":")[1],
      price: item.price,
      totalSeats: item.totalSeats,
      class: item.flightClass || item.trainClass || item.busClass,
    });
    setSelectedAction("update");
  };

  const handleDelete = async (id) => {
    try {
      if (selectedMode === "flight") {
        await FlightService.deleteFlight(id);
      } else if (selectedMode === "train") {
        await TrainService.deleteTrain(id);
      } else if (selectedMode === "bus") {
        await BusService.deleteBus(id);
      }
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${selectedMode}:`, error);
    }
  };

  //-------------------------------------------------------------------------------

  const renderForm = () => {
    if (selectedAction === "add" || selectedAction === "update") {
      return (
        <form className="add-update-form" onSubmit={handleSubmit}>
          <label>
            {selectedMode === "flight"
              ? "Airline Name"
              : selectedMode === "train"
              ? "Train Name"
              : "Bus Name"}
            :
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            From:
            <input
              type="text"
              value={formData.from}
              onChange={(e) =>
                setFormData({ ...formData, from: e.target.value })
              }
              required
            />
          </label>
          <label>
            To:
            <input
              type="text"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              required
            />
          </label>
          <label>
            Departure Time:
            <input
              type="time"
              value={formData.departureTime}
              onChange={(e) =>
                setFormData({ ...formData, departureTime: e.target.value })
              }
              required
            />
          </label>
          <label>
            Arrival Time:
            <input
              type="time"
              value={formData.arrivalTime}
              onChange={(e) =>
                setFormData({ ...formData, arrivalTime: e.target.value })
              }
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </label>
          <label>
            Total Seats:
            <input
              type="number"
              value={formData.totalSeats}
              onChange={(e) =>
                setFormData({ ...formData, totalSeats: e.target.value })
              }
              required
            />
          </label>

          <label>
            {selectedMode === "flight"
              ? "Flight Class"
              : selectedMode === "train"
              ? "Train Class"
              : "Bus Type"}
            :
            <select
              value={formData.flightClass}
              onChange={(e) =>
                setFormData({ ...formData, flightClass: e.target.value })
              }
              required
            >
              {selectedMode === "flight" && (
                <>
                  <option value="ECONOMY">Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST_CLASS">First Class</option>
                </>
              )}
              {selectedMode === "train" && (
                <>
                  <option value="FIRST_CLASS">First Class</option>
                  <option value="GENERAL">General</option>
                  <option value="SECOND_CLASS">Second Class</option>
                  <option value="SLEEPER">Sleeper</option>
                </>
              )}
              {selectedMode === "bus" && (
                <>
                  <option value="SEATER">Seater</option>
                  <option value="NON_AC">Non-AC</option>
                  <option value="AC">AC</option>
                  <option value="SLEEPER">Sleeper</option>
                  <option value="SEMI_SLEEPER">Semi-Sleeper</option>
                </>
              )}
            </select>
          </label>

          <button type="submit">
            {selectedAction === "add"
              ? `Add ${capitalizeFullName(selectedMode)}`
              : `Update ${capitalizeFullName(selectedMode)}`}
          </button>
        </form>
      );
    }
    return null;
  };

  const renderTable = () => {
    if (selectedAction === "view" && (!items || items.length === 0)) {
      return <p>No {selectedMode} added yet</p>;
    }
    if (selectedAction === "view" && items.length > 0) {
      return (
        <table className="data-table">
          <thead>
            <tr>
              <th>
                {selectedMode === "flight"
                  ? "Flight ID"
                  : selectedMode === "train"
                  ? "Train ID"
                  : "Bus ID"}
              </th>
              <th>
                {selectedMode === "flight"
                  ? "Airline Name"
                  : selectedMode === "train"
                  ? "Train Name"
                  : "Bus Name"}
              </th>
              <th>From</th>
              <th>To</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Price</th>
              <th>Total Seats</th>
              <th>
                {selectedMode === "flight"
                  ? "Flight Class"
                  : selectedMode === "train"
                  ? "Train Class"
                  : "Bus Type"}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={
                  selectedMode === "flight"
                    ? item.flightId
                    : selectedMode === "train"
                    ? item.trainId
                    : item.busId
                }
              >
                <td>
                  {selectedMode === "flight"
                    ? item.flightId
                    : selectedMode === "train"
                    ? item.trainId
                    : item.busId}
                </td>
                <td>
                  {selectedMode === "flight"
                    ? item.airlineName
                    : selectedMode === "train"
                    ? item.trainName
                    : item.busName}
                </td>
                <td>{item.source}</td>
                <td>{item.destination}</td>
                <td>{item.departureTime}</td>
                <td>{item.arrivalTime}</td>
                <td>{item.price}</td>
                <td>{item.totalSeats}</td>
                <td>{item.flightClass || item.trainClass || item.busClass}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(
                        selectedMode === "flight"
                          ? item.flightId
                          : selectedMode === "train"
                          ? item.trainId
                          : item.busId
                      )
                    }
                  >
                    Delete
                  </button>

                  <button
                    className="update-button"
                    onClick={() => prepareUpdateForm(item)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  useEffect(() => {
    console.log("Selected Action Changed: ", selectedAction);
  }, [selectedAction]);

  const viewBookingsClicked = async () => {
    try {
      const response = await BookingService.getAllBookings(); // Await the API response
  
      navigate("/adminViewBookings", {
        state: { bookings: response.data },
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  

  return (
    <div className="admin-content-container">
      <div className="admin-content">
        <form className="admin-content-form">
          {[
            "/manageFlight",
            "/adminPage",
            "/manageTrain",
            "/manageBus",
          ].includes(location.pathname) && (
            <div className="trip-details">
              <div className="trip-details-input">
                <button type="button" onClick={() => setSelectedAction("add")}>
                  Add{" "}
                  {selectedMode === "flight"
                    ? "Flights"
                    : selectedMode === "train"
                    ? "Trains"
                    : "Buses"}
                </button>
              </div>

              <div className="trip-details-input">
                <button type="button" onClick={() => setSelectedAction("view")}>
                  View{" "}
                  {selectedMode === "flight"
                    ? "Flights"
                    : selectedMode === "train"
                    ? "Trains"
                    : "Buses"}
                </button>
              </div>

            </div>
          )}
        </form>

        {/* Render Form */}
        {renderForm()}

        {/* Render Table */}
        {renderTable()}

        <button className="admin-view-bookings" onClick={viewBookingsClicked}>View Bookings</button>
      </div>
    </div>
  );
};

export default AdminPage;
