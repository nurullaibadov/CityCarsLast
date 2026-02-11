import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    Users,
    Calendar,
    MessageSquare,
    LogOut,
    Shield,
    ShieldAlert,
    UserCheck,
    Settings,
    Bell,
    Sun,
    Moon
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Car, label: 'Cars', path: '/admin/cars' },
        { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: UserCheck, label: 'Drivers', path: '/admin/drivers' },
        { icon: ShieldAlert, label: 'Blacklist', path: '/admin/blacklist' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
        { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    ];

    return (
        <div className="admin-panel flex h-screen bg-[#f8fafc] dark:bg-slate-950 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-xl z-30">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Shield className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <span className="text-xl font-display font-black tracking-tight text-slate-900 dark:text-white uppercase italic">CityCars</span>
                            <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Admin Control</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'group-hover:text-primary transition-colors'}`} />
                                    <span className="font-semibold text-sm">{item.label}</span>
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 space-y-4">
                    <Separator className="dark:bg-slate-800" />
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Administrator</p>
                            <p className="text-xs text-slate-500 truncate">admin@citycars.az</p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 transition-all rounded-xl py-6"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-bold">Logout Session</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {sidebarItems.find(i => i.path === location.pathname)?.label || 'Overview'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            onClick={toggleTheme}
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Settings className="w-5 h-5" />
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

