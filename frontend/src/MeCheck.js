import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MeCheck() {
    const [me, setMe] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found in localStorage.');
            return;
        }

        axios.get('http://localhost:1337/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setMe(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch /users/me');
            });
    }, []);

    if (error) return <p>{error}</p>;
    if (!me) return <p>Loading...</p>;

    return (
        <div>
            <h2>/users/me Info</h2>
            <pre>{JSON.stringify(me, null, 2)}</pre>
        </div>
    );
}

export default MeCheck;
