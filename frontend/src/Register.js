import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [preferredRole, setPreferredRole] = useState('');
    const [proofFile, setProofFile] = useState(null);
    const [boundUsername, setBoundUsername] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setProofFile(e.target.files[0]);
    };

    const uploadProofFile = async (token) => {
        const formData = new FormData();
        formData.append('files', proofFile);

        const res = await axios.post('http://localhost:1337/api/upload', formData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data[0]?.id;
    };

    const fetchUserIdByUsername = async (username, jwt) => {
        const res = await axios.get(`http://localhost:1337/api/users?filters[username][$eq]=${username}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return res.data[0]?.id || null;
    };

    const handleRegister = async () => {
        setMessage('');
        try {
            const registerRes = await axios.post('http://localhost:1337/api/auth/local/register', {
                username,
                email,
                password,
            });

            const userId = registerRes.data.user.id;
            const jwt = registerRes.data.jwt;


            const updatePayload = { preferredRole };

            if (preferredRole === 'disabled_person' && proofFile) {
                const mediaId = await uploadProofFile(jwt);
                updatePayload.proof = mediaId;
            }

            if (preferredRole === 'companion' && boundUsername) {
                const targetId = await fetchUserIdByUsername(boundUsername, jwt);
                if (targetId) {
                    updatePayload.companion = targetId;
                }
            }

            await axios.put(`http://localhost:1337/api/users/${userId}`, updatePayload, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setMessage('Registration successful!');
            navigate('/complete-profile', {
                state: {
                    jwt,
                    userId,
                    preferredRole,
                },
            });
        } catch (err) {
            console.error('Registration error:', err);
            const msg = err.response?.status
                ? `Update failed: ${err.response.status} — ${err.response.statusText}`
                : 'Registration failed.';
            setMessage(msg);
        }
    };

    return (
        <div className="event-list-container">
            <div className="event-card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2>Register</h2>

                <input
                    className="event-input"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="event-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="event-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select
                    className="event-input"
                    onChange={(e) => setPreferredRole(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Select Role</option>
                    <option value="disabled_person">Disabled Person</option>
                    <option value="companion">Companion</option>
                    <option value="event_organizer">Event Organizer</option>
                    <option value="location_owner">Location Owner</option>
                </select>

                {preferredRole === 'disabled_person' && (
                    <div>
                        <label>Upload Disability Proof:</label>
                        <input className="event-input" type="file" onChange={handleFileChange} />
                    </div>
                )}

                {preferredRole === 'companion' && (
                    <div>
                        <label>Disabled Person Username:</label>
                        <input
                            className="event-input"
                            type="text"
                            onChange={(e) => setBoundUsername(e.target.value)}
                        />
                    </div>
                )}

                <button className="detail-button" onClick={handleRegister}>
                    Register
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Register;
