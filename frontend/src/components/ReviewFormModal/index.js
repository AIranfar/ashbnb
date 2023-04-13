import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import './ReviewFormModal.css';

const ReviewFormModal = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null)
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const [reviewButton, setReviewButton] = useState();

    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(addNewReview({ review, spotId }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    const errors = Object.values(data.errors)
                    return setErrors(errors)
                }
            );
    };

    const disabledButton = () => {
        if (review.length < 10 || !stars) {
            return true
        } else return false
    }

    useEffect(() => {
        if(review.length < 10) {
            setReviewButton('review-button-disabled')
        } else setReviewButton('review-button-enabled')
    }, [rating, review])

    return (
        <div className='new-review-container'>
            <h2 className='title-header'>How was your stay?</h2>
            <form onSubmit={handleSubmit} className='review-form'>
                <ul className='errors'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <textarea
                    className="review-text-box"
                    type='text'
                    rows='10'
                    value={review}
                    placeholder="Leave your review here"
                    onChange={(e) => setReview(e.target.value)}
                />
                <br />
                <div className='review-stars'>
                    <div>
                        <span class="material-symbols-outlined">grade</span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined">grade</span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined">grade</span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined">grade</span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined">grade</span>
                    </div>
                    <p>Stars</p>
                </div>
                <div className='submit-container'>
                    <button id={reviewButton} type="submit" disabled={disabledButton()}>Submit Your Review</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewFormModal;
