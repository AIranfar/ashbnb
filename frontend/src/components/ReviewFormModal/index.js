import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ReviewFormModal.css';

const ReviewFormModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    return (
        <div>
            <h2>How was your stay?</h2>
            <textarea
            placeholder="Leave your review here" />
            <div>
                <i class='fa-light fa-star'></i>
            </div>
            <div>
                <i class='fa-light fa-star'></i>
            </div>
            <div>
                <i class='fa-light fa-star'></i>
            </div>
            <div>
                <i class='fa-light fa-star'></i>
            </div>
            <div>
                <i class='fa-light fa-star'></i>
            </div>
        </div>
    )
}

export default ReviewFormModal;
