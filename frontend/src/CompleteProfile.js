import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventList.css';

function CompleteProfile() {
    const location = useLocation();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [language, setLanguage] = useState('');
    const [message, setMessage] = useState('');

    const jwt = location.state?.jwt;
    const userId = location.state?.userId;

    useEffect(() => {
        if (!jwt || !userId) {
            setMessage('Unauthorized access. Please register again.');
        }
    }, [jwt, userId]);

    const handleSubmit = async () => {
        setMessage('');
        try {
            const payload = {
                firstName,
                lastName,
                birthday,
                language,
            };

            await axios.put(`http://localhost:1337/api/users/${userId}`, payload, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setMessage('Profile updated successfully!');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            console.error('Profile update error:', error);
            const msg = error.response?.status
                ? `Update failed: ${error.response.status} — ${error.response.statusText}`
                : 'Profile update failed.';
            setMessage(msg);
        }
    };

    return (
        <div className="event-list-container">
            <div className="event-card" style={{ width: '100%', maxWidth: '500px' }}>
                <h2>Complete Your Profile</h2>

                <input
                    className="event-input"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    className="event-input"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    className="event-input"
                    type="date"
                    placeholder="Birthday"
                    onChange={(e) => setBirthday(e.target.value)}
                />

                <select
                    className="event-input"
                    onChange={(e) => setLanguage(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Select Language</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>

                <button className="detail-button" onClick={handleSubmit}>
                    Submit
                </button>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default CompleteProfile;
