import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgProfile, CgMathPlus } from "react-icons/cg";
import '../../styles/petAddCard.css'; // Import plus sign icon

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false); // State to track if fields are editable
    const [formData, setFormData] = useState({}); // State to store form data
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
    
                const response = await axios.get("http://localhost:3001/user_api/user_profile", config);
    
                setProfileData(response.data.user); // Adjust based on actual API response
                setFormData(response.data.user); // Pre-fill form with fetched data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Failed to fetch profile data."); // Provide error feedback
                setLoading(false);
            }
        };
    
        fetchProfileData();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleEdit = () => {
        setEditable(true); // Enable editing mode
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` // Adjust according to how your token is expected
                }
            };

            // Adjust the URL to your actual endpoint
            const response = await axios.put("http://localhost:3001/user_api/update_profile", formData, config);

            // Assuming the API returns the updated profile data
            setProfileData(response.data.user);
            setFormData(response.data.user);
            setEditable(false); // Disable editing mode after successful update
        } catch (error) {
            console.error("Error updating profile data:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` // Adjust according to how your token is expected
                }
            };

            // Adjust the URL to your actual endpoint
            await axios.delete("http://localhost:3001/user_api/delete_profile", config);

            localStorage.removeItem('token');
            // Redirect to login or home page after successful deletion
            navigate('/Client/Login'); // Adjust as needed

        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="ProfilePage">
            <div className="profilePageSideBar">
                <div className="profilePageSideBarProfilePic"><CgProfile /></div>
                {editable ? (
                    <input
                        type="text"
                        className="profilePageSideBarUsernameEditable"
                        name="fullName"
                        value={formData.fullName || ""}
                        onChange={handleInputChange}
                    />
                ) : (
                    <div className="profilePageSideBarUsername">{profileData.fullName || "Username"}</div>
                )}
                <div className="profilePageSideBarButtons">
                    <button className="profilePageSideBarEditButton" style={{backgroundColor:'#A1A1A1',color: '#FFF'}} onClick={handleEdit}>Edit</button>
                    <button className="profilePageSideBarDeleteButton" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="profilePageMainContent">
                <div className="profilePageMainContentHeader">
                    <p>Personal Information</p>
                    <hr />
                </div>
                <div className="profilePageMainContentDetails">
                    <div className="profilePageMainContentDetailsEmail">
                        <p>Email </p>
                        {editable ? (
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                readOnly
                            />
                        ) : (
                            <div>{profileData.email}</div>
                        )}
                    </div>
                    <div className="profilePageMainContentDetailsContact">
                        <p>Contact No. </p>
                        {editable ? (
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div>{profileData.contactNumber}</div>
                        )}
                    </div>
                    <div className="profilePageMainContentDetailsNIC">
                        <p>NIC </p>
                        {editable ? (
                            <input
                                type="text"
                                name="nationalIdentityCardNumber"
                                value={formData.nationalIdentityCardNumber}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div>{profileData.nationalIdentityCardNumber}</div>
                        )}
                    </div>
                    {editable && (
                        <button onClick={handleUpdate} style={{
                            backgroundColor:'#CFCFCF',
                            gridColumnStart: 1,
                            width: '30%',
                            padding: '10px 10px',
                            borderRadius: '8px'
                        }}>Update</button>
                    )}
                </div>
                <div className="profilePageMainContentHeader">
                    <p>Add Pets</p>
                    <hr />
                </div>
                {/* Add your pet information here */}
                <div className="profilePageMainContentAddButton">
                    <div className="profilePageMainContentAddButtonCard" onClick={() => {navigate('/Client/createPet')}} >
                        <CgMathPlus className="profilePageMainContentAddButtonIcon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
