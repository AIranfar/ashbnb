import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import './ReviewFormModal.css';

const ReviewFormModal = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const newReview = useSelector(state => state)
    console.log('NEW REVIEW -->:', newReview);
    const { closeModal } = useModal();

    return (
        <div className='new-review-container'>
            <h2 className='title-header'>How was your stay?</h2>
            <textarea className="review-text-box"
                placeholder="Leave your review here" />
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
                Stars
            </div>
            <div className='submit-container'>
                <button className='submit-button' type="submit">Submit Your Review</button>
            </div>
        </div>
    )
}

export default ReviewFormModal;
