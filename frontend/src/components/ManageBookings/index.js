import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
// import DeleteBookingModal from '../DeleteBookingModal';
// import EditBookingModal from '../EditBookingModal';
import './ManageBookings.css';

const ManageBookings = () => {
    const dispatch = useDispatch();
    const userBookings = useSelector((state) => state.bookings.bookings)
    const userBookingsArr = Object.values(userBookings)

    console.log('USER Bookings-->', userBookings)

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    return (
        <div>
            <h1 className="header-manage">Manage your Bookings</h1>
            <div>
                {userBookingsArr.length ? userBookingsArr.reverse().map((booking) =>
                <div>
                    {console.log('BOOKING', booking.Spot)}
                    <div>{booking.Spot.name}</div>
                    <img className='manage-bookings-image' src={booking.Spot.previewImage} />
                    <div>{booking.startDate}</div>
                    <div>{booking.endDate}</div>
                </div>
                ) : 'You have no Bookings'}
            </div>
        </div>
    )
}

export default ManageBookings;
