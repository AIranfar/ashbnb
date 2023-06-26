import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getUserBookings } from "../../store/bookings";
import { getAllSpots } from "../../store/spots";
import DeleteBookingModal from '../DeleteBookingModal';
import EditBookingModal from '../EditBookingModal';
import OpenModalButton from "../OpenModalButton";
import './ManageBookings.css';

const ManageBookings = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.bookings);
  const allSpots = useSelector((state) => state.spots.allSpots);
  const allSpotsArr = Object.values(allSpots);
  const today = new Date();
  const [activeTab, setActiveTab] = useState('upcoming');

  const getSpotById = (spotId) => {
    return allSpotsArr.find((spot) => spot.id === spotId);
  };

  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(getUserBookings());
  }, [dispatch]);

  if (!userBookings) {
    return <h1>loading...</h1>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const sortedBookings = Object.values(userBookings).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredBookings = activeTab === 'upcoming'
    ? sortedBookings.filter(booking => new Date(booking.startDate) > today)
    : sortedBookings.filter(booking => new Date(booking.endDate) < today);

  return (
    <div className="manage-bookings-container">
      <h1 className="header-manage">Manage Your Bookings</h1>
      <div className="manage-bookings-tabs">
        <button className={`manage-bookings-tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => handleTabClick('upcoming')}>
          Upcoming
        </button>
        <button className={`manage-bookings-tab ${activeTab === 'past' ? 'active' : ''}`} onClick={() => handleTabClick('past')}>
          Past
        </button>
      </div>
      <div className="manage-bookings-bookings">
        {filteredBookings.length ? (
          filteredBookings.map((booking) => {
            const spot = getSpotById(booking.Spot.id);
            return (
              <div className="manage-bookings-content-wrapper" key={booking.id}>
                <NavLink className="manage-bookings-navlink" to={`/spots/${spot?.id}`}>
                  <img className="manage-bookings-image" src={spot?.previewImage} alt="Spot Preview" />
                </NavLink>
                <div className="manage-bookings-content">
                  <div className="manage-bookings-date-review">
                    <NavLink className="manage-bookings-navlink" to={`/spots/${spot?.id}`}>
                      <div className="manage-bookings-spot-name">{booking.Spot?.name}</div>
                    </NavLink>
                    <div className="manage-bookings-dates">Start Date: {formatDate(booking.startDate)}</div>
                    <div className="manage-bookings-dates">End Date: {formatDate(booking.endDate)}</div>
                  </div>
                  {activeTab === 'upcoming' && (
                    <div className="booking-actions-container">
                      <OpenModalButton
                        className="edit-booking-button"
                        buttonText="Edit"
                        modalComponent={<EditBookingModal bookingId={booking.id} spotId={spot?.id} spot={spot} disabled={false} />}
                      />
                      <OpenModalButton
                        className="delete-booking-button"
                        buttonText="Delete"
                        modalComponent={<DeleteBookingModal bookingId={booking.id} spotId={spot?.id} disabled={false} />}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          'You have no bookings.'
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
