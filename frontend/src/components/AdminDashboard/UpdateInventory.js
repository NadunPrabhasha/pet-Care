import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const UpdateInventory = () => {

    const [inventoryData, setInventoryData] = useState({
        name: '',
        description: '',
        price: ''
    })

    const {itemID} = useParams();
    console.log(itemID)

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get(`http://localhost:3001/api/item_get/${itemID}`)
                setInventoryData({
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price
                })
            } catch (error){
                console.error("error finding item: ", error)
            }
        }
        fetchData()
    }, [])


    const handleChange = (e) => {
        const {name, value} = e.target
        setInventoryData({...inventoryData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.put(`http://localhost:3001/api/items_update/${itemID}`, inventoryData);
            // Reset form fields after successful submission
            window.location.href = '/AdminDashboard/OnlineStore'

        } catch (error){
            console.error('Error adding inventory :', error)
        }
    }

    return ( 
        <div className="createForm">
            <h1>Inventory Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="createFormInput">
                    <label htmlFor="name">Item Name :</label>
                    <input type="text" name="name" id="name" value={inventoryData.name} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="description">Item Description :</label>
                    <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange}  value={inventoryData.description}></textarea>
                </div>
                <div className="createFormInput">
                    <label htmlFor="price">Item Price :</label>
                    <input type="number" name="price" id="price" onChange={handleChange} value={inventoryData.price} />
                </div>
                <div className="createFormSubmit">
                    <button type="submit">Add to Inventory</button>
                </div>
            </form>
        </div>
     );
}
 
export default UpdateInventory;