import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, User, Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Blacklist: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchData = async () => {
        setLoading(true);
        try {
            const { default: api } = await import('@/services/api');
            const [usersRes, driversRes] = await Promise.all([
                api.get('/users'),
                api.get('/drivers')
            ]);
            // Only show blacklisted ones
            setUsers(usersRes.data.filter((u: any) => u.isBlacklisted));
            setDrivers(driversRes.data.filter((d: any) => d.isBlacklisted));
        } catch (error) {
            console.error(error);
            toast({ title: 'Error fetching blacklist data', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleUserBlacklist = async (id: number) => {
        try {
            const { default: api } = await import('@/services/api');
            await api.put(`/users/${id}/blacklist`);
            toast({ title: "User Status Updated" });
            fetchData();
        } catch (error) {
            toast({ title: "Action failed", variant: "destructive" });
        }
    };

    const toggleDriverBlacklist = async (id: number) => {
        try {
            const { default: api } = await import('@/services/api');
            await api.put(`/drivers/${id}/blacklist`);
            toast({ title: "Driver Status Updated" });
            fetchData();
        } catch (error) {
            toast({ title: "Action failed", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Blacklist Management</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage restricted access for users and drivers.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Restricted Users */}
                <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-red-500" />
                            Restricted Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">No blacklisted users</TableCell></TableRow>
                                ) : users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-800">
                                                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" className="text-green-600" onClick={() => toggleUserBlacklist(user.id)}>
                                                Unblock
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Restricted Drivers */}
                <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                            Restricted Drivers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {drivers.length === 0 ? (
                                    <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">No blacklisted drivers</TableCell></TableRow>
                                ) : drivers.map(driver => (
                                    <TableRow key={driver.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={driver.image} />
                                                    <AvatarFallback>{driver.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{driver.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" className="text-green-600" onClick={() => toggleDriverBlacklist(driver.id)}>
                                                Unblock
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Blacklist;
