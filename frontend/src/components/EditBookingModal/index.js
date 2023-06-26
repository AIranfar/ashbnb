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
        <div className="edit-booking-container">
            <h2 className='edit-booking-title-header'>Edit your booking for {spot.name}</h2>
            <form onSubmit={handleSubmit} className='booking-form'>
                <div className="starting-date-container">
                    <label className="edit-booking-start-date">Start Date:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={previousBooking.startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="ending-date-container">
                    <label className="edit-booking-end-date">End Date:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={previousBooking.endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="booking-submit-container">
                    <button className='submit-booking-button' type="submit">Edit Booking</button>
                </div>
            </form>
        </div>
    );
}

export default EditBookingModal;
