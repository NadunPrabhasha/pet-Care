import React, { useState, useEffect } from "react";
import axios from "axios";

const BookAppointment = () => {
    const [petName, setPetName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [time, setTime] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission status
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch doctors from the backend
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

    useEffect(() => {
        // Fetch available time slots based on selected doctor
        const fetchAvailableTimeSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/doctor_api/doctor_available_times/${doctorName}`);
                setAvailableTimeSlots(response.data);
            } catch (error) {
                console.error("Error fetching available time slots:", error);
            }
        };
    
        if (doctorName) {
            fetchAvailableTimeSlots();
        } else {
            setAvailableTimeSlots([]);
        }
    }, [doctorName]);

    const validateEmail = (email) => {
        // Simple email validation using regular expression
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateContactNumber = (contactNumber) => {
        // Simple validation for contact number (10 digits)
        return /^\d{10}$/.test(contactNumber);
    };

    const validateForm = () => {
        const errors = {};
        if (!petName.trim()) {
            errors.petName = "Pet name is required";
        }
        if (!validateEmail(email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!validateContactNumber(contactNumber)) {
            errors.contactNumber = "Please enter a valid 10-digit contact number";
        }
        if (!doctorName) {
            errors.doctorName = "Please select a doctor";
        }
        if (!time) {
            errors.time = "Please select a booking time";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch(name) {
            case "petName":
                setPetName(value);
                break;
            case "bookingEmail":
                setEmail(value);
                break;
            case "bookingContact":
                setContactNumber(value);
                break;
            case "doctorName":
                setDoctorName(value);
                break;
            case "bookingTime":
                setTime(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post("http://localhost:3001/appointment_api/appointments_add", {
                    petName,
                    email,
                    contactNumber,
                    doctorName,
                    time
                });
                setFormSubmitted(true); // Set form submission status to true
                alert("Appointment booked successfully!");
            } catch (error) {
                console.error("Error booking appointment:", error);
                alert("Failed to book appointment. Please try again.");
            }
        }
    };

    // Reset form after successful submission
    useEffect(() => {
        if (formSubmitted) {
            setPetName("");
            setEmail("");
            setContactNumber("");
            setDoctorName("");
            setTime("");
            setFormSubmitted(false);
        }
    }, [formSubmitted]);

    return (
        <div className="AppointmentsPage">
            <div className="appointmentBooking">
                <div className="appointmentBookingHeader">Book an Appointment</div>
                <div className="appointmentBookingForm">
                    <form onSubmit={handleSubmit}>
                        <div className="appointmentBookingFormInput">
                            <label htmlFor="petName">Pet Name :</label>
                            <input
                                type="text"
                                name="petName"
                                id="petName"
                                value={petName}
                                onChange={handleInputChange}
                            />
                            {errors.petName && <div className="error">{errors.petName}</div>}
                        </div>
                        <div className="appointmentBookingFormInput">
                            <label htmlFor="bookingEmail">Email :</label>
                            <input
                                type="email"
                                name="bookingEmail"
                                id="bookingEmail"
                                value={email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="error" style={{ color: "red" }}>{errors.email}</div>}
                        </div>
                        <div className="appointmentBookingFormInput">
                            <label htmlFor="bookingContact">Contact No :</label>
                            <input
                                type="text"
                                name="bookingContact"
                                id="bookingContact"
                                value={contactNumber}
                                onChange={handleInputChange}
                            />
                            {errors.contactNumber && <div className="error" style={{ color: "red" }}>{errors.contactNumber}</div>}
                        </div>
                        <div className="appointmentBookingFormInput">
                            <label htmlFor="doctorName">Doctor :</label>
                            <select
                                name="doctorName"
                                id="doctorName"
                                value={doctorName}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Doctor</option>
                                {doctors.map((doctor, index) => (
                                    <option key={index} value={doctor.name}>
                                        {doctor.doctorName}
                                    </option>
                                ))}
                            </select>
                            {errors.doctorName && <div className="error" style={{ color: "red" }}>{errors.doctorName}</div>}
                        </div>
                        <div className="appointmentBookingFormInput">
                            <label htmlFor="bookingTime">Booking Time :</label>
                            <select
                                name="bookingTime"
                                id="bookingTime"
                                value={time}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Time</option>
                                {availableTimeSlots.map((timeSlot, index) => (
                                    <option key={index} value={timeSlot.times}>
                                        {timeSlot.times}
                                    </option>
                                ))}
                            </select>
                            {errors.time && <div className="error" style={{ color: "red" }}>{errors.time}</div>}
                        </div>
                        <div className="appointmentBookingFormSubmit">
                            <button type="submit">Book Appointment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;