import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotCurrentUser } from "../../store/spots";
import { NavLink, useParams } from 'react-router-dom';
import DeleteSpot from "../DeleteSpot"
import OpenModalButton from '../OpenModalButton'
import './ManageSpot.css';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    useEffect(() => {
        dispatch(getAllSpotCurrentUser())
    }, [dispatch])

    return (
        <div>
            <h1>Manage Spots</h1>
            <NavLink to='/spots/new'>
                <button>Create a New Spot</button>
            </NavLink>
            <div className='all-Spots'>
                {spots.map((spot) =>
                    <div className='spot-cards' key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className='spot-link'>
                            <p>{spot.name}</p>
                            <img className='spot-image' src={`${spot.previewImage}`}></img>
                            <div className='spot-price'>{`$${spot.price}`} Night</div>
                            <div>{`${spot.city}, ${spot.state}`}</div>
                            <div>{spot.avgRating}</div>
                        </NavLink>
                        <div className='update-delete'>
                            <NavLink to={`/spots/${spot.id}/edit`}>
                                <button className="update">Update</button>
                            </NavLink>
                            <OpenModalButton
                                className='delete-button'
                                buttonText="Delete"
                                modalComponent={<DeleteSpot spotId={spot.id} />}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageSpots;
