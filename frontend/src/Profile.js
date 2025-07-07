import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:1337/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };

        fetchUser();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
        alert('Logged out successfully');
    };

    if (!token) return <p>Please log in to view your profile.</p>;

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
