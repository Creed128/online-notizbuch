import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:3002/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Please try a different username.');
            }

            const userData = await response.json();
            setUser({ isConnected: true, username: userData.username });
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h3>Register</h3>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
