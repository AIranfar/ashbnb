import { useDispatch } from "react-redux";
import { removeSpot } from '../../store/spots';
import { useModal } from '../../context/Modal'
import './DeleteSpot.css';

const DeleteSpot = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(removeSpot(spotId))
        closeModal();
    };

    return (
        <div className='delete-spot-container'>
            <h1>Confirm Delete?</h1>
            <p>Please Confirm if you would like to delete this spot</p>
            <button class='yes-delete' onClick={handleSubmit}>Yes (Delete Spot)</button>
            <button class='no-keep' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
};

export default DeleteSpot;
