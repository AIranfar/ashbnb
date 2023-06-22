import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/bookings";
import { getAllSpots } from "../../store/spots";
// import DeleteBookingModal from '../DeleteBookingModal';
// import EditBookingModal from '../EditBookingModal';
import './ManageBookings.css';

const ManageBookings = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userBookings = useSelector((state) => state.bookings.bookings)
    const userBookingsArr = Object.values(userBookings)

    console.log('USER Bookings-->', userBookingsArr)
    // console.log('ALL SPOTS-->', allSpotsArr)

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getUserBookings())
    }, [dispatch])

    return (
        <div>
            <h1 className="header-manage">Manage your Bookings</h1>
            <div>
                {/* {userReviewsArr.length ? userReviewsArr.reverse().map((review) =>
                <div key={review.id}>
                    <div>{review.user}</div>
                    {console.log('REVIEW USER-->', review)}
                </div>
                ) : 'You have no reviews'} */}
            </div>
        </div>
    )
}

export default ManageBookings;
