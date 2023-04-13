import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { getAllReviews } from '../../store/reviews';
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const numReviews = useSelector(state => state.spots.singleSpot.numReviews);
    const allReviewsObj = useSelector(state => state.reviews.allReviews);
    const reviewsArr = Object.values(allReviewsObj);
    console.log('SPOT--->', spot)
    console.log('REVIEWSOBJ --->', allReviewsObj);
    console.log('REVIEWSARR --->', reviewsArr);

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

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

    return (
        <div className='spot-container'>
            <div className='top-spot'>
                <h1>{spot.name}</h1>
                <div className='spot-images-div' />
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                {spot.SpotImages.map(img => {
                    return <img className='spot-image' src={img.url} alt={spot.name} key={img.id}></img>
                })}
                <div className='big-small-box'>
                    <div className='hosted-by'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    <div className='small-box'>
                        <div className='price-reviews'>
                            <div id='spot-price'>
                                ${spot.price} Night
                            </div>
                            <div>
                                {rating(spot.avgRating)}
                            </div>
                            <div className='num-reviews'>
                                {numReviews && numReviews === 1 ? numReviews + ' review' : ''}
                                {numReviews && numReviews !== 1 ? numReviews + ' reviews' : ''}
                            </div>
                        </div>
                        <br />
                        <button id='reserve-button-id' onClick={handleClick}>RESERVE</button>
                    </div>
                </div>
                <div>{spot.description}</div>
                <br />
            </div>
            <div className='bottom-reviews'>
                <h2 className='star-num-reviews'>
                    {rating(spot.avgRating)} ·
                    {numReviews && numReviews === 1 ? numReviews + ' review' : null}
                    {numReviews && numReviews !== 1 ? numReviews + ' reviews' : null}
                </h2>
                <div className='all-reviews'>
                    {reviewsArr.length ? reviewsArr.map(review =>
                        <div className='each-review' key={review.id}>
                             <p>{review.User.firstName}</p>
                             <p>{review.createdAt}</p>
                             <p>{review.review}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;
