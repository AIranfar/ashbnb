import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom'
import './Spot.css';

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const rating = (rating) => {
        if (typeof rating === 'number') {
            return (
                <div>
                    <i className='fa-solid fa-star star-icon' />
                    {Number(rating).toFixed(1)}
                </div>
            )
        }
        else return 'New';
    }

    return (
        <div className='all-Spots'>
            <div className='spots-container'>
                {spots.map(spot =>
                    <div className='spot-cards' key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className='spot-link'>
                            <img className='spot-image' src={`${spot.previewImage}`}></img>
                            <div className='spot-location'>{`${spot.city}, ${spot.state}`}</div>
                            <div className='spot-price'>{`$${spot.price}`} Night</div>
                            <div className='star-rating'>{rating(spot.avgRating)}</div>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllSpots;
