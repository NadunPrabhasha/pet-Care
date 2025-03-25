import React, { useState } from "react";
import axios from "axios";

const CreateMedicalRecord = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [medicalRecord, setMedicalRecord] = useState({
        petName: '',
        date: '',
        diagnosis: '',
        treatment: '',
        weight: 0 // Assuming weight is a numeric value, initialized as 0
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate date field
        if (!medicalRecord.date.trim()) {
            setErrorMessage("Date is required.");
            return;
        }

        // Validate other form fields
        if (!medicalRecord.petName.trim()) {
            setErrorMessage("Pet name is required.");
            return;
        }
        if (!medicalRecord.diagnosis.trim()) {
            setErrorMessage("Diagnosis is required.");
            return;
        }
        if (!medicalRecord.treatment.trim()) {
            setErrorMessage("Treatment is required.");
            return;
        }
        if (medicalRecord.weight <= 0) {
            setErrorMessage("Weight should be a positive number.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/medicalRecord_api/add_record', medicalRecord);
            setSuccessMessage(response.data.message);
            // Reset form fields after successful submission
            setMedicalRecord({
                petName: '',
                date: '',
                diagnosis: '',
                treatment: '',
                weight: 0
            });
            setErrorMessage("");
        } catch (error) {
            console.error('Error adding medical record:', error);
            setErrorMessage("Failed to create medical record. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Ensure weight is stored as a number
        const newValue = name === 'weight' ? parseFloat(value) : value;
        setMedicalRecord({ ...medicalRecord, [name]: newValue });
    };

    return (
        <div className="createForm">
            <h1>Create Medical Record</h1>
            {successMessage && <div className="successMessage" style={{ color: 'green' }}>{successMessage}</div>}
            {errorMessage && <div className="errorMessage" style={{ color: 'red' }}>{errorMessage}</div>}
            <form onSubmit={handleFormSubmit}>
                <div className="createFormInput">
                    <label htmlFor="petName">Pet Name:</label>
                    <input type="text" id="petName" name="petName" value={medicalRecord.petName} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={medicalRecord.date} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="diagnosis">Diagnosis:</label>
                    <input type="text" id="diagnosis" name="diagnosis" value={medicalRecord.diagnosis} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="treatment">Treatment:</label>
                    <input type="text" id="treatment" name="treatment" value={medicalRecord.treatment} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="weight">Weight (kg):</label>
                    <input type="number" id="weight" name="weight" value={medicalRecord.weight} onChange={handleChange} />
                </div>
                <div className="createFormSubmit">
                    <button type="submit">Create Record</button>
                </div>
            </form>
        </div>
    );
};

export default CreateMedicalRecord;
