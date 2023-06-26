import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteBooking, getUserBookings } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import './DeleteBookingModal.css';

const DeleteBookingModal = ({ bookingId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [refreshPage, setRefreshPage] = useState(false)

    // console.log('ID--->', reviewId)
    const handleSubmit = () => {
        dispatch(deleteBooking(bookingId));
        closeModal();
        setRefreshPage(true);

    };

    return (
        <div className='delete-container'>
            {refreshPage ? (
                <p>Page is refreshing...</p>
            ) : (
                <div>
                    <h1 class='text'>Confirm Delete</h1>
                    <p>Are you sure you want to delete this booking?</p>
                    <button id='yes-delete' onClick={handleSubmit}>Yes (Delete Booking)</button>
                    <button id='no-keep' onClick={closeModal}>No (Keep Booking)</button>
                </div>
            )}
        </div>
    );
};

export default DeleteBookingModal;
