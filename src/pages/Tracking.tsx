import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, MapPin, Car, User, Clock, CheckCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const mockTrackingData = {
  id: 'CC-2026-0123',
  status: 'In Transit',
  vehicle: 'Mercedes E-Class',
  driver: 'Eldar Aliyev',
  from: 'Baku Airport',
  to: 'Hilton Baku',
  eta: '15 min',
  progress: 65,
  timeline: [
    { time: '14:00', status: 'Booking Confirmed', completed: true },
    { time: '14:30', status: 'Driver Assigned', completed: true },
    { time: '15:15', status: 'Picked Up', completed: true },
    { time: '15:45', status: 'In Transit', completed: true },
    { time: '16:00', status: 'Arrival', completed: false },
  ],
};

const Tracking: React.FC = () => {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            {t('trackYourRide')}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Monitor your booking in real-time
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="card-gradient border-border shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter booking ID (e.g., CC-2026-0123)"
                      className="h-14 pl-12 bg-secondary/50 border-border text-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="h-14 px-8 accent-gradient text-accent-foreground hover:opacity-90"
                  >
                    {t('track')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tracking Result */}
      {showResult && (
        <section className="pb-16 bg-background animate-slide-up">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="card-gradient border-border shadow-xl overflow-hidden">
                {/* Status Bar */}
                <div className="hero-section p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-primary-foreground/60 text-sm">Booking ID</p>
                      <p className="text-2xl font-bold text-primary-foreground">{mockTrackingData.id}</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground">
                      <Navigation className="w-5 h-5" />
                      <span className="font-semibold">{mockTrackingData.status}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full accent-gradient transition-all duration-1000"
                        style={{ width: `${mockTrackingData.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{mockTrackingData.from}</span>
                      <span className="text-accent font-semibold">ETA: {mockTrackingData.eta}</span>
                      <span>{mockTrackingData.to}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Details */}
                    <div className="space-y-4">
                      <h3 className="font-display font-bold text-foreground text-lg mb-4">Ride Details</h3>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                        <Car className="w-6 h-6 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Vehicle</p>
                          <p className="font-semibold text-foreground">{mockTrackingData.vehicle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                        <User className="w-6 h-6 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Driver</p>
                          <p className="font-semibold text-foreground">{mockTrackingData.driver}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                        <MapPin className="w-6 h-6 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Route</p>
                          <p className="font-semibold text-foreground">{mockTrackingData.from} → {mockTrackingData.to}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="font-display font-bold text-foreground text-lg mb-4">Status Timeline</h3>
                      <div className="space-y-4">
                        {mockTrackingData.timeline.map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              item.completed ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'
                            }`}>
                              {item.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {item.status}
                              </p>
                              <p className="text-sm text-muted-foreground">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Tracking;
