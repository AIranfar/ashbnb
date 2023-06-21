import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { getAllReviews } from '../../store/reviews';
import ReviewFormModal from '../ReviewFormModal';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';
import EditReviewModal from '../EditReviewModal';
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

    // console.log('ReviewArr', reviewsArr)
    // console.log('SPOT--->', spot);
    // console.log('REVIEWSOBJ --->', allReviewsObj);
    // console.log('USER --->', sessionUser);

    useEffect(() => {
        dispatch(getOneSpot(spotId));
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

    // useEffect(() => {
    //     dispatch(getAllReviews(spotId))
    // }, [dispatch, spotId])

    if (!spot || !spot.name) {
        return (<h1>loading...</h1>)
    }

    function handleClick() {
        alert('Feature Coming Soon...')
    };

    if (!spot.Owner || !spot.SpotImages.length) {
        return (<div>Loading...</div>)
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

    // console.log('HELLO:', spotId)

    const dateString = (date) => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        return formattedDate
    }

    return (
        <div className='spot-container'>
            <div className='spot-details'>
                <div className='top-spot'>
                    <h1>{spot.name}</h1>
                    <div className='spot-images-div' />
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                    {spot.SpotImages.map(img => {
                        return <div className='images-container'>
                            <img className='spot-details-image' src={img.url} alt={spot.name} key={img.id} />
                            <div className='images-not-found-container'>
                                <img src='https://www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg' alt='no-image' className='image-not-found'></img>
                                <img src='https://www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg' alt='no-image' className='image-not-found'></img>
                                <img src='https://www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg' alt='no-image' className='image-not-found'></img>
                                <img src='https://www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg' alt='no-image' className='image-not-found'></img>
                            </div>
                        </div>
                    })}
                    <div className='big-small-box'>
                        <div className='hosted-by'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
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
                            <button id='reserve-button-id' onClick={handleClick}>RESERVE</button>
                        </div>
                    </div>
                    <div className='spot-description'>{spot.description}</div>
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
                                <p>{review.User?.firstName}</p>
                                <p>{dateString(review.createdAt)}</p>
                                <p>{review.review}</p>
                                {sessionUser && sessionUser.id === review.User?.id ? (
                                    <>
                                        <OpenModalButton
                                            className='delete-review-button'
                                            buttonText='Edit'
                                            modalComponent={<EditReviewModal reviewId={review.id} spotId={spotId} disabled={false} />}
                                        />
                                        <OpenModalButton
                                            className='delete-review-button'
                                            buttonText='Delete'
                                            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} disabled={false} />}
                                        />
                                    </>
) : null}

                            </div>
                        ) : 'Be the first to post a review'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;
