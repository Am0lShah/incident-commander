import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Settings } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationMenu from './NotificationMenu';
import { useAuth } from './AuthContext';

export default function Layout({ children }) {
    const { user, signOut } = useAuth();
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 py-3 md:h-16 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                            IncidentCommander
                        </span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
                        <LanguageSwitcher />

                        <div className="flex items-center gap-2 border-l border-border/40 pl-2 md:pl-4">
                            <NotificationMenu />
                            <button className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:flex">
                                <Settings className="w-5 h-5 text-muted-foreground" />
                            </button>

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link to="/profile" className="group flex items-center gap-2 hover:opacity-80 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform" title={user.email}>
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                                    ?
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-6 border-t border-border/40 text-center text-sm text-muted-foreground">
                <p>© 2026 Incident Commander. Powered by Lingo.dev</p>
            </footer>
        </div>
    );
}
