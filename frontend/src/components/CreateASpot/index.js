import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { createASpot } from "../../store/spots";
import { useHistory } from 'react-router-dom';
import './CreateASpot.css';

const CreateASpot = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let allErrors = {};

        if (!country.length) allErrors.country = 'Country is required'
        if (!address.length) allErrors.address = 'Address is required'
        if (!city.length) allErrors.city = 'City is required'
        if (!state.length) allErrors.state = 'State is required'
        if (description.length < 30) allErrors.description = 'Description needs 30 or more characters'
        if (!name.length) allErrors.name = 'Name is required'
        if (!price.length) allErrors.price = 'Price is required'
        if (!previewImage.length) allErrors.image = 'Preview Image is required'
        if (!previewImage || previewImage === '') allErrors.previewImage = 'Preview image is required'
        if (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) allErrors.previewImages = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imageUrl !== "" && !imageUrl.endsWith('.png') && !imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg')) allErrors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imageUrl2 !== "" && !imageUrl2.endsWith('.png') && !imageUrl2.endsWith('.jpg') && !imageUrl2.endsWith('.jpeg')) allErrors.imageUrl2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imageUrl3 !== "" && !imageUrl3.endsWith('.png') && !imageUrl3.endsWith('.jpg') && !imageUrl3.endsWith('.jpeg')) allErrors.imageUrl3 = 'Image URL must end in .png, .jpg, or .jpeg'

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            previewImage
        };

        let photoArr = [];

        let previewImg = {
            url: previewImage,
            preview: true
        }

        photoArr.push(previewImg)

        if (imageUrl) {
            photoArr.push({
                url: imageUrl,
                preview: false
            });
        }
        if (imageUrl2) {
            photoArr.push({
                url: imageUrl2,
                preview: false
            });
        }
        if (imageUrl3) {
            photoArr.push({
                url: imageUrl3,
                preview: false
            });
        }

        const createdSpot = await dispatch(createASpot(newSpot, photoArr))
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`);
            return
        }
    };

    return (
        <div className="input-box">
            <h2>Create a new Spot</h2>
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
                            {errors.city ? <p className='errors-style'>{errors.city}</p> : null}
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
                <div class='photo-container'>
                    <div className='error-container'>
                        <label className='placement' />
                        {errors.address ? <p className='errors-style'>{errors.price}</p> : null}
                    </div>
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type="text"
                        onChange={(e) => setPreviewImage(e.target.value)}
                        value={previewImage}
                        placeholder="Preview Image URL"
                        name="previewImage"
                    />
                    <div className='error-container'>
                        <label className='placement' />
                        {errors.address ? <p className='errors-style'>{errors.previewImage}</p> : null}
                    </div>
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                        placeholder="Image URL"
                        name="imageUrl"
                    />
                    <div className='error-container'>
                            <label className='placement' />
                            {errors.address ? <p className='errors-style'>{errors.previewImages}</p> : null}
                        </div>
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setImageUrl2(e.target.value)}
                        value={imageUrl2}
                        placeholder="Image URL"
                        name="imageUrl2"
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setImageUrl3(e.target.value)}
                        value={imageUrl3}
                        placeholder="Image URL"
                        name="imageUrl3"
                    />
                    <br />
                    <br />
                </div>
                <div className='submit-container'>
                    <button className='submit-button' type="submit">Create Spot</button>
                </div>
            </form>
        </div>
    );
};

export default CreateASpot;
