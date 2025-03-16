import './Flights.css';
import React, { useContext, useEffect, useState } from "react";
import FetchFlights from "../FetchFlights/FetchFlights";
import SearchFlights from "../SearchFlights/SearchFlights";
import { MyContext } from '../../Context/Context';
import Loader from '../../Loader/Loader';
import FlightService from '../../../service/FlightService';

const Flights = () => {
    const myContext = useContext(MyContext);
    
    useEffect(() => {
        myContext.onHomePage(true);
    }, [myContext]);

    const [flights, setFlights] = useState([]);
    const [loader, setLoader] = useState(false);
    const [failed, setFailed] = useState(false);

    const getApi = async () => {
        setLoader(true);
        try {
            const response = await FlightService.getAllFlights();
            console.log("API Response:", response);

            const data = response.data;
            console.log("Flights Data:", data);

            setFlights(data);

            setTimeout(() => {
                setLoader(false);
            }, 3000);

        } catch (error) {
            setFailed(true);
            console.error("Error fetching flights:", error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <div className="flights">
            {loader ? (
                <Loader type="flights" failed={failed} />
            ) : (
                <>
                    <SearchFlights type="flights" />
                    <div className="flghts-tickets-container">
                        <h1>Available Flights</h1>
                        <div className="flghts-tickets">
                            {flights.map((flight) => (
                                <FetchFlights key={flight.flightId} type="flights" flight={flight} />
                            ))}
                            {/* <FetchFlights type="flights" flights={flights} /> */}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Flights;
