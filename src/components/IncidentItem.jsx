import React, { useState } from 'react';
import { AlertCircle, Clock, Activity, MessageSquare, ChevronDown, Loader2 } from 'lucide-react';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';
import { supabase } from '../lib/supabase';
import ConfirmationModal from './ConfirmationModal';
import StatusSelector from './StatusSelector';

const statusColors = {
    open: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    investigating: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    resolved: 'text-green-500 bg-green-500/10 border-green-500/20',
    critical: 'text-red-500 bg-red-500/10 border-red-500/20',
};

const priorityIcons = {
    low: <Activity className="w-4 h-4 text-blue-400" />,
    medium: <Activity className="w-4 h-4 text-yellow-400" />,
    high: <AlertCircle className="w-4 h-4 text-orange-400" />,
    critical: <AlertCircle className="w-4 h-4 text-red-500" />,
};

const StatusLabel = ({ status }) => {
    switch (status) {
        case 'open': return <span>Open</span>;
        case 'investigating': return <span>Investigating</span>;
        case 'resolved': return <span>Resolved</span>;
        case 'critical': return <span>Critical</span>;
        default: return <span>{status}</span>;
    }
};

const PriorityLabel = ({ priority }) => {
    switch (priority) {
        case 'low': return <span>Low</span>;
        case 'medium': return <span>Medium</span>;
        case 'high': return <span>High</span>;
        case 'critical': return <span>Critical</span>;
        default: return <span>{priority}</span>;
    }
};

export default function IncidentItem({ incident }) {
    // Use the dynamic translation hook
    const title = useDynamicTranslation(incident.title);
    const description = useDynamicTranslation(incident.description);
    const [updating, setUpdating] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingStatus, setPendingStatus] = useState(null);

    const onStatusSelect = (newStatus) => {
        if (newStatus === incident.status) return;
        setPendingStatus(newStatus);
        setShowConfirm(true);
    };

    const handleConfirmStatusChange = async () => {
        if (!pendingStatus) return;

        setUpdating(true);
        try {
            const { error } = await supabase
                .from('incidents')
                .update({ status: pendingStatus })
                .eq('id', incident.id);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setUpdating(false);
            setPendingStatus(null);
        }
    };

    return (
        <>
            <div
                className="group relative rounded-xl border border-border bg-card p-4 md:p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${statusColors[incident.status]?.split(' ')[0].replace('text-', 'bg-') || 'bg-gray-500'}`} />

                <div className="pl-3 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                            <StatusSelector
                                currentStatus={incident.status}
                                onStatusChange={onStatusSelect}
                                updating={updating}
                            />

                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(incident.created_at).toLocaleTimeString()}
                            </span>
                        </div>

                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors break-words">
                            {title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl break-words">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-border/50 w-full md:w-auto mt-2 md:mt-0">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm font-medium">
                            {incident.priority && priorityIcons[incident.priority.toLowerCase()] ? priorityIcons[incident.priority.toLowerCase()] : priorityIcons.medium}
                            <span className="capitalize"><PriorityLabel priority={incident.priority} /></span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageSquare className="w-3 h-3" />
                            <span>0 Updates</span>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmStatusChange}
                title={useDynamicTranslation("Update Incident Status")}
                message={useDynamicTranslation(`Are you sure you want to change the status from "${incident.status.toUpperCase()}" to "${pendingStatus?.toUpperCase()}"?`)}
                confirmText={useDynamicTranslation("Yes, Update")}
                cancelText={useDynamicTranslation("No, Keep it")}
            />
        </>
    );
}
