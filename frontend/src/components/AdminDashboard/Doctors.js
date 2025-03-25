import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [editableDoctorId, setEditableDoctorId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:3001/doctor_api/doctors_get");
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleEdit = (doctorId) => {
        setEditableDoctorId(doctorId);
    };

    const handleSave = async (doctorId) => {
        const doctorToUpdate = doctors.find((doctor) => doctor._id === doctorId);
        console.log("Doctor to update:", doctorToUpdate);
        try {
            await axios.put(`http://localhost:3001/doctor_api/doctors_update/${doctorId}`, doctorToUpdate);
            setEditableDoctorId(null);
            // Refresh the doctors list
        } catch (error) {
            console.error("Error updating doctor:", error);
        }
    };
    
    

    const handleDelete = async (doctorId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this doctor?");
        if (!isConfirmed) return; // If user cancels deletion, exit the function
    
        try {
            await axios.delete(`http://localhost:3001/doctor_api/doctors_delete/${doctorId}`);
            setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };
    
    const filteredDoctors = doctors.filter(doctor => {
        return(
            doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.doctorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.doctorContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.doctorAddress.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="searchBar"></div>
            <div className="buttonCollection">
                <input type="text" name="doctorSearch" id="doctorSearch" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                <button onClick={() => {
                    let path = `/AdminDashboard/createDoctor`;
                    navigate(path);
                }}>
                    Create Doctor Account
                </button>
                <button onClick={hanldeGenerateReport}>Print Report</button>
            </div>
            <table className="userDetailsTable" id="toPrint">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Specialty</th>
                        <th>Address</th>
                        <th data-html2canvas-ignore="true"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.map((doctor) => (
                        <tr key={doctor._id}>
                            <td>
                                {editableDoctorId === doctor._id ? (
                                    <input
                                        type="text"
                                        value={doctor.name || doctor.doctorName}
                                        onChange={(e) => {
                                            // Update the doctor's name in the state
                                            setDoctors((prevDoctors) => {
                                                return prevDoctors.map((prevDoctor) => {
                                                    if (prevDoctor._id === doctor._id) {
                                                        return { ...prevDoctor, name: e.target.value };
                                                    }
                                                    return prevDoctor;
                                                });
                                            });
                                        }}
                                    />
                                ) : (
                                    doctor.name || doctor.doctorName
                                )}
                            </td>
                            <td>
                                {editableDoctorId === doctor._id ? (
                                    <input
                                        type="email"
                                        value={doctor.email || doctor.doctorEmail}
                                        onChange={(e) => {
                                            // Update the doctor's email in the state
                                            setDoctors((prevDoctors) => {
                                                return prevDoctors.map((prevDoctor) => {
                                                    if (prevDoctor._id === doctor._id) {
                                                        return { ...prevDoctor, email: e.target.value };
                                                    }
                                                    return prevDoctor;
                                                });
                                            });
                                        }}
                                    />
                                ) : (
                                    doctor.email || doctor.doctorEmail
                                )}
                            </td>
                            <td>
                                {editableDoctorId === doctor._id ? (
                                    <input
                                        type="text"
                                        value={doctor.phoneNumber || doctor.doctorContact}
                                        onChange={(e) => {
                                            // Update the doctor's phone number in the state
                                            setDoctors((prevDoctors) => {
                                                return prevDoctors.map((prevDoctor) => {
                                                    if (prevDoctor._id === doctor._id) {
                                                        return { ...prevDoctor, phoneNumber: e.target.value };
                                                    }
                                                    return prevDoctor;
                                                });
                                            });
                                        }}
                                    />
                                ) : (
                                    doctor.phoneNumber || doctor.doctorContact
                                )}
                            </td>
                            <td>
                                {editableDoctorId === doctor._id ? (
                                    <input
                                        type="text"
                                        value={doctor.specialty || doctor.doctorSpecialty}
                                        onChange={(e) => {
                                            // Update the doctor's specialty in the state
                                            setDoctors((prevDoctors) => {
                                                return prevDoctors.map((prevDoctor) => {
                                                    if (prevDoctor._id === doctor._id) {
                                                        return { ...prevDoctor, specialty: e.target.value };
                                                    }
                                                    return prevDoctor;
                                                });
                                            });
                                        }}
                                    />
                                ) : (
                                    doctor.specialty || doctor.doctorSpecialty
                                )}
                            </td>
                            <td>
                                {editableDoctorId === doctor._id ? (
                                    <input
                                        type="text"
                                        value={doctor.address || doctor.doctorAddress}
                                        onChange={(e) => {
                                            // Update the doctor's address in the state
                                            setDoctors((prevDoctors) => {
                                                return prevDoctors.map((prevDoctor) => {
                                                    if (prevDoctor._id === doctor._id) {
                                                        return { ...prevDoctor, address: e.target.value };
                                                    }
                                                    return prevDoctor;
                                                });
                                            });
                                        }}
                                    />
                                ) : (
                                    doctor.address || doctor.doctorAddress
                                )}
                            </td>
                            <td data-html2canvas-ignore="true">
                                {editableDoctorId === doctor._id ? (
                                    <button onClick={() => handleSave(doctor._id)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(doctor._id)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(doctor._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Doctors;
