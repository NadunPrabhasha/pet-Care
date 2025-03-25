import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import authService from '../../services/authservice'; // Import authService

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwdValid, setPwdValid] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Password validation
        setPwdValid(password.length >= 8);
        
        // Enable or disable submit button based on email and password validity
        setSubmitDisabled(!(pwdValid && email));
    }, [password, pwdValid, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate email and password again before submitting
        if (!pwdValid || !email) return;

        try {
            // Make POST request to your server endpoint
            const token = await authService.login(email, password); // Use authService for login
            
            if (token) {
                console.log("Login successful");
                setIsLoggedIn(true); // Update login state 
            } else {
                // Handle no token received
                console.error("No token received on login");
            }
        } catch (error) {
            // Handle login error
            console.error("Login failed", error);
        }
    };

  

    return (
        <div className="logInPage">
            <div className="logInPageForm">
                <form onSubmit={handleSubmit}>
                    <p>Log In</p>
                    <div className="logInPageFormInputGroup">
                        <label htmlFor="userEmail">Email : </label>
                        <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="logInPageFormInputGroup">
                        <label htmlFor="userPassword">Password : </label>
                        <input
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={submitDisabled}>
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
