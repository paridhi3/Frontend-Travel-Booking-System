import "./Flights.css";
import React, { useContext, useEffect, useState } from "react";
import FetchFlights from "../FetchFlights/FetchFlights";
import SearchFlights from "../SearchFlights/SearchFlights";
import { MyContext } from "../../Context/Context";
import Loader from "../../Loader/Loader";
import FlightService from "../../../service/FlightService";
import AvailabilityService from "../../../service/AvailabilityService";

const Flights = () => {
  const myContext = useContext(MyContext);

  useEffect(() => {
    myContext.onHomePage(true);
  }, [myContext]);

  const [allFlights, setAllFlights] = useState([]); // Store all flights
  const [flights, setFlights] = useState([]); // Displayed flights
  const [availability, setAvailabilityData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [failed, setFailed] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    flightClass: "",
    departureDate: "",
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setIsSearchClicked(true); // Only filter results when search is clicked
  };

  const fetchFlights = async () => {
    setLoader(true);
    setFailed(false);
    try {
      const response = await FlightService.getAllFlights();
      const data = response.data;
      setAllFlights(data);

      setTimeout(() => {
        setLoader(false);
      }, 3000);
    } catch (error) {
      setFailed(true);
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(
        "FLIGHT"
      );
      setAvailabilityData(response.data);
    } catch (error) {
      setFailed(true);
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // **Filtering Logic**
  useEffect(() => {
    if (!isSearchClicked) {
        setFlights(allFlights);
        return; // Don't filter until search is clicked
    } 

    console.log("All Flights Data:", allFlights);
    console.log("All Availability Data:", availability);

    const {
      source = "",
      destination = "",
      flightClass = "",
      departureDate = "",
    } = searchFilters;

    const filteredFlights = allFlights.filter((flight) => {
      const flightSource = flight.source?.trim().toLowerCase() || "";
      const flightDestination = flight.destination?.trim().toLowerCase() || "";
      const flightClassValue = flight.flightClass?.trim().toLowerCase() || "";

      const matchesSource =
        source.trim() === "" || flightSource === source.trim().toLowerCase();
      const matchesDestination =
        destination.trim() === "" ||
        flightDestination === destination.trim().toLowerCase();
      const matchesFlightClass =
        flightClass.trim() === "" ||
        flightClassValue === flightClass.trim().toLowerCase();

      let matchesDepartureDate = true;
      const formattedDepartureDate = departureDate?.value ?? "";
      if (formattedDepartureDate !== "") {
        matchesDepartureDate = availability.some(
          (avail) =>
            avail.transportId === flight.flightId &&
            avail.travelDate === formattedDepartureDate
        );
      }

      return (
        matchesSource &&
        matchesDestination &&
        matchesFlightClass &&
        matchesDepartureDate
      );
    });

    console.log("Filtered Flights After Processing:", filteredFlights);
    setFlights(filteredFlights);
  }, [searchFilters, allFlights, availability, isSearchClicked]); // Depend on isSearchClicked


  return (
    <div className="flights">
      {loader ? (
        <Loader type="flights" failed={failed} />
      ) : (
        <>
          <SearchFlights onSearch={handleSearch} />
          <div className="flights-tickets-container">
            <h1>Available Flights</h1>
            <div className="flights-tickets">

              {flights.length > 0 ? (
                flights.map((flight) => (
                  <FetchFlights
                    key={flight.flightId}
                    type="flights"
                    flight={flight}
                    filters={isSearchClicked ? searchFilters : undefined}
                  />
                ))
              ) : (
                <p>No flights found.</p>
              )}

              {/* {flights.map((flight) => (
                <FetchFlights
                  key={flight.flightId}
                  type="flights"
                  flight={flight}
                />
              ))} */}

              {/* <FetchFlights type="flights" filters={searchFilters} flights={flights} /> */}

            </div>
          </div>
        </>
      )}
    </div>
  );

};
export default Flights;
