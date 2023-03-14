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


    return (
        <div className='all-Spots'>
            {spots.map(spot =>
                <div className='spot-cards' key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`} className='spot-link'>
                        <p>{spot.name}</p>
                        <img className='spot-image' src={`${spot.previewImage}`}></img>
                    <div>{`$${spot.price}`} Night</div>
                    <div>{`${spot.city}, ${spot.state}`}</div>
                    <div>{spot.avgRating}</div>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default AllSpots;
