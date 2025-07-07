import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './EventList';
import EventDetail from './EventDetail';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Upload from './Upload';
import CreateEvent from './CreateEvent';
import UserReview from './UserReview';
import AdminLogin from './AdminLogin';
import MeCheck from './MeCheck';
import SimpleLogin from './SimpleLogin';
import UserLogin from './UserLogin';
import CompleteProfile from './CompleteProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/review-users" element={<UserReview />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/me-check" element={<MeCheck />} />
                <Route path="/simple-login" element={<SimpleLogin />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
