import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ImageDropzone from './Dropzone/Dropzone';
import './index.css';

const CreateBillboard = ({ onCoordinatesSelect, coordinates }) => {
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function toLogin() {
        return navigate("/login");
    }

    const validateForm = () => {
        const errors = {};
        if (!address) errors.address = 'Address is required';
        if (!coordinates.longitude || !coordinates.latitude) errors.coordinates = 'Coordinates must be selected';
        if (!price || isNaN(price) || Number(price) <= 0) errors.price = 'Price must be a positive number';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('token')) {
            const formErrors = validateForm();
            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }

            try {

                const response = await fetch('https://billboards-backend.azurewebsites.net/api/Bord/AddBoard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        regLongitude: coordinates.longitude,
                        regLatitude: coordinates.latitude,
                        regAdress: address,
                        regDescription: description,
                        regDayCost: price,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok, ' + await response.text());
                }

                location.reload();

            } catch (error) {
                console.log(error);
            }
        } else {
            toLogin();
        }
    };

    const handleDrop = (acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handlePlaceMarker = () => {
        onCoordinatesSelect();
    };

    return (
        <form className="creation_panel" onSubmit={handleSubmit}>
            <p>Enter billboard data</p>
            <div className='select_address_container'>
                <input
                    type='text'
                    className='address_input'
                    placeholder='Billboard address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <span className="error">{errors.address}</span>}
                <p>and</p>
                <input
                    type='button'
                    className='place_marker'
                    value='place position on a map'
                    onClick={handlePlaceMarker}
                />
                <p className='coordinates'>lo.{coordinates.longitude ? coordinates.longitude : " waiting for placement"}</p>
                <p className='coordinates'>la.{coordinates.latitude ? coordinates.latitude : " waiting for placement"}</p>
                {errors.coordinates && <span className="error">{errors.coordinates}</span>}
            </div>
            <textarea
                className='billboard_description_input'
                placeholder='Billboard description'
                cols="40"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className='price_area'>
                <input
                    type='text'
                    className='billboard_price_input'
                    placeholder='Price/day'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <p>$</p>
                {errors.price && <span className="error">{errors.price}</span>}
            </div>
            <ImageDropzone files={files} onDrop={handleDrop} />
            <input type='submit' className='create_billboard_button' value='Apply' />
        </form>
    );
}

export default CreateBillboard;
