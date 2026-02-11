import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButton {
    icon: React.ReactNode;
    label: string;
    href: string;
    color: string;
}

const actions: ActionButton[] = [
    {
        icon: <Phone className="w-5 h-5" />,
        label: 'Call Us',
        href: 'tel:+994501234567',
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: <MessageCircle className="w-5 h-5" />,
        label: 'WhatsApp',
        href: 'https://wa.me/994501234567',
        color: 'from-green-600 to-green-500'
    },
    {
        icon: <Mail className="w-5 h-5" />,
        label: 'Email',
        href: 'mailto:info@citycar-azerbaijan.com',
        color: 'from-blue-500 to-cyan-500'
    }
];

const FloatingActionButton: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-28 right-8 z-40">
            {/* Action Buttons */}
            {isExpanded && (
                <div className="mb-4 space-y-3 animate-slide-up">
                    {actions.map((action, index) => (
                        <div
                            key={action.label}
                            className="flex items-center gap-3 animate-slide-in-right"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="text-sm font-medium text-foreground bg-background px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                                {action.label}
                            </span>
                            <a
                                href={action.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300`}>
                                    {action.icon}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Toggle Button */}
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                size="icon"
                className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${isExpanded
                    ? 'bg-destructive hover:bg-destructive/90 rotate-90'
                    : 'accent-gradient hover:opacity-90 hover:scale-110'
                    }`}
            >
                {isExpanded ? (
                    <X className="w-6 h-6 text-destructive-foreground" />
                ) : (
                    <Phone className="w-6 h-6 text-accent-foreground animate-pulse" />
                )}
            </Button>
        </div>
    );
};

export default FloatingActionButton;
