// CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
    const [form, setForm] = useState({
        Name: '',
        StartTime: '',
        EndTime: '',
        Website: '',
        Description: '',
        Tags: '',
        Language: '',
        MaxCap: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt'); // must already be logged in

        try {
            const response = await axios.post('http://localhost:1337/api/events', {
                data: {
                    ...form,
                    MaxCap: parseInt(form.MaxCap),
                    documentId: Math.random().toString(36).substr(2, 24) // simple unique id
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('Event created successfully!');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            setMessage('Event creation failed.');
        }
    };

    return (
        <div>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <input name="Name" placeholder="Name" onChange={handleChange} required />
                <input name="StartTime" type="datetime-local" onChange={handleChange} required />
                <input name="EndTime" type="datetime-local" onChange={handleChange} required />
                <input name="Website" placeholder="Website" onChange={handleChange} />
                <input name="Tags" placeholder="Tags (comma separated)" onChange={handleChange} />
                <input name="Language" placeholder="Language" onChange={handleChange} />
                <input name="MaxCap" type="number" placeholder="Max Capacity" onChange={handleChange} />
                <textarea name="Description" placeholder="Description" onChange={handleChange} />
                <button type="submit">Create Event</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreateEvent;
