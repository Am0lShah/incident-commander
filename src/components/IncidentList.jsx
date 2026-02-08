import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import IncidentItem from './IncidentItem';

export default function IncidentList({ incidents }) {

    if (incidents.length === 0) {
        return (
            <div className="text-center py-20 text-muted-foreground bg-card/50 rounded-xl border border-dashed border-border">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 opacity-50" />
                </div>
                <p>No active incidents.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {incidents.map((incident) => (
                <IncidentItem key={incident.id} incident={incident} />
            ))}
        </div>
    );
}

