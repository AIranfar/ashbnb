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
        // console.log('I rerendered')
    };

    return (<div>
        {refreshPage ? (
            <p>Page is refreshing...</p>
        ) : (
            <div className='delete-spot-container'>
                <h1>Confirm Delete?</h1>
                <p>Please Confirm if you would like to delete this spot</p>
                <button class='yes-delete' onClick={handleSubmit}>Yes (Delete Spot)</button>
                <button class='no-keep' onClick={closeModal}>No (Keep Spot)</button>
            </div>
        )}
    </div>
    );
};

export default DeleteSpot;
