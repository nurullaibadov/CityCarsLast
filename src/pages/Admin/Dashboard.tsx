import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Car,
    Users,
    Calendar,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Search
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const data = [
    { name: 'Mon', bookings: 40 },
    { name: 'Tue', bookings: 30 },
    { name: 'Wed', bookings: 65 },
    { name: 'Thu', bookings: 45 },
    { name: 'Fri', bookings: 90 },
    { name: 'Sat', bookings: 75 },
    { name: 'Sun', bookings: 55 },
];

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        cars: 0,
        bookings: 0,
        users: 0,
        messages: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
                // Fallback to zeros if server fails
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Fleet', value: stats.cars, icon: Car, trend: '+12%', positive: true, color: 'bg-blue-500' },
        { title: 'Active Bookings', value: stats.bookings, icon: Calendar, trend: '+25%', positive: true, color: 'bg-primary' },
        { title: 'Registered Users', value: stats.users, icon: Users, trend: '+5%', positive: true, color: 'bg-indigo-500' },
        { title: 'New Messages', value: stats.messages, icon: MessageSquare, trend: '-2%', positive: false, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, here's what's happening with CityCars today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Last 7 Days</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <Card key={idx} className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${card.color} text-white shadow-lg shadow-current/20`}>
                                    <card.icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${card.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {card.trend}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{card.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bookings Chart */}
                <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Booking Analytics
                        </CardTitle>
                    </CardHeader>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Activities/Notifications */}
                <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-lg font-bold">Recent Activities</CardTitle>
                    </CardHeader>
                    <div className="space-y-6">
                        {[
                            { user: 'John Doe', action: 'booked', item: 'BMW 5 Series', time: '2 mins ago', color: 'bg-blue-500' },
                            { user: 'Alice Smith', action: 'sent', item: 'a new message', time: '15 mins ago', color: 'bg-green-500' },
                            { user: 'Robert Fox', action: 'registered', item: 'as a new user', time: '1 hour ago', color: 'bg-indigo-500' },
                            { user: 'Sarah Wilson', action: 'booked', item: 'Mercedes E-Class', time: '3 hours ago', color: 'bg-blue-500' },
                            { user: 'Admin', action: 'added', item: 'Audi Q8 to the fleet', time: '5 hours ago', color: 'bg-orange-500' },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.color}`} />
                                <div>
                                    <p className="text-sm text-slate-900 dark:text-white">
                                        <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium text-slate-500">{activity.item}</span>
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        View All Activities
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;

