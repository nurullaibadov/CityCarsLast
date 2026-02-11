import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Sparkles, Zap, TrendingUp, Award } from 'lucide-react';

interface Notification {
    id: number;
    type: 'success' | 'info' | 'promo';
    title: string;
    message: string;
    icon: React.ElementType;
    color: string;
}

const NotificationBanner: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: 'promo',
            title: 'Special Offer!',
            message: 'Get 20% off on weekend bookings. Use code: WEEKEND20',
            icon: Sparkles,
            color: 'from-purple-500 to-pink-500',
        },
    ]);

    const [isVisible, setIsVisible] = useState(true);

    const dismissNotification = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id));
        if (notifications.length === 1) {
            setIsVisible(false);
        }
    };

    if (!isVisible || notifications.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-40 max-w-sm space-y-2">
            {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                    <Card
                        key={notification.id}
                        className="card-gradient border-border shadow-2xl animate-slide-in-right"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${notification.color} flex items-center justify-center flex-shrink-0`}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-foreground mb-1">
                                        {notification.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.message}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => dismissNotification(notification.id)}
                                    className="h-6 w-6 flex-shrink-0"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
            <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default NotificationBanner;
