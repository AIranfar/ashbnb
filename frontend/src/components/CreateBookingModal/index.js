import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal'

const CreateBooking = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const sessionUser = useSelector((state) => state.session.user)
    

    return(
        <div>
            <h1>Create a New Booking</h1>
        </div>
    )
}

export default CreateBooking;
