import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createNewBooking, getUserBookings } from '../../store/bookings';
import './CreateBookingModal.css';

const CreateBooking = ({ spotId, spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // console.log('SPOTSPOT ->', spot)

  useEffect(() => {
    dispatch(getUserBookings())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
        spot,
        spotId,
        startDate,
        endDate
    }

    dispatch(createNewBooking(newBooking))
    closeModal()
    window.location.reload()
  };


  return (
    <div>
      <h1>Create a New Booking for {spot.name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBooking;
