import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const OnlineStore = () => {

    const [storeStocks, setStoreStocks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/items_get");
                setStoreStocks(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchItems();
    }, []);
    
    const navigate = useNavigate();

    const onDeleteButtonClick = async (itemID) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/items_delete/${itemID}`);
            window.location.href = window.location.href
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }


    const onUpdateButtonClick = (itemID) => {
        window.location.href = `/AdminDashboard/updateinventory/${itemID}`
    }

    const filteredStoreItems = storeStocks.filter(stock => {
        return(
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (stock.price + "").includes(searchTerm.toLowerCase())
        )
    })

    const hanldeGenerateReport = () => {
        html2canvas(document.getElementById('toPrint'), {backgroundColor: '#000'}).then(canvas => {
            let image = canvas.toDataURL('image/png')
            let doc = new jsPDF('p', 'px', [1920,1500])
            doc.addImage(image, 'PNG', 50, 50, 1400, 400)
            doc.save()
        })
    }

    return ( 
        <>
            <div className="searchBar">
            </div>
            <div className="buttonCollection">
                <input type="text" name="doctorSearch" id="doctorSearch" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                <button onClick={() =>{
                    let path = `/AdminDashboard/addInventory`; 
                    navigate(path);}}>
                        Add Item
                </button>
                <button onClick={hanldeGenerateReport}>Print Report</button>
            </div>
            <table className="userDetailsTable" id="toPrint">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Item Price</th>
                        <th data-html2canvas-ignore="true"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStoreItems.map((item)=> (
                        <tr key={item._id}>
                            <td><center>{item.name}</center></td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td data-html2canvas-ignore="true">
                                <button onClick={() => {onUpdateButtonClick(item._id)}}>Update</button>
                                <button onClick={() => {onDeleteButtonClick(item._id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
     );
}
 
export default OnlineStore;