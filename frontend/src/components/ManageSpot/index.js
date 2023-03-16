import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotCurrentUser, getAllSpots } from "../../store/spots";
import { removeSpot } from "../../store/spots";
import { createASpot } from "../../store/spots";
import './ManageSpot.css';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        dispatch(getAllSpotCurrentUser());
    }, [dispatch])

    return (
        <h1>Manage Your Spots</h1>
    )
}

export default ManageSpots;
