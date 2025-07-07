import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:1337/api/auth/local', form);
            const { jwt, user } = res.data;
            setMessage(`Login successful! Welcome, ${user.username}`);
            console.log('JWT:', jwt);
            console.log('User:', user);
            // You can store jwt in localStorage for future authenticated requests
            localStorage.setItem('jwt', jwt);
        } catch (err) {
            setMessage('Login failed: ' + err.response.data.error.message);
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="identifier" placeholder="Username or Email" onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
