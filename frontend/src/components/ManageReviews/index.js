import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { getUserReviews } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import DeleteReviewModal from '../DeleteReviewModal';
import EditReviewModal from '../EditReviewModal';
import './ManageReviews.css';
import { useEffect } from "react";

const ManageReviews = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const userReviews = useSelector((state) => state.reviews.allReviews)
    const userReviewsArr = Object.values(userReviews)
    const allSpots = useSelector((state) => state.spots.allSpots)
    const allSpotsArr = Object.values(allSpots)

    console.log('USER REVIEWS-->', userReviewsArr)
    console.log('ALL SPOTS-->', allSpotsArr)

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getUserReviews(sessionUser.id))
    }, [dispatch])

    const dateString = (date) => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        return formattedDate
    }

    return (
        <div>
            <h1 className="header-manage">Manage your Reviews</h1>
            <div>
                {userReviewsArr.length ? userReviewsArr.reverse().map((review) =>
                <div key={review.id}>
                    {/* <div>{review.user}</div> */}
                    {console.log('REVIEW USER-->', review)}
                </div>
                ) : 'You have no reviews'}
            </div>
        </div>
    )
}

export default ManageReviews;
