import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Info } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';

export default function NotificationMenu() {
    const { notifications, unreadCount, markAsRead, clearNotifications } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const tNotifications = useDynamicTranslation('Notifications');
    const tNoNotifications = useDynamicTranslation('No new notifications');
    const tClearAll = useDynamicTranslation('Clear all');

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => {
        if (!isOpen && unreadCount > 0) {
            markAsRead();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-muted transition-colors relative"
            >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive border-2 border-background rounded-full animate-pulse" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 border-b border-border flex items-center justify-between bg-muted/30">
                        <h3 className="font-semibold text-sm">{tNotifications}</h3>
                        {notifications.length > 0 && (
                            <button
                                onClick={clearNotifications}
                                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                            >
                                <Trash2 className="w-3 h-3" />
                                {tClearAll}
                            </button>
                        )}
                    </div>

                    <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                                <Bell className="w-8 h-8 opacity-20" />
                                <p>{tNoNotifications}</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/50">
                                {notifications.map((notif) => (
                                    <NotificationItem key={notif.id} notif={notif} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function NotificationItem({ notif }) {
    // Translate the title (e.g., "New Incident Reported", "Incident Updated")
    const translatedTitle = useDynamicTranslation(notif.title);

    return (
        <div className="p-3 hover:bg-muted/50 transition-colors flex gap-3 text-sm">
            <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${notif.read ? 'bg-muted-foreground/30' : 'bg-primary'}`} />
            <div className="space-y-1">
                <p className="font-medium leading-none">{translatedTitle}</p>
                <p className="text-muted-foreground text-xs line-clamp-2">{notif.message}</p>
                <p className="text-[10px] text-muted-foreground/70">{notif.time.toLocaleTimeString()}</p>
            </div>
        </div>
    );
}
