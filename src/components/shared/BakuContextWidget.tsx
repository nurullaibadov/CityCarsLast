import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Clock, MapPin, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BakuContextWidget: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [weather] = useState({ temp: 24, condition: 'Sunny', wind: '12 km/h' });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const bakuTime = time.toLocaleString('en-US', {
        timeZone: 'Asia/Baku',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return (
        <div className="fixed bottom-8 right-8 z-[100] hidden md:block">
            <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card elite-glass p-4 rounded-3xl border-white/10 shadow-huge flex items-center gap-6 group"
            >
                {/* Location & Time */}
                <div className="flex flex-col border-r border-white/10 pr-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                        <MapPin className="w-3 h-3" />
                        Baku, Azerbaijan
                    </div>
                    <div className="text-2xl font-display font-black tracking-tighter text-foreground font-mono">
                        {bakuTime}
                    </div>
                </div>

                {/* Weather Info */}
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                        {weather.temp > 20 ? <Sun className="w-6 h-6" /> : <Cloud className="w-6 h-6" />}
                    </div>
                    <div>
                        <div className="text-xl font-bold text-foreground leading-none">{weather.temp}°C</div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{weather.condition}</div>
                    </div>
                    <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-bold">
                            <Wind className="w-3 h-3" />
                            {weather.wind}
                        </div>
                        <div className="text-[9px] text-accent font-bold">Good to drive</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BakuContextWidget;
