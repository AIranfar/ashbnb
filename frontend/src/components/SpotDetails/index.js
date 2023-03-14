import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot)

    // console.log(spotId)

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId])

    if (!spot) {
        return <h1>loading...</h1>
    }

    console.log(spot)

    return (
        <div className='spot-container'>
            <h1>{spot.name}</h1>
            <div className="spot-images-div" />
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <img className='spot-image' src={`${spot.SpotImages[0].url}`}></img>
            <p>{spot.description}</p>
            <div>${spot.price} Night</div>
            <button>RESERVE</button>
        </div>
    );
}

export default SpotDetails;
