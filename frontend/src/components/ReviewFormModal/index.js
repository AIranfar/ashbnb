import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewReview } from "../../store/reviews";
import './ReviewFormModal.css';

const ReviewFormModal = ({spotId}) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [reviewButton, setReviewButton] = useState();

    const { closeModal } = useModal();

    console.log('SPOTID', spotId)

    const handleSubmit = (e) => {
        e.preventDefault()

        const newReview = {
            review,
            stars
        }

        dispatch(addNewReview(newReview, spotId))
        .then(closeModal())
    };

    const handleClick = (num) => {
        setStars(num)
    }

    const changeClassName = (value) => {
        if (value <= stars) {
            return 'fa-solid fa-star'
        } else return 'fa-regular fa-star'
    }

    const disabledButton = () => {
        if (review.length < 10 || !stars) return true;
        return false;
    }

    useEffect(() => {
        if(review.length < 10 || !stars) {
            setReviewButton('review-button-disabled')
        } else setReviewButton('review-button-enabled')
    }, [stars, review])

    return (
        <div className='new-review-container'>
            <h2 className='title-header'>How was your stay?</h2>
            <form onSubmit={handleSubmit} className='review-form'>
                {/* <ul className='errors'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}
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
                        <i class={changeClassName(1)} onClick={() => handleClick(1)}></i>
                    </div>
                    <div>
                        <i class={changeClassName(2)} onClick={() => handleClick(2)}></i>
                    </div>
                    <div>
                        <i class={changeClassName(3)} onClick={() => handleClick(3)}></i>
                    </div>
                    <div>
                        <i class={changeClassName(4)} onClick={() => handleClick(4)}></i>
                    </div>
                    <div>
                        <i class={changeClassName(5)} onClick={() => handleClick(5)}></i>
                    </div>
                    <div className='stars'>Stars</div>
                </div>
                <div className='submit-container'>
                    <button id={reviewButton} type="submit" disabled={disabledButton()}>Submit Your Review</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewFormModal;
