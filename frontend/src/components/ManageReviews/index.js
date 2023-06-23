import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import OpenModalButton from "../OpenModalButton";
import { getUserReviews, deleteReview } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import DeleteReviewModal from '../DeleteReviewModal';
import EditReviewModal from '../EditReviewModal';
import './ManageReviews.css';

const ManageReviews = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userReviews = useSelector((state) => state.reviews.allReviews);
    const userReviewsArr = Object.values(userReviews);
    const allSpots = useSelector((state) => state.spots.allSpots);
    const allSpotsArr = Object.values(allSpots);

    const getSpotById = (spotId) => {
        return allSpotsArr.find(spot => spot.id === spotId)
    }

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getUserReviews(sessionUser.id))
    }, [dispatch])

    const dateString = (date) => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        return formattedDate
    }

    const renderStars = (stars) => {
        const starIcons = [];
        for (let i = 1; i <= stars; i++) {
            starIcons.push(<i key={i} className="fa-solid fa-star star-icon" />);
        }
        return starIcons;
    };

    return (
        <>
            <h1 className="header-manage">Manage Your Reviews</h1>
            <div className="manage-reviews-reviews">
                {userReviewsArr.length ? (
                    userReviewsArr.reverse().map((review) => {
                        const spot = getSpotById(review.spotId);
                        const spotId = review.Spot?.id
                        return (
                            <div className='manage-reviews-content-wrapper' key={review.id}>
                                <NavLink className='manage-reviews-navlink' to={`/spots/${spot?.id}`}>
                                    <div className="manage-reviews-spot-name">{spot?.name}</div>
                                    <img src={spot?.previewImage} className="manage-reviews-image" />
                                </NavLink>
                                <div className="manage-reviews-content">
                                    <div className="manage-reviews-date-review">
                                        <div>
                                            {renderStars(review.stars)}
                                            <i className="fa-solid fa-star star-icon" />
                                        </div>
                                        <div>{dateString(review.createdAt)}</div>
                                        <div className="manage-review-review-content">{review.review}</div>
                                    </div>
                                    <div className='review-actions-container'>
                                        <OpenModalButton
                                            className='edit-review-button'
                                            buttonText='Edit'
                                            modalComponent={<EditReviewModal reviewId={review.id} spotId={spotId} disabled={false} />}
                                        />
                                        <OpenModalButton
                                            className='delete-review-button'
                                            buttonText='Delete'
                                            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} disabled={false} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    'You have no reviews'
                )}
            </div>
        </>
    );
}

export default ManageReviews;
