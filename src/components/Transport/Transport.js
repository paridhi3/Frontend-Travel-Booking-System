import "../../styles/transport/Transport.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import FetchTransport from "./FetchTransport"; // Rename later if needed
import SearchTransport from "./SearchTransport"; // Works for all transport types
import { MyContext } from "../Context/Context";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import FlightService from "../../service/FlightService";
import TrainService from "../../service/TrainService";
import BusService from "../../service/BusService";
import AvailabilityService from "../../service/AvailabilityService";

const Transport = () => {
  const { transportType } = useParams(); // Get type from URL
  const type = transportType || "flight"; // Default to flights if transportType is not set

  const [allTransports, setAllTransports] = useState([]); // Store all transport data
  const [transports, setTransports] = useState([]); // Displayed transports
  const [availability, setAvailabilityData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const myContext = useContext(MyContext);

  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    travelClass: "",
    departureDate: "",
  });

  const transportClassKey =
    type === "flight"
      ? "flightClass"
      : type === "train"
      ? "trainClass"
      : "busClass";

  const transportIdKey =
    type === "flight" ? "flightId" : type === "train" ? "trainId" : "busId";

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setIsSearchClicked(true);
  };

  useEffect(() => {
    console.log("Type changed: ", type);
    setIsSearchClicked(false);
  }, [type]);

  const fetchTransportData = useCallback(async () => {
    setLoader(true);
    setFailed(false);

    try {
      let response;
      switch (type) {
        case "flight":
          response = await FlightService.getAllFlights();
          break;
        case "train":
          response = await TrainService.getAllTrains();
          break;
        case "bus":
          response = await BusService.getAllBuses();
          break;
        default:
          setFailed(true);
          return;
      }

      console.log("(fetchTransportData) Response Data:", response.data);
      setAllTransports(response.data);
      setTransports(response.data);

      setTimeout(() => {
        setLoader(false);
      }, 3000);

      console.log("(Transport.js) transportType: ", type); // correct
      console.log("(Transport.js) response.data:", response.data); // correct
    } catch (error) {
      setFailed(true);
      console.error(`Error fetching ${type}:`, error);
    }
  }, [type]);

  const fetchAvailability = useCallback(async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(
        type.toUpperCase()
      );
      setAvailabilityData(response.data);
    } catch (error) {
      setFailed(true);
      console.error(`Error fetching ${type} availability:`, error);
    }
  }, [type]);

  useEffect(() => {
    myContext.onHomePage(true);
  }, [myContext]);

  useEffect(() => {
    fetchTransportData();
  }, [fetchTransportData]);

  useEffect(() => {
    fetchAvailability();
  }, [type, fetchAvailability]);

  useEffect(() => {
    console.log(
      "(fetchTransportData) allTransports after update:",
      allTransports
    ); // empty
  }, [allTransports]);

  // **Filtering Logic**
  useEffect(() => {
    console.log("(Filtering) isSearchClicked:", isSearchClicked);
    console.log("(Filtering) allTransports:", allTransports);

    const { source, destination, travelClass, departureDate } = searchFilters;

    console.log("(Filtering) Search Filters:", searchFilters);
    console.log("(Filtering) All Transports Before Filtering:", allTransports);
    console.log("(Filtering) Availability Data:", availability);

    if (!isSearchClicked) {
      setTransports(allTransports);
      return;
    }

    const filteredTransports = allTransports.filter((transport) => {
      const transportSource = transport.source?.trim().toLowerCase() || "";
      const transportDestination =
        transport.destination?.trim().toLowerCase() || "";
      const transportClass =
        transport[transportClassKey]?.trim().toLowerCase() || "";

      const matchesSource =
        source.trim() === "" || transportSource === source.trim().toLowerCase();
      const matchesDestination =
        destination.trim() === "" ||
        transportDestination === destination.trim().toLowerCase();
      const matchesTravelClass =
        travelClass.trim() === "" ||
        transportClass === travelClass.trim().toLowerCase();

      // Check availability on selected departure date
      let matchesDepartureDate = true;
      const formattedDepartureDate = departureDate?.value ?? "";

      if (formattedDepartureDate !== "") {
        matchesDepartureDate = availability.some(
          (avail) =>
            avail.transportId === transport[transportIdKey] &&
            avail.travelDate === formattedDepartureDate
        );
      }

      return (
        matchesSource &&
        matchesDestination &&
        matchesTravelClass &&
        matchesDepartureDate
      );
    });

    if (isSearchClicked) {
      setTransports(filteredTransports);
      return;
    }

    console.log("(Filtering) Final Filtered Transports:", filteredTransports);
  }, [searchFilters, allTransports, availability, isSearchClicked, transportClassKey, transportIdKey]);

  const headingLabel =
    type === "flight" ? "Flights" : type === "train" ? "Trains" : "Buses";

  console.log("(Debug) allTransports:", allTransports);
  console.log("(Debug) transports:", transports);
  console.log("(Debug) isSearchClicked:", isSearchClicked);
  console.log("(Debug) availability:", availability);
  console.log(
    "(Debug) Transport Objects:",
    JSON.stringify(transports, null, 2)
  );

  return (
    <div className="transport">
      {loader ? (
        <Loader type={type} failed={failed} />
      ) : (
        <>
          <SearchTransport transportType={type} onSearch={handleSearch} />
          <div className="transport-tickets-container">
            <h1>Available {headingLabel}</h1>
            <div className="transport-tickets">
              {transports.length > 0 ? (
                transports.map((transport) => (
                  <FetchTransport
                    key={
                      transport.busId || transport.trainId || transport.flightId
                    }
                    transportType={type} // Flight, Train, Bus
                    transport={transport}
                    filters={isSearchClicked ? searchFilters : undefined}
                  />
                ))
              ) : (
                <p>No {type} found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transport;
