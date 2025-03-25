import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const MedicalRecords = () => {
    const navigate = useNavigate();
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getAllMedicalRecords = async () => {
            try {
                const response = await axios.get("http://localhost:3001/medicalRecord_api/get_all_records");
                setMedicalRecords(response.data);
            } catch (error) {
                console.error("Error getting medical records", error);
            }
        };
        getAllMedicalRecords();
    }, []);

    const handleDeleteButton = async (recordID) => {
        try {
            await axios.delete(`http://localhost:3001/medicalRecord_api/delete_record/${recordID}`);
            // Update medical records after deletion
            setMedicalRecords((prevRecords) => prevRecords.filter((record) => record._id !== recordID));
            navigate("/DoctorDashboard/MedicalRecords");
        } catch (error) {
            console.error("Error deleting medical record", error);
        }
    };

    const handleAddRecordButton = () => {
        navigate(`/DoctorDashboard/CreateMedicalRecord`);
    };

    const handleUpdateButton = (recordID) => {
        navigate(`/DoctorDashboard/UpdateMedicalRecord/${recordID}`);
    };

    const handleGenerateReport = () => {
        html2canvas(document.getElementById("toPrint")).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg");
            const pdf = new jsPDF("p", "px", [canvas.width, canvas.height]);
            pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
            pdf.save("medical_records.pdf");
        });
    };

    const filteredRecords = medicalRecords.filter((record) => {
        return (
            record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.treatment.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <div className="searchBar">
                <input
                    type="text"
                    name="doctorSearch"
                    id="doctorSearch"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className="buttonCollection">
                <button onClick={handleAddRecordButton}>Add Record</button>
                <button onClick={handleGenerateReport}>Print Report</button>
            </div>
            <table className="userDetailsTable" id="toPrint">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Date</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                        <th>Weight (kg)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record.petName}</td>
                            <td>{record.date}</td>
                            <td>{record.diagnosis}</td>
                            <td>{record.treatment}</td>
                            <td>{record.weight}</td>
                            <td>
                                <button onClick={() => handleUpdateButton(record._id)}>Update</button>
                                <button onClick={() => handleDeleteButton(record._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default MedicalRecords;
