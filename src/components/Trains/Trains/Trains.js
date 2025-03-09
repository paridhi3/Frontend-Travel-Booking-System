import './Trains.css';
import React, { useContext, useEffect, useState } from "react";
import FetchTrains from "../FetchTrains/FetchTrains";
import SearchTrains from "../SearchTrains/SearchTrains";
import { MyContext } from '../../Context/Context';
import Loader from '../../Loader/Loader';
import TrainService from '../../../service/TrainService';

const Trains = () => {
    const myContext = useContext(MyContext);
    
    useEffect(() => {
        myContext.onHomePage(true);
    }, [myContext]);

    const [trains, setTrains] = useState([]);
    const [loader, setLoader] = useState(false);
    const [failed, setFailed] = useState(false);

    const getApi = async () => {
        setLoader(true);
        try {
            const response = await TrainService.getAllTrains();
            console.log("API Response:", response);

            const data = response.data;
            console.log("Trains Data:", data);

            setTrains(data);

            setTimeout(() => {
                setLoader(false);
            }, 3000);

        } catch (error) {
            setFailed(true);
            console.error("Error fetching trains:", error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <div className="trains">
            {loader ? (
                <Loader type="trains" failed={failed} />
            ) : (
                <>
                    <SearchTrains type="trains" />
                    <div className="trains-tickets-container">
                        <h1>Available Trains</h1>
                        <div className="trains-tickets">
                            {trains.map((train) => (
                                <FetchTrains key={train.trainId} type="trains" train={train} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Trains;
