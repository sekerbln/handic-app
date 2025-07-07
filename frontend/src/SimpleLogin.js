// frontend/src/SimpleLogin.js
import React, { useState } from 'react';
import axios from 'axios';

function SimpleLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });

            const token = res.data.jwt;
            localStorage.setItem('token', token);
            setMessage('✅ Login successful! Token saved to localStorage.');
        } catch (err) {
            console.error(err);
            setMessage('❌ Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Simple Login</h2>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: 'block', marginBottom: '1rem' }}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: 'block', marginBottom: '1rem' }}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
}

export default SimpleLogin;
