import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserReview() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                if (!token) {
                    setMessage('No token found. Please login as admin.');
                    return;
                }

                const response = await axios.get('http://localhost:1337/api/users?populate=*', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Fetched users:', response.data); // ✅ 可选：调试查看结构

                // Strapi v5 返回的是数组而不是 { data: [...] }
                const pending = response.data.filter(user =>
                    user.preferredRole &&
                    user.role?.name === 'Authenticated'
                );

                setUsers(pending);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setMessage('Failed to load users');
            }
        };

        fetchPendingUsers();
    }, [token]);

    const roleIdMap = {
        disabled_person: 4,
        companion: 8,
        event_organizer: 3,
        location_owner: 6
    };

    const handleApprove = async (userId, preferredRole) => {
        try {
            const roleId = roleIdMap[preferredRole];
            if (!roleId) {
                setMessage('Invalid role mapping');
                return;
            }

            await axios.put(`http://localhost:1337/api/users/${userId}`, {
                role: roleId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage(`User ${userId} approved as ${preferredRole}`);
            setUsers(prev => prev.filter(u => u.id !== userId));
        } catch (error) {
            console.error('Approval failed:', error);
            setMessage('Approval failed');
        }
    };

    return (
        <div>
            <h2>Pending Role Approvals</h2>
            <p>{message}</p>
            {users.length === 0 ? (
                <p>No pending users.</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username} | {user.email} | Requested: <strong>{user.preferredRole}</strong>
                            <button onClick={() => handleApprove(user.id, user.preferredRole)}>Approve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserReview;
