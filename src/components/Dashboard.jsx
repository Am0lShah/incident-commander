import React, { useEffect, useState } from 'react';
import { Plus, RefreshCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import IncidentList from './IncidentList';
import CreateIncidentModal from './CreateIncidentModal';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';

export default function Dashboard() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tTitle = useDynamicTranslation('Incident Commander');
    const tSubtitle = useDynamicTranslation('Real-time Command Center Operations');
    const tCreateIncident = useDynamicTranslation('Create Incident');
    const tOpen = useDynamicTranslation('Open');
    const tInvestigating = useDynamicTranslation('Investigating');
    const tResolved = useDynamicTranslation('Resolved');
    const tCritical = useDynamicTranslation('Critical');
    const tActiveIncidents = useDynamicTranslation('Active Incidents');
    const tLoading = useDynamicTranslation('Loading...');

    const fetchIncidents = React.useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('incidents')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching incidents:', error);
            // Fallback for demo if no Supabase connection
            // setIncidents(mockData); 
        } else {
            setIncidents(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchIncidents();

        // Real-time subscription
        const channel = supabase
            .channel('public:incidents')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, (payload) => {
                console.log('Real-time update received:', payload);
                fetchIncidents();
            })
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Real-time subscription active');
                } else if (status === 'CHANNEL_ERROR') {
                    console.error('Real-time subscription error');
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchIncidents]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{tTitle}</h1>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">{tSubtitle}</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={fetchIncidents}
                        className="p-2 rounded-lg hover:bg-secondary/80 text-muted-foreground transition-colors"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-5 h-5" />
                        {tCreateIncident}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {/* Stats Cards */}
                <div className="bg-card border border-border p-4 rounded-xl flex flex-col">
                    <span className="text-sm text-muted-foreground font-medium">{tOpen}</span>
                    <span className="text-xl md:text-2xl font-bold mt-1">
                        {incidents.filter(i => i.status === 'open').length}
                    </span>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl flex flex-col">
                    <span className="text-sm text-muted-foreground font-medium">{tInvestigating}</span>
                    <span className="text-xl md:text-2xl font-bold mt-1">
                        {incidents.filter(i => i.status === 'investigating').length}
                    </span>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl flex flex-col">
                    <span className="text-sm text-muted-foreground font-medium">{tResolved}</span>
                    <span className="text-xl md:text-2xl font-bold mt-1">
                        {incidents.filter(i => i.status === 'resolved').length}
                    </span>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl flex flex-col">
                    <span className="text-sm text-muted-foreground font-medium">{tCritical}</span>
                    <span className="text-xl md:text-2xl font-bold mt-1">
                        {incidents.filter(i => i.status === 'critical').length}
                    </span>
                </div>
            </div>

            <div className="pt-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    {tActiveIncidents}
                </h2>

                {loading && incidents.length === 0 ? (
                    <div className="py-20 flex justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-muted-foreground">{tLoading}</p>
                        </div>
                    </div>
                ) : (
                    <IncidentList incidents={incidents} />
                )}
            </div>

            <CreateIncidentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreated={fetchIncidents}
            />
        </div>
    );
}

