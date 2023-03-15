import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { createASpot } from "../../store/spots";
import './CreateASpot.css';

const CreateASpot = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="input-box">
            <h2>Create a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact adderess once they book a reservation.</p>
            <form className='form-container' onSubmit={handleSubmit}>
                <label>Country</label>
                <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder="Country"
                    name="country"
                />
                <label>Street Address</label>
                <input
                    type="text"
                    onChange={(e) => setStreetAddress(e.target.value)}
                    value={streetAddress}
                    placeholder="Address"
                    name="Address"
                />
                <label>City</label>
                <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="City"
                    name="City"
                />
                ,
                <label>State</label>
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="State"
                    name="State"
                />
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
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    onChange={(e) => setPreviewImage(e.target.value)}
                    value={previewImage}
                    placeholder="Preview Image URL"
                    name="previewImage"
                />
                <br />
                <input
                    type="text"
                    onChange={(e) => setPreviewImage(e.target.value)}
                    value={previewImage}
                    placeholder="Image URL"
                    name="imageUrl"
                />
                <br />
                <input
                    type="text"
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder="Image URL"
                    name="imageUrl"
                />
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
                    <button class='submit-button' type="submit">Create Spot</button>
                </div>
            </form>
        </div>
    );
};

export default CreateASpot;
