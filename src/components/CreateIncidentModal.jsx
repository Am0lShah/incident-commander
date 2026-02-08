import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';

export default function CreateIncidentModal({ isOpen, onClose, onCreated }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });

    // Translate UI labels
    const tCreateIncident = useDynamicTranslation('Create Incident');
    const tTitle = useDynamicTranslation('Title');
    const tDescription = useDynamicTranslation('Description');
    const tPriority = useDynamicTranslation('Priority');
    const tLow = useDynamicTranslation('Low');
    const tMedium = useDynamicTranslation('Medium');
    const tHigh = useDynamicTranslation('High');
    const tCritical = useDynamicTranslation('Critical');
    const tSubmit = useDynamicTranslation('Submit');
    const tCancel = useDynamicTranslation('Cancel');
    const tFailed = useDynamicTranslation('Failed to create incident. Check console for details.');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('incidents')
                .insert([{
                    ...formData,
                    status: 'open',
                    language: 'en' // Default to English for source
                }]);

            if (error) throw error;

            onCreated();
            onClose();
            setFormData({ title: '', description: '', priority: 'medium' });
        } catch (error) {
            console.error('Error creating incident:', error);
            alert(tFailed);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-lg rounded-xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{tCreateIncident}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{tTitle}</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{tDescription}</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{tPriority}</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: 'low' })}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${formData.priority === 'low'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background hover:bg-muted border-input'
                                    }`}
                            >
                                {tLow}
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: 'medium' })}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${formData.priority === 'medium'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background hover:bg-muted border-input'
                                    }`}
                            >
                                {tMedium}
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: 'high' })}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${formData.priority === 'high'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background hover:bg-muted border-input'
                                    }`}
                            >
                                {tHigh}
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: 'critical' })}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${formData.priority === 'critical'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background hover:bg-muted border-input'
                                    }`}
                            >
                                {tCritical}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-colors text-sm font-medium"
                        >
                            {tCancel}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {tSubmit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
