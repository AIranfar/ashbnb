import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeSpot } from '../../store/spots';
import { useModal } from '../../context/Modal'
import './DeleteSpot.css';

const DeleteSpot = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [refreshPage, setRefreshPage] = useState(false)

    const handleSubmit = () => {
        dispatch(removeSpot(spotId))
        (closeModal())
        (setRefreshPage(true));
    };

    return (
        <div className='delete-container'>
            {refreshPage ? (
                <p>Page is refreshing...</p>
            ) : (
                <div>
                    <h1 class='text'>Confirm Delete</h1>
                    <p>Are you sure you want to remove this spot?</p>
                    <button id='yes-delete' onClick={handleSubmit}>Yes (Delete Spot)</button>
                    <button id='no-keep' onClick={closeModal}>No (Keep Spot)</button>
                </div>
            )}
        </div>
    );
};

export default DeleteSpot;
