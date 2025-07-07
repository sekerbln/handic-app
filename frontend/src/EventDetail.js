import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './EventDetail.css';

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const locale = i18n.language;

        fetch(`http://localhost:1337/api/events?filters[eventUid][$eq]=${id}&locale=${locale}`)
            .then(res => res.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    setEvent(data.data[0].attributes || data.data[0]);
                } else {
                    setEvent(null);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, [id, i18n.language]);

    if (loading) return <p>{t('loading')}</p>;
    if (!event) return <p>{t('eventNotFound')}</p>;


    const media = event.Media;
    const imageUrl = media?.data?.attributes?.formats?.thumbnail?.url || media?.data?.attributes?.url;

    return (
        <div className="event-detail-container">
            <div className="event-card">

                {imageUrl && (
                    <img
                        src={`http://localhost:1337${imageUrl}`}
                        alt={event.Name}
                        className="event-image"
                        style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
                    />
                )}

                <h2>{event.Name}</h2>
                <p><strong>{t('eventType')}:</strong> {event.EventType}</p>
                <p><strong>{t('tags')}:</strong> {event.Tags}</p>
                <p><strong>{t('language')}:</strong> {event.Language}</p>
                <p><strong>{t('maxCapacity')}:</strong> {event.MaxCap}</p>
                <p><strong>{t('start')}:</strong> {new Date(event.StartTime).toLocaleString()}</p>
                <p><strong>{t('end')}:</strong> {new Date(event.EndTime).toLocaleString()}</p>
                <p><strong>{t('website')}:</strong> <a href={event.Website} target="_blank" rel="noopener noreferrer">{event.Website}</a></p>
                <p><strong>{t('description')}:</strong> {event.Description}</p>


                {event.location?.street && (
                    <p>
                        <strong>{t('location')}:</strong>{' '}
                        {`${event.location.street || ''} ${event.location.number || ''}, ${event.location.zipCode || ''} ${event.location.city || ''}, ${event.location.country || ''}`}
                    </p>
                )}

                <Link to="/" className="detail-button">← {t('backToList')}</Link>
            </div>
        </div>
    );
}

export default EventDetail;
