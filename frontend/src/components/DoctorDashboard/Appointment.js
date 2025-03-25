import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/appointment_api/appointments_get");
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteAppointment = async (appointmentId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this appointment?");
        if (!isConfirmed) return; // If user cancels deletion, exit the function

        try {
            await axios.delete(`http://localhost:3001/appointment_api/appointments_delete/${appointmentId}`);
            setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
            alert("Appointment deleted successfully!");
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("Failed to delete appointment. Please try again.");
        }
    };

    const handleAcceptAppointment = async (appointmentId) => {
        try {
            await axios.put(`http://localhost:3001/doctor_api/appointments/accept/${appointmentId}`);
            alert("Appointment accepted successfully!");
            // Refresh appointments after accepting
            const response = await axios.get("http://localhost:3001/appointment_api/appointments_get");
            setAppointments(response.data);
        } catch (error) {
            console.error("Error accepting appointment:", error);
            alert("Failed to accept appointment. Please try again.");
        }
    };

    const handleGenerateReport = () => {
        html2canvas(document.getElementById('toPrint'), {backgroundColor: '#000'}).then(canvas => {
            let image = canvas.toDataURL('image/png')
            let doc = new jsPDF('p', 'px', [1920,1200])
            doc.addImage(image, 'PNG', 50, 50, 1125, 380)
            doc.save()
        })
    };

    const filteredAppointments = appointments.filter(appointment => {
        return (
            appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.contactNumber.includes(searchTerm) ||
            appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.time.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <div className="searchBar" >
                
            </div>
            <div className="buttonCollection">
            <style>
                {`@media print {.userDetailsTable{background: black;}}`}
            </style>
                <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{borderRadius:'45px' , marginLeft:'700px' }}/>
                <button onClick={handleGenerateReport}>Print Report</button>
            </div>
            <table className="userDetailsTable" id="toPrint">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Doctor Name</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th data-html2canvas-ignore="true">Actions</th>
                    </tr>
                </thead>
                <tbody className="tbodyPrint">
                    {filteredAppointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.petName}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.contactNumber}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.status}</td>
                            <td data-html2canvas-ignore="true">
                                <button onClick={() => handleAcceptAppointment(appointment._id)}>Accept</button>
                                <button onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Appointments;
