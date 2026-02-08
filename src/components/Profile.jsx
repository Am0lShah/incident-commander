import React from 'react';
import { useAuth } from './AuthContext';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';

export default function Profile() {
    const { user } = useAuth();
    const tProfile = useDynamicTranslation('User Profile');
    const tAccountDetails = useDynamicTranslation('Account Details');
    const tEmail = useDynamicTranslation('Email');
    const tUserId = useDynamicTranslation('User ID');
    const tLastSignIn = useDynamicTranslation('Last Sign In');
    const tRole = useDynamicTranslation('Role');

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-purple-500/20">
                    {user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{tProfile}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-muted/30">
                    <h2 className="font-semibold flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        {tAccountDetails}
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {tEmail}
                            </label>
                            <div className="p-3 bg-secondary/50 rounded-lg font-mono text-sm break-all">
                                {user.email}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                {tRole}
                            </label>
                            <div className="p-3 bg-secondary/50 rounded-lg text-sm capitalize">
                                {user.role || 'Authenticated User'}
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {tUserId}
                            </label>
                            <div className="p-3 bg-secondary/50 rounded-lg font-mono text-xs break-all">
                                {user.id}
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {tLastSignIn}
                            </label>
                            <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
