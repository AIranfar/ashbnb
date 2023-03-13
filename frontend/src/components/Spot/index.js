import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './Spot.css';

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    console.log("Spot:", { spots })

    return (
        <div className='all-Spots'>
            {spots.map(spot =>
                <div className='spot-cards'>
                    <p>{spot.name}</p>
                    <img className='spot-image' src={`${spot.previewImage}`}></img>
                    <p>{`$${spot.price}`}</p>
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{spot.avgRating}</p>
                </div>
            )
            }
        </div>
        // <p>{spot.name}</p>
    )
}

export default AllSpots;
