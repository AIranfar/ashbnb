import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewReview } from "../../store/reviews";
import "./ReviewFormModal.css";

const ReviewFormModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);
  const [reviewButton, setReviewButton] = useState();
  const [hoveredStars, setHoveredStars] = useState(null);
  const numbers = [1, 2, 3, 4, 5]
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars
    };

    dispatch(addNewReview(newReview, spotId))
    closeModal();
  };

  const handleMouseOver = (num) => {
    setHoveredStars(num);
  };

  const handleMouseLeave = () => {
    setHoveredStars(null);
  };

  const changeClassName = (value) => {
    if (hoveredStars !== null) {
      return value <= hoveredStars
        ? "fas fa-star star-hover"
        : "far fa-star";
    }
    if (value <= stars) {
      return "fas fa-star";
    }
    return "far fa-star";
  };

  const disabledButton = () => {
    if (review.length < 10 || !stars) return true;
    return false;
  };

  useEffect(() => {
    if (review.length < 10 || !stars) {
      setReviewButton("review-button-disabled");
    } else setReviewButton("review-button-enabled");
  }, [stars, review]);


  return (
    <div className="new-review-container">
      <h2 className="title-header">How was your stay?</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          className="review-text-box"
          type="text"
          rows="10"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
        <br />
        <div
          className="review-stars"
          onMouseLeave={handleMouseLeave}
        >
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
        <div className="new-review-submit-container">
          <button
            className='submit-review-button'
            id={reviewButton}
            type="submit"
            disabled={disabledButton()}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewFormModal;
