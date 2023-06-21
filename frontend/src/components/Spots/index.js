import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom'
import './Spot.css';

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots)
    const spotsArr = Object.values(spots)
    console.log('SPOTSarr-->', spotsArr)
    console.log('Spots', spots)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!spotsArr.length) {
        return <h1>Loading...</h1>
    }

    const rating = (rating) => {
        if (typeof rating === 'number') {
            return (
                <div>
                    <i className='fa-solid fa-star star-icon' />
                    {Number(rating).toFixed(1)}
                </div>
            )
        }
        else return (
        <div>
            <i className='fa-solid fa-star star-icon' /> New
        </div>
        )
    }

    return (
        <div className='all-spots-container'>
                {spotsArr.map(spot =>
                    <div className='spot-cards' key={spot.id} data-tooltip={spot.name}>
                        <NavLink to={`/spots/${spot.id}`} className='spot-link' >
                            <img className='spot-image' src={`${spot.previewImage}`}></img>
                            <div className='location-rating'>
                                <div className='spot-location'>{`${spot.city}, ${spot.state}`}</div>
                                <div className='star-rating'>{rating(spot.avgRating)}</div>
                            </div>
                            <div className='spot-price'>{`$${spot.price}`} Night</div>
                        </NavLink>
                    </div>
                )}
            </div>
    )
}

export default AllSpots;
