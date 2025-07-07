import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password
            });

            localStorage.setItem('jwt', response.data.jwt);
            setMessage('✅ Login successful!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
            const errorMsg = error.response?.data?.error?.message || 'Unknown error';
            setMessage(`❌ Login failed: ${errorMsg}`);
        }
    };

    return (
        <div className="register-container">
            <h2 className="form-title">User Login</h2>
            <input
                type="email"
                className="register-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="register-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="register-button">
                Login
            </button>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
}

export default UserLogin;
