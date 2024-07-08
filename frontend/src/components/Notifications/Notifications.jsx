import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/solid';

function NotificationsComponent({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen, userId]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/notifications/user/${userId}`);
            const notificationsWithQuotes = await Promise.all(response.data.slice(0, 5).map(async (notification) => {
                const quoteResponse = await axios.get(`http://localhost:5000/quotes/${notification.quote_id}`);
                return {
                    ...notification,
                    quoteText: quoteResponse.data.text,
                    quoteAuthor: quoteResponse.data.author,
                };
            }));
            setNotifications(notificationsWithQuotes);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`http://localhost:5000/notifications/${notificationId}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`http://localhost:5000/notifications/${notificationId}`);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed  z-10 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center overflow-auto"
                         style={{ maxHeight: '80vh' }}  // Set a maximum height for the modal
                         onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}> 
                            {notifications.map(notification => (
                                <div key={notification.id} className="my-6 p-4 border-b flex justify-between items-center gap-4">
                                    <div>
                                        <p className="text-custom-black">Citation du jour : {notification.quoteText} - {notification.quoteAuthor}</p>
                                        <p className="text-sm mt-2 text-gray-600">Reçu le {new Date(notification.date_sent).toLocaleDateString("fr-FR")}</p>
                                    </div>
                                    <div className="flex items-center">
                                        {notification.is_read ? (
                                            <EyeIcon className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-6 w-6 text-red-500 cursor-pointer"
                                                onClick={() => markAsRead(notification.id)}
                                            />
                                        )}
                                        <TrashIcon
                                            className="h-6 w-6 text-red-500 cursor-pointer ml-2"
                                            onClick={() => deleteNotification(notification.id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            onClick={onClose}
                        >
                            Fermer
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default NotificationsComponent;
