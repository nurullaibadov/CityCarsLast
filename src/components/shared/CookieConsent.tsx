import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
            <Card className="card-gradient border-border shadow-2xl">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-lg text-foreground">🍪 Cookie Notice</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDecline}
                            className="h-6 w-6"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                    </p>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleAccept}
                            className="flex-1 accent-gradient text-accent-foreground"
                        >
                            Accept All
                        </Button>
                        <Button
                            onClick={handleDecline}
                            variant="outline"
                            className="flex-1"
                        >
                            Decline
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default CookieConsent;
