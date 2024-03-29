import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { editSpot, getOneSpot } from "../../store/spots";
import { useHistory } from 'react-router-dom';
import './EditSpot.css';

const EditSpot = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('SPOTS ---> ', spot)

    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if (spot) {
            setCountry(spot.country || '');
            setAddress(spot.address || '');
            setCity(spot.city || '');
            setState(spot.state || '');
            setDescription(spot.description || '');
            setName(spot.name || '');
            setPrice(Number(spot.price).toFixed(2) || '');
        }
    }, [spot]);

    useEffect(() => {
        dispatch(getOneSpot(id));
    }, [dispatch, id]);

    if (!spot) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let allErrors = {};

        if (!country.length) allErrors.country = 'Country is required'
        if (country.length > 40) allErrors.country = 'Country needs to be fewer than 40 characters'
        if (!address.length) allErrors.address = 'Address is required'
        if (address.length > 40) allErrors.address = 'Address needs to be fewer than 40 characters'
        if (!city.length) allErrors.city = 'City is required'
        if (city.length > 40) allErrors.city = 'City needs to be fewer than 40 characters'
        if (!state.length) allErrors.state = 'State is required'
        if (state.length > 40) allErrors.state = 'State needs to be fewer than 40 characters'
        if (description.length < 30) allErrors.description = 'Description needs to be 30 or more characters'
        if (description.length > 255) allErrors.description = 'Description needs to be less then 255 characters'
        if (!name.length) allErrors.name = 'Name is required'
        if (name.length > 40) allErrors.name = 'Name needs to be fewer than 40 characters'
        if (!price.length) allErrors.price = 'Price is required'
        if (price > 100001) allErrors.price = 'Price is too high'
        if (price < 1) allErrors.price = 'Price must be at least $1'

        if (Object.keys(allErrors).length > 0) {
            return setErrors(allErrors)
        }

        const updateSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price: parseFloat(price).toFixed(2)
        };

        const updatedSpot = await dispatch(editSpot(updateSpot, id))
        history.push(`/spots/${updatedSpot.id}`);
    };


    return (
        <div className="input-box">
            <h2>Update your Spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they book a reservation.</p>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='address-container'>
                    <div className='error-container'>
                        <label className='placement'>Country</label>
                        {errors.country ? <p className='errors-style'>{errors.country}</p> : null}
                    </div>
                    <input className='input-size'
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        placeholder="Country"
                        name="country"
                    />
                    <div className='error-container'>
                        <label className='placement'>Street Address</label>
                        {errors.address ? <p className='errors-style'>{errors.address}</p> : null}
                    </div>
                    <input className='input-size'
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder="Address"
                        name="address"
                    />
                    <div className='city-and-state'>
                        <div className='error-container'>
                            <label className='placement'>City</label>
                            {errors.address ? <p className='errors-style'>{errors.city}</p> : null}
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            placeholder="City"
                            name="City"
                        />
                        ,
                        <div className='error-container'>
                            <label className='placement'>State</label>
                            {errors.address ? <p className='errors-style'>{errors.state}</p> : null}
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            placeholder="State"
                            name="State"
                        />
                    </div>
                </div>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Please write at least 30 characters"
                    name="Desription"
                    rows="7"
                />
                <div className='error-container'>
                    {errors.address ? <p className='errors-style'>{errors.description}</p> : null}
                </div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.</p>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name of your Spot"
                    name="Name"
                />
                <br />
                <div className='error-container'>
                    <label className='placement' />
                    {errors.address ? <p className='errors-style'>{errors.name}</p> : null}
                </div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="$Price per night (USD)"
                    name="State"
                />
                <br />
                <div className='error-container'>
                    <label className='placement' />
                    {errors.price ? <p className='errors-style'>*{errors.price}</p> : null}
                </div>
                <div className='edit-spot-submit-container'>
                    <button class='submit-button' type="submit">Update your Spot</button>
                </div>
            </form>
        </div>
    );
};

export default EditSpot;
