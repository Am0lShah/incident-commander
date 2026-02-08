import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/AuthContext';

const NotificationContext = createContext({
    notifications: [],
    unreadCount: 0,
    markAsRead: () => { },
    clearNotifications: () => { }
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setNotifications([]);
            return;
        }

        // Real-time subscription for new incidents
        const channel = supabase
            .channel('notifications')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'incidents' }, (payload) => {
                addNotification({
                    id: Date.now(), // temporary ID
                    type: 'new_incident',
                    title: 'New Incident Reported',
                    message: payload.new.title,
                    time: new Date(),
                    read: false
                });
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'incidents' }, (payload) => {
                // Avoid notifying if just created
                if (new Date(payload.new.created_at).getTime() === new Date(payload.new.last_modified).getTime()) return;

                addNotification({
                    id: Date.now(),
                    type: 'status_change',
                    title: 'Incident Updated',
                    message: `Status changed to ${payload.new.status}: ${payload.new.title}`,
                    time: new Date(),
                    read: false
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
        // Optional: Play sound or toast here
    };

    const markAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
