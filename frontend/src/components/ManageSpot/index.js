import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotCurrentUser } from "../../store/spots";
import DeleteSpot from "../DeleteSpot";
import OpenModalButton from "../OpenModalButton";
import "./ManageSpot.css";

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
    const spotsArr = Object.values(spots)

    useEffect(() => {
        dispatch(getAllSpotCurrentUser());
    }, [dispatch]);

    const rating = (rating) => {
        if (typeof rating === "number") {
            return (
                <div>
                    <i className="fa-solid fa-star star-icon" />
                    {Number(rating).toFixed(1)}
                </div>
            );
        } else {
            return (
                <div>
                    <i className="fa-solid fa-star star-icon" /> New
                </div>
            );
        }
    };

    if (!spots) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="manage-spots-header-container">
                <h1 className="manage-spot-header-manage">Manage Your Spots</h1>
                <NavLink to="/spots/new" className="create-spot-button">
                    Create a New Spot
                </NavLink>
            </div>
            {spotsArr.length ? (
                <div className="manage-spots-container">
                    {spotsArr.map((spot) => (
                        <div className="manage-spot-cards" key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} className="manage-spot-link">
                                <p className="manage-spot-name">{spot.name}</p>
                                <img
                                    className="manage-spot-image"
                                    src={`${spot.previewImage}`}
                                    alt="Spot Preview"
                                />
                                <div className="manage-location-price">
                                    <div>{`${spot.city}, ${spot.state}`}</div>
                                    <div className="manage-avg-rating">{rating(spot.avgRating)}</div>
                                </div>
                                <div className="manage-spot-price">{`$${spot.price}`} Night</div>
                            </NavLink>
                            <div className="manage-update-delete">
                                <NavLink to={`/spots/${spot.id}/edit`}>
                                    <button className="update">Update</button>
                                </NavLink>
                                <OpenModalButton
                                    className="delete-button"
                                    buttonText="Delete"
                                    modalComponent={<DeleteSpot spotId={spot.id} />}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="manage-spots-message">
                    You currently have no spots available. Please create one!
                </div>
            )}
        </div>
    );
};

export default ManageSpots;
