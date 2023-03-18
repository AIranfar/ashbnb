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
            <div className='big-small-box'>
                <div className='hosted-by'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                <div className='small-box'>
                    <div>${spot.price} Night</div>
                    <br />
                    <button id='reserve-button-id' onClick={handleClick}>RESERVE</button>
                </div>
            </div>
                <div>{spot.description}</div>
        </div>
    );
}

export default SpotDetails;
