import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './EditBookingModal.css'
import { editBooking } from "../../store/bookings";

const EditBookingModal = ({ bookingId, spotId, spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const previousBooking = useSelector((state) => state.bookings.bookings[bookingId])
    const [startDate, setStartDate] = useState(previousBooking.startDate);
    const [endDate, setEndDate] = useState(previousBooking.endDate);

    console.log('previousBooking', previousBooking)

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBooking = {
            spotId,
            startDate,
            endDate
        }

        dispatch(editBooking(updatedBooking, bookingId))
        closeModal()
    }

    return (
        <div>
            <h1>Edit your booking for {spot.name}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="start-date">Start Date:</label>
                <input
                    type="date"
                    id="start-date"
                    value={previousBooking.startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="end-date">End Date:</label>
                <input
                    type="date"
                    id="end-date"
                    value={previousBooking.endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button type="submit">Edit Booking</button>
            </form>
        </div>
    );
}

export default EditBookingModal;
