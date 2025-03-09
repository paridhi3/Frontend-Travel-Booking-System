import './Loader.css';
import React from 'react';
import planeGif from '../../images/plane-gif.gif'
import busGif from '../../images/bus.gif'
import trainGif from '../../images/train-gif.gif'


const Loader= ({type, faild})=>{
    return(
        <div className='loader-container'>
            <div className="loader">
                {
                    faild ? <p style={{color:'pink'}}>Something went worng. Check your internet connection.</p>:
                    <>
                        {
                            type === 'flights' &&
                            <>
                                <img className='plane-gif' src={planeGif} alt="Plane" />
                                <p>Fetching Available Flights...</p>
                            </>
                        }
                        {
                            type === 'buses' &&
                            <>
                                <img className='bus-gif' src={busGif} alt="Bus" />
                                <p>Fetching Available Buses...</p>
                            </>
                        }
                        {
                            type === 'trains' &&
                            <>
                                <img className='train-gif' src={trainGif} alt="Train" />
                                <p>Fetching Available Trains...</p>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}
export default Loader;