import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { getAllReviews } from '../../store/reviews';
import ReviewFormModal from '../ReviewFormModal';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewSpotPage from '../DeleteSpotPageReview';
import EditReviewSpotPage from '../EditSpotPageReview';
import CreateBookingModal from '../CreateBookingModal'
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const numReviews = useSelector(state => state.spots.singleSpot.numReviews);
    const allReviewsObj = useSelector(state => state.reviews.allReviews);
    const reviewsArr = Object.values(allReviewsObj);
    const sessionUser = useSelector(state => state.session.user);

    function renderPost() {
        return reviewsArr.find(review => review.userId === sessionUser.id)
    }
    // console.log('singleReview ->')

    useEffect(() => {
        dispatch(getOneSpot(spotId));
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

    if (!spot || !spot?.name) {
        return (<h1>Loading...</h1>)
    }

    if (!spot?.Owner || !spot?.SpotImages.length) {
        return (<h1>Loading...</h1>)
    }

    const rating = (rating) => {
        if (typeof rating === 'number') {
            return (
                <div>
                    <i className='fa-solid fa-star star-icon' />
                    {Number(rating).toFixed(1)}
                </div>
            )
        }
        else return 'New';
    }

    const renderStars = (stars) => {
        const maxStars = 5
        const starIcons = [];
        for (let i = 0; i < maxStars; i++) {
            if (i < stars) {
                starIcons.push(<i key={i} className="fa-solid fa-star star-icon" />);
            }
        }
        return starIcons;
    };

    const dateString = (date) => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        return formattedDate
    }

    const imageArraySlice = (arr) => {
        return arr.slice(1)
    }

    return (
        <div className='spot-container'>
            <div className='spot-details'>
                <div className='top-spot'>
                    <h1>{spot.name}</h1>
                    <div className='spot-images-div' />
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                    <div className='spot-details-image-container'>
                        <img className='spot-details-first-image' src={spot.SpotImages[0].url} />
                        <div className='images-container'>
                            {imageArraySlice(spot.SpotImages).map(img => {
                                return <img className='spot-details-image' src={img.url} alt={spot.name} key={img.id} />
                            })}
                        </div>
                    </div>
                    <div className='spot-details-name-description-reserve'>
                        <div className='spot-details-name-description'>
                        <div className='hosted-by'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                        <div className='spot-description'>{spot.description}</div>
                        </div>
                        <div className='small-box'>
                            <div className='price-reviews'>
                                <div id='spot-price'>
                                    ${spot.price} Night
                                </div>
                                <div className='rating-review'>
                                    <div className='average-rating'>
                                        {rating(spot.avgRating)}
                                    </div>
                                    {reviewsArr.length ? <div>·</div> : null}
                                    <div className='num-reviews'>
                                        {numReviews && numReviews === 1 ? numReviews + ' review' : ''}
                                        {numReviews && numReviews !== 1 ? numReviews + ' reviews' : ''}
                                    </div>
                                </div>
                            </div>
                            {sessionUser?.id !== spot.ownerId ?
                                <OpenModalButton
                                    className='reserve-button-id'
                                    buttonText='Reserve this spot'
                                    modalComponent={<CreateBookingModal spotId={spotId} spot={spot} />}
                                /> :
                                <NavLink to={`/spots/${spot.id}/edit`}>
                                    <button className="reserve-button-id">Update Spot Details</button>
                                </NavLink>
                            }
                        </div>
                    </div>
                </div>
                <div className='bottom-reviews'>
                    <h2 className='star-num-reviews'>
                        {rating(spot.avgRating)}
                        {reviewsArr.length ? <div>·</div> : null}
                        {numReviews && numReviews === 1 ? numReviews + ' review' : null}
                        {numReviews && numReviews !== 1 ? numReviews + ' reviews' : null}
                    </h2>
                    {sessionUser && sessionUser.id !== spot.Owner.id && !renderPost() && (
                        <div>
                            <OpenModalButton
                                className='post-new-review-button'
                                buttonText='Post Your Review'
                                modalComponent={<ReviewFormModal spotId={spotId} />}
                            />
                        </div>)}
                    <br />
                    <div className='all-reviews'>
                        {reviewsArr.length ? reviewsArr.reverse().map(review =>
                            <div className='each-review' key={review.id}>
                                {/* {console.log('REVIEWWWW-------->', review)} */}
                                <div className='spot-details-review-name-stars'>
                                    <p>{review.User?.firstName}</p>
                                    <p className='spot-details-stars'>{renderStars(review.stars)}</p>
                                </div>
                                <p>{dateString(review.createdAt)}</p>
                                <p>{review.review}</p>
                                {sessionUser && sessionUser.id === review.User?.id ? (
                                    <div className='review-actions-container'>
                                        <OpenModalButton
                                            className='edit-review-button'
                                            buttonText='Edit'
                                            modalComponent={<EditReviewSpotPage reviewId={review.id} spotId={spotId} disabled={false} />}
                                        />
                                        <OpenModalButton
                                            className='delete-review-button'
                                            buttonText='Delete'
                                            modalComponent={<DeleteReviewSpotPage reviewId={review.id} spotId={spotId} disabled={false} />}
                                        />
                                    </div>
                                ) : null}

                            </div>
                        ) : <div className='no-review-text'>Be the first to post a review</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;
