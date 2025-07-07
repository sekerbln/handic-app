import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './EventList.css';

function EventList() {
    const { t, i18n } = useTranslation();
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const currentLocale = i18n.language;
                const res = await axios.get(`http://localhost:1337/api/events?populate=Media&locale=${currentLocale}`);
                setEvents(res.data.data || []);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await axios.get('http://localhost:1337/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
            } catch (err) {
                console.error('Failed to fetch user info:', err);
            }
        };

        fetchEvents();
        fetchUser();
    }, [i18n.language]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/user-login');
    };

    return (
        <div>
            <div className="navbar">
                <div className="app-title">HANDIC APP</div>
                <div className="navbar-right">
                    <LanguageSwitcher />
                    <button className="top-button" onClick={() => navigate('/profile')}>
                        {t('viewProfile')}
                    </button>
                    <button className="top-button" onClick={handleLogout}>
                        {t('logout')}
                    </button>
                </div>
            </div>

            <div className="event-list-container">
                <h1>{t('eventList')}</h1>
                {loading ? (
                    <p>{t('loading')}</p>
                ) : events.length === 0 ? (
                    <p>{t('noEvents')}</p>
                ) : (
                    <ul className="event-list-grid">
                        {events.map((event) => {
                            const media = event.Media;
                            const imageUrl = media?.formats?.thumbnail?.url || media?.url;

                            return (
                                <li key={event.id} className="event-card">
                                    {imageUrl && (
                                        <img
                                            src={`http://localhost:1337${imageUrl}`}
                                            alt={event.Name}
                                            className="event-image"
                                        />
                                    )}
                                    <strong>{event.Name || t('noName')}</strong><br />
                                    <p>{t('start')}: {new Date(event.StartTime).toLocaleString()}</p>
                                    <p>
                                        {event.Description
                                            ? event.Description.slice(0, 100) + (event.Description.length > 100 ? '...' : '')
                                            : t('noDescription')}
                                    </p>
                                    {event.location && (
                                        <p>
                                            <strong>{t('location')}:</strong>{' '}
                                            {`${event.location.street || ''} ${event.location.number || ''}, ${event.location.zipCode || ''} ${event.location.city || ''}, ${event.location.country || ''}`}
                                        </p>
                                    )}
                                    <Link to={`/event/${event.eventUid}`} className="detail-button">
                                        {t('viewDetails')}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default EventList;
