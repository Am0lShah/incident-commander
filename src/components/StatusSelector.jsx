import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';

const statusColors = {
    open: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    investigating: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    resolved: 'text-green-500 bg-green-500/10 border-green-500/20',
    critical: 'text-red-500 bg-red-500/10 border-red-500/20',
};

const options = [
    { value: 'open', label: 'Open' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'critical', label: 'Critical' },
];

const StatusOption = ({ option, isSelected, onClick }) => {
    const label = useDynamicTranslation(option.label);

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${isSelected
                    ? 'bg-secondary text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
        >
            <span className="uppercase text-xs tracking-wider">{label}</span>
            {isSelected && <Check className="w-4 h-4 text-primary" />}
        </button>
    );
};

export default function StatusSelector({ currentStatus, onStatusChange, updating }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Translate the current status for display
    const currentOptionLabel = options.find(o => o.value === currentStatus)?.label || currentStatus;
    const displayStatus = useDynamicTranslation(currentOptionLabel);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        onStatusChange(value);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                disabled={updating}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border outline-none focus:ring-2 focus:ring-primary/20 transition-all ${statusColors[currentStatus] || ''} cursor-pointer hover:opacity-80 disabled:opacity-50`}
            >
                <span>{displayStatus}</span>
                {updating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-1">
                        {options.map((option) => (
                            <StatusOption
                                key={option.value}
                                option={option}
                                isSelected={currentStatus === option.value}
                                onClick={() => handleSelect(option.value)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
