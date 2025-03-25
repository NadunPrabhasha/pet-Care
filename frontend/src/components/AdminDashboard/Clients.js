import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Clients = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/user_api/allusers");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const onDeleteButtonClick = async (userID) => {
        try {
            const response = await axios.delete(`http://localhost:3001/user_api/delete_profile_byID/${userID}`);
            console.log(response)
            window.location.href = window.location.href;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const filteredUsers =  users.filter(user => {
        return (
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nationalIdentityCardNumber.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
    })

    const hanldeGenerateReport = () => {
        html2canvas(document.getElementById('toPrint'), {backgroundColor: '#000'}).then(canvas => {
            let image = canvas.toDataURL('image/png')
            let doc = new jsPDF('p', 'px', [1920, 1080])
            doc.addImage(image, 'PNG', 50, 50, 1000, 400)
            doc.save()
        })
    }

    return ( 
        <>
            <div className="searchBar">
            </div>
            <div className="buttonCollection">
                <input type="text" name="userSearch" id="userSearch" placeholder="Search" onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm} />
                <button onClick={hanldeGenerateReport}>Print Report</button>
            </div>
            <table className="userDetailsTable" id="toPrint">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>NIC</th>
                        <th data-html2canvas-ignore="true"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.contactNumber}</td>
                            <td>{user.nationalIdentityCardNumber}</td>
                            <td data-html2canvas-ignore="true">
                                <button onClick={() => {onDeleteButtonClick(user._id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
     );
}
 
export default Clients;
