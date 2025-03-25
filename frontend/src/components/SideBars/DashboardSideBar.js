import { NavLink } from "react-router-dom";

const DashboardSideBar = ({userDoc}) => {
    return ( 
        <>
            { userDoc && (
                <div className="sideBar">
                    <div className="sideBarLinks">
                        <div className="sideBarLink"><NavLink to="/DoctorDashboard/Appointments">Appointments</NavLink></div>
                        <div className="sideBarLink"><NavLink to="/DoctorDashboard/MedicalRecords">Medical Records</NavLink></div>
                        <div className="sideBarLink"><NavLink to="/DoctorDashboard/AddAvailableTime">Update Availability</NavLink></div>
                        <div className="sideBarLink"><NavLink to="/DoctorDashboard/ViewAvailableTime">Manage Availablity</NavLink></div>
                    </div>
                </div>
            )}
            { !userDoc && (
            <div className="sideBar">
                <div className="sideBarLinks">
                    <div className="sideBarLink"><NavLink to="/AdminDashboard/Doctors">Doctor Dashboard</NavLink></div>
                    <div className="sideBarLink"><NavLink to="/AdminDashboard/Clients">Clients Dashboard</NavLink></div>
                    <div className="sideBarLink"><NavLink to="/AdminDashboard/Pets">View pets</NavLink></div>
                    <div className="sideBarLink"><NavLink to="/AdminDashboard/OnlineStore">Online Store</NavLink></div>
                    <div className="sideBarLink"><NavLink to="/AdminDashboard/CagedPets">Add Caged pets</NavLink></div>
                    <div className="sideBarLink"><NavLink to="/AdminDashboard/ViewCagedPets">View Caged pets</NavLink></div>
                </div>
            </div>
            )}
        </>
     );
}
 
export default DashboardSideBar;