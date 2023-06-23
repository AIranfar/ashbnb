import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
// import DeleteBookingModal from '../DeleteBookingModal';
// import EditBookingModal from '../EditBookingModal';
import './ManageBookings.css';
import { getAllSpots } from "../../store/spots";

const ManageBookings = () => {
    const dispatch = useDispatch();
    const userBookings = useSelector((state) => state.bookings.bookings)
    const userBookingsArr = Object.values(userBookings)
    const allSpots = useSelector((state) => state.spots.allSpots);
    const allSpotsArr = Object.values(allSpots);

    // console.log('USER Bookings-->', userBookings)
    // console.log('ALLSPOTS', allSpotsArr)

    const getSpotById = (spotId) => {
        return allSpotsArr.find(spot => spot.id === spotId)
    }

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getUserBookings())
    }, [dispatch])

    return (
        <>
            <h1 className="header-manage">Manage Your Bookings</h1>
            <div className="manage-bookings-bookings">
                {userBookingsArr.length ? (
                    userBookingsArr.reverse().map((booking) => {
                        const spot = getSpotById(booking.Spot.id);
                        // console.log('booking', booking.Spot)
                        // console.log('spot', spot)
                        return (
                            <div key={booking.id}>
                                {/* { console.log('BOOKING', booking.Spot) } */}
                                <div>{booking.Spot.name}</div>
                                <img className='manage-bookings-image' src={spot?.previewImage} alt="Spot Preview" />
                                <div>{booking.startDate}</div>
                                <div>{booking.endDate}</div>
                            </div>
                        );
                    })
                ) : (
                    'You have no Bookings'
                )}
            </div>
        </>
    );
}

export default ManageBookings;
