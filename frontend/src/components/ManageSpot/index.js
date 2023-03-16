import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotCurrentUser } from "../../store/spots";
import { NavLink, Link, useParams } from 'react-router-dom';
import { removeSpot } from "../../store/spots";
import './ManageSpot.css';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const [openModal, setopenModal] = useEffect(false);
    const spots = Object.values(useSelector(state => state.spots.allSpots));

    useEffect(() => {
        dispatch(getAllSpotCurrentUser());
    }, [dispatch])

    if (!spots.length) return null;

    return (
        <div>
            <h1>Manage Your Spots</h1>
            <NavLink to='/spots/new'>
                <button>Create a New Spot</button>
            </NavLink>
            <div className='all-Spots'>
                {spots.map((spot) =>
                    <div className='spot-cards' key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className='spot-link'>
                            <p>{spot.name}</p>
                            <img className='spot-image' src={`${spot.previewImage}`}></img>
                            <div>{`$${spot.price}`} Night</div>
                            <div>{`${spot.city}, ${spot.state}`}</div>
                            <div>{spot.avgRating}</div>
                        </NavLink>
                        <NavLink to={`/spots/${spot.id}/edit`}>
                            <button>Update</button>
                        </NavLink>
                        <NavLink to={`/spots/${spot.id}/edit`}>
                            <button>Delete</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageSpots;
