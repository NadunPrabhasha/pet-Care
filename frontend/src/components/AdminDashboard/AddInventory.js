import { useState } from "react";
import axios from "axios";

const AddInventory = () => {
    const [inventoryData, setInventoryData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!inventoryData.name.trim()) {
            newErrors.name = 'Item name is required !';
            valid = false;
        }

        if (!inventoryData.description.trim()) {
            newErrors.description = 'Item description is required !';
            valid = false;
        }

        if (!inventoryData.price) {
            newErrors.price = 'Item price is required !';
            valid = false;
        } else if (isNaN(inventoryData.price) || parseFloat(inventoryData.price) <= 0) {
            newErrors.price = 'Item price must be a valid number greater than 0 !';
            valid = false;
        }

        if (!inventoryData.image.trim()) {
            newErrors.image = 'Image URL is required !';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3001/api/items_add', inventoryData);
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                // Reset form fields after successful submission
                setInventoryData({
                    name: '',
                    description: '',
                    price: '',
                    image: ''
                });
            } catch (error) {
                console.error('Error adding inventory:', error);
                setSuccessMessage('');
                setErrorMessage('Failed to add inventory. Please try again.');
            }
        }
    };

    return (
        <div className="createForm">
            <h1>Inventory Details</h1>
            {successMessage && <div className="successMessage" style={{ color: 'green' }}>{successMessage}</div>}
            {errorMessage && <div className="errorMessage" style={{ color: 'red' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="createFormInput">
                    <label htmlFor="name">Item Name :</label>
                    <input type="text" name="name" id="name" value={inventoryData.name} onChange={handleChange} />
                    {errors.name && <div className="error" style={{ color: 'yellow' }}>{errors.name}</div>}
                </div>
                <div className="createFormInput">
                    <label htmlFor="description">Item Description :</label>
                    <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} value={inventoryData.description}></textarea>
                    {errors.description && <div className="error" style={{ color: 'yellow' }}>{errors.description}</div>}
                </div>
                <div className="createFormInput">
                    <label htmlFor="price">Item Price :</label>
                    <input type="text" name="price" id="price" onChange={handleChange} value={inventoryData.price} />
                    {errors.price && <div className="error" style={{ color: 'yellow' }}>{errors.price}</div>}
                </div>
                <div className="createFormInput">
                    <label htmlFor="name">Image :</label>
                    <input type="text" name="image" id="image" value={inventoryData.image} onChange={handleChange} />
                    {errors.image && <div className="error" style={{ color: 'yellow' }}>{errors.image}</div>}
                </div>
                <div className="createFormSubmit">
                    <button type="submit">Add to Inventory</button>
                </div>
            </form>
        </div>
    );
}

export default AddInventory;
