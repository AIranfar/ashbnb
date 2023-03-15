import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId])

    if (!spot || !spot.name) {
        return (<h1>loading...</h1>)
    }

    function handleClick() {
        alert('Feature Coming Soon...')
    };


    return (
        <div className='spot-container'>
            <h1>{spot.name}</h1>
            <div className='spot-images-div' />
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            {spot.SpotImages.map(img => {
                return <img className='spot-image' src={img.url} alt={spot.name} key={img.id}></img>
            })}
            <div class='small-box'>
                <p>{spot.description}</p>
                <div>${spot.price} Night</div>
                <button id='reserve-button-id' onClick={handleClick}>RESERVE</button>
            </div>
        </div>
    );
}

export default SpotDetails;
