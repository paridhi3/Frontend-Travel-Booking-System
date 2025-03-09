import './Buses.css';
import React, { useContext, useEffect, useState } from "react";
import FetchBuses from "../FetchBuses/FetchBuses";
import SearchBuses from "../SearchBuses/SearchBuses";
import { MyContext } from '../../Context/Context';
import Loader from '../../Loader/Loader';
import BusService from '../../../service/BusService';

const Buses = () => {
    const myContext = useContext(MyContext);
    
    useEffect(() => {
        myContext.onHomePage(true);
    }, [myContext]);

    const [buses, setBuses] = useState([]);
    const [loader, setLoader] = useState(false);
    const [failed, setFailed] = useState(false);

    const getApi = async () => {
        setLoader(true);
        try {
            const response = await BusService.getAllBuses();
            console.log("API Response:", response);

            const data = response.data;
            console.log("Buses Data:", data);

            setBuses(data);

            setTimeout(() => {
                setLoader(false);
            }, 3000);

        } catch (error) {
            setFailed(true);
            console.error("Error fetching buses:", error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <div className="buses">
            {loader ? (
                <Loader type="buses" failed={failed} />
            ) : (
                <>
                    <SearchBuses type="buses" />
                    <div className="buses-tickets-container">
                        <h1>Available Buses</h1>
                        <div className="buses-tickets">
                            {buses.map((bus) => (
                                <FetchBuses key={bus.busId} type="bus" bus={bus} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Buses;
