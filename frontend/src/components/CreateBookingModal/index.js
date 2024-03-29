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
  const [errors, setErrors] = useState([])
  const today = new Date().toISOString().split('T')[0];

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

    return dispatch(createNewBooking(newBooking))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        const errors = Object.values(data.errors)
        return setErrors(errors)
      })
  };

  return (
    <div className='new-booking-container'>
      <h2 className='new-booking-title-header'>Create a New Booking for {spot.name}</h2>
      <form onSubmit={handleSubmit} className='booking-form'>
        <div className='booking-signup-errors'>
          {errors.map((error, idx) => <div key={idx}>*{error}</div>)}
        </div>
        <div className='starting-date-container'>
          <label className='new-booking-start-date'>Start Date:</label>
          <input
            type="date"
            id="start-date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='ending-date-container'>
          <label className='new-booking-end-date'>End Date:</label>
          <input
            type="date"
            id="end-date"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className='booking-submit-container'>
          <button className='submit-booking-button' type="submit">Create Booking</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBooking;
