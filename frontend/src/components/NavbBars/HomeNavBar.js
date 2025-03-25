import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import authService from '../../services/authservice'; // Import authService
import { LuDog } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';

function LoggedOutNavBar() {
  return (
    <div className="navBar">
      <div className="navBarLogo"><LuDog /></div>
      <div className="navBarLinks">
        <div className="navBarLink"><Link to="/Client/">Home</Link></div>
        {/* <div className="navBarLink"><Link to="/Client/Store">Store</Link></div> */}
        <div className="navBarLink"><Link to="/Client/SignIn">Sign Up</Link></div>
        <div className="navBarLink"><Link to="/Client/LogIn">Log In</Link></div>
      </div>
    </div>
  );
}

function LoggedInNavBar() {

  const [profileData, setProfileData] = useState({})

  const handleLogout = () => {
    authService.logout(); // Call logout function from authService
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
          const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
          const config = {
              headers: {
                  "Authorization": `Bearer ${token}` // Adjust according to how your token is expected
              }
          };
  
          // Adjust the URL to your actual endpoint
          const response = await axios.get("http://localhost:3001/user_api/user_profile", config);
  
          setProfileData(response.data.user); // Adjust according to your response structure
          console.log(profileData)
      } catch (error) {
          console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, [])

  return (
    <div className="navBar">
      <div className="navBarLogo"><LuDog /></div>
      <div className="navBarLinks">
        <div className="navBarLink"><Link to="/Client/">Home</Link></div>
        <div className="navBarLink"><Link to="/Client/store">Store</Link></div>
        <div className="navBarLink"><Link to="/Client/BookAppointment">Book Appointment</Link></div>
        <div className="navBarLink"><Link to="/Client/ViewMyPets">Pets</Link></div>
        <div className="navBarProfile">
          <Link to="/Client/Profile" className="navBarProfileName">
            <div className="navBarProfileIcon"><CgProfile /></div>
            {profileData.fullName}
          </Link>
        </div>
        <div className="navBarLink"><button onClick={handleLogout}>Log Out</button></div>
      </div>
    </div>
  );
}

function HomeNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated()); // Check if user is authenticated
    console.log('isLoggedIn:', isLoggedIn); // Add this line to check the value
  }, [isLoggedIn]);
  

  return (
    <>
      {isLoggedIn ? <LoggedInNavBar /> : <LoggedOutNavBar />}
    </>
  );
}

export default HomeNavBar;
