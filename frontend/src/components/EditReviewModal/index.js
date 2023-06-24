import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './EditReview.css';

const EditReview = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const previousReview = useSelector((state) => state.reviews.allReviews);
  const [review, setReview] = useState(previousReview[reviewId].review);
  const [stars, setStars] = useState(null);
  const [reviewButton, setReviewButton] = useState();
  const [hoveredStars, setHoveredStars] = useState(null);
  const numbers = [1, 2, 3, 4, 5];
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedReview = {
      review,
      stars,
    };

    dispatch(editReview(editedReview, reviewId, spotId));
    closeModal();
    window.location.reload();
  };

  const handleMouseOver = (num) => {
    setHoveredStars(num);
  };

  const handleMouseLeave = () => {
    setHoveredStars(null);
  };

  const changeClassName = (value) => {
    if (hoveredStars !== null) {
      return value <= hoveredStars ? 'fas fa-star star-hover cursor-pointer' : 'far fa-star cursor-pointer';
    }
    if (value <= stars) {
      return 'fas fa-star cursor-pointer';
    }
    return 'far fa-star cursor-pointer';
  };


  const disabledButton = () => {
    if (review.length < 10 || !stars) return true;
    return false;
  };

  useEffect(() => {
    if (review.length < 10 || !stars) {
      setReviewButton('review-button-disabled');
    } else setReviewButton('review-button-enabled');
  }, [stars, review]);

  return (
    <div className="edit-review-container">
      <h2 className="title-header">How was your stay?</h2>
      <form onSubmit={handleSubmit} className="edit-review-form">
        <textarea
          className="edit-review-text-box"
          type="text"
          rows="10"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
        <br />
        <div className="edit-review-stars" onMouseLeave={handleMouseLeave}>
          {numbers.map((value) => (
            <div key={value}>
              <i
                className={changeClassName(value)}
                onMouseOver={() => handleMouseOver(value)}
                onClick={() => setStars(value)}
              ></i>
            </div>
          ))}
          <div className="stars">Stars</div>
        </div>
        <div className="edit-review-submit-container">
          <button
            className="submit-review-button"
            id={reviewButton}
            type="submit"
            disabled={disabledButton()}
          >
            Update Your Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
