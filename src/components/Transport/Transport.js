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
  const myContext = useContext(MyContext);

  useEffect(() => {
    myContext.onHomePage(true);
  }, [myContext]);

  const [allTransports, setAllTransports] = useState([]); // Store all transport data
  const [transports, setTransports] = useState([]); // Displayed transports
  const [availability, setAvailabilityData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    transportClass: "",
    departureDate: "",
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setIsSearchClicked(true);
  };

  // const fetchTransportData = useCallback(async () => {
  //   setLoader(true);
  //   setFailed(false);

  //   try {
  //     let response;
  //     switch (type) {
  //       case "flight":
  //         response = await FlightService.getAllFlights();
  //         break;
  //       case "train":
  //         response = await TrainService.getAllTrains();
  //         break;
  //       case "bus":
  //         response = await BusService.getAllBuses();
  //         break;
  //       default:
  //         setFailed(true);
  //         return;
  //     }

  //     setAllTransports(response.data);
  //     setTimeout(() => {
  //       setLoader(false);
  //     }, 3000);

  //     console.log("(Transport.js) transportType: ", transportType);
  //     console.log("(Transport.js) response.data:", response.data); // 🔍 Debugging here
  //   } catch (error) {
  //     setFailed(true);
  //     console.error(`Error fetching ${transportType}:`, error);
  //   }
  // }, [type]);

  const fetchTransportData = useCallback(async () => {
    setLoader(true);
    setFailed(false);

    try {
      let response;
      switch (
        type // Use 'type' instead of 'transportType'
      ) {
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

      setTimeout(() => {
        console.log(
          "(fetchTransportData) allTransports after update:",
          allTransports
        );
        setLoader(false);
      }, 3000);

      console.log("(Transport.js) transportType: ", type); // ✅ Debugging
      console.log("(Transport.js) response.data:", response.data);
    } catch (error) {
      setFailed(true);
      console.error(`Error fetching ${type}:`, error);
    }
  }, [type]); // ✅ Add 'type' instead of 'transportType'

  const fetchAvailability = useCallback(async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(
        type.toUpperCase()
      );
      setAvailabilityData(response.data);
    } catch (error) {
      setFailed(true);
      console.error(`Error fetching ${transportType} availability:`, error);
    }
  }, [type]);

  // useEffect(() => {
  //   fetchTransportData();
  // }, [transportType, fetchTransportData]);
  useEffect(() => {
    fetchTransportData();
  }, [type, fetchTransportData]); // ✅ Change 'transportType' to 'type'

  // useEffect(() => {
  //   fetchAvailability();
  // }, [transportType, fetchAvailability]);
  useEffect(() => {
    fetchAvailability();
  }, [type, fetchAvailability]); // ✅ Change 'transportType' to 'type'

  // **Filtering Logic**
  useEffect(() => {
    console.log("(Filtering) isSearchClicked:", isSearchClicked);
    console.log("(Filtering) allTransports:", allTransports);

    if (!isSearchClicked) {
      setTransports(allTransports);
      return;
    }

    const { source, destination, transportClass, departureDate } =
      searchFilters;

    const filteredTransports = allTransports.filter((transport) => {
      const transportSource = transport.source?.trim().toLowerCase() || "";
      const transportDestination =
        transport.destination?.trim().toLowerCase() || "";
      const transportClassValue =
        transport.transportClass?.trim().toLowerCase() || "";

      const matchesSource =
        !source || transportSource === source.trim().toLowerCase();
      const matchesDestination =
        !destination ||
        transportDestination === destination.trim().toLowerCase();
      const matchesClass =
        !transportClass ||
        transportClassValue === transportClass.trim().toLowerCase();

      let matchesDepartureDate = true;
      if (departureDate) {
        matchesDepartureDate = availability.some(
          (avail) =>
            avail.transportId === transport.id &&
            avail.travelDate === departureDate
        );
      }

      return (
        matchesSource &&
        matchesDestination &&
        matchesClass &&
        matchesDepartureDate
      );
    });

    console.log("(Filtering) Final Filtered Transports:", filteredTransports);
    setTransports(filteredTransports);
  }, [searchFilters, allTransports, availability, isSearchClicked]);

  const headingLabel =
    type === "flight" ? "Flights" : type === "train" ? "Trains" : "Buses";

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
                    key={transport.id}
                    transportType={type} // Flight, Train, Bus
                    transport={transport}
                    filters={isSearchClicked ? searchFilters : undefined}
                  />
                ))
              ) : (
                <p>No {transportType} found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transport;
