import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password,
            });

            localStorage.setItem('jwt', response.data.jwt);
            setMessage('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Login failed.');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin}>Login as Admin</button>
            <p>{message}</p>
        </div>
    );
}

export default AdminLogin;
