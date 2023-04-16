import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteReview } from "../../store/reviews";
import { useModal } from '../../context/Modal'
import './DeleteReviewModal.css';

const DeleteReviewModal = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    // const { reviewId } = useParams();
    console.log('ID--->', reviewId)
    const { closeModal } = useModal();
    const [refreshPage, setRefreshPage] = useState(false)

    const handleSubmit = () => {
        dispatch(deleteReview(reviewId, spotId));
        closeModal();
        setRefreshPage(true);
    };

    return (
        <div className='delete-container'>
            {refreshPage ? (
                <p>Page is refreshing...</p>
            ) : (
                <div>
                    <h1 class='text'>Confirm Delete</h1>
                    <p>Are you sure you want to delete this review?</p>
                    <button id='yes-delete' onClick={handleSubmit}>Yes (Delete Review)</button>
                    <button id='no-keep' onClick={closeModal}>No (Keep Review)</button>
                </div>
            )}
        </div>
    );
};

export default DeleteReviewModal;
