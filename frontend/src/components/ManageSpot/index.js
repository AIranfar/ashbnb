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
        <div>
            <h1 className='header-manage'>Manage Your Spots</h1>
            <NavLink to='/spots/new' className='manage-create-spot'>
                <button className="create-spot-button">Create a New Spot</button>
            </NavLink>
            <div className='manage-spots-container'>
                {spots.map((spot) =>
                    <div className='manage-spot-cards' key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className='manage-spot-link'>
                            <p>{spot.name}</p>
                            <img className='manage-spot-image' src={`${spot.previewImage}`}></img>
                            <div className='manage-location-price'>
                            <div>{`${spot.city}, ${spot.state}`}</div>
                            <div className="manage-avg-rating">{rating(spot.avgRating)}</div>
                            </div>
                            <div className='manage-spot-price'>{`$${spot.price}`} Night</div>
                        </NavLink>
                        <div className='manage-update-delete'>
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
