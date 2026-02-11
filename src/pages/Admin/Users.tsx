import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck, Mail, User, MoreHorizontal, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const AdminUsers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleBlacklist = async (id: number) => {
        try {
            const res = await api.put(`/users/${id}/blacklist`);
            toast({
                title: "Status Updated",
                description: res.data.message,
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update user status",
                variant: 'destructive'
            });
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">User Directory</h1>
                    <p className="text-slate-500">Manage customer accounts and administrative permissions.</p>
                </div>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search users by email..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-none rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                <TableHead className="py-4 pl-6 font-bold text-slate-900 dark:text-white">User Information</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Role</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Member Since</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Status</TableHead>
                                <TableHead className="text-right pr-6 font-bold text-slate-900 dark:text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                                                <AvatarFallback><User /></AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{user.email}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> UID: #{user.id}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={
                                            user.role === 'admin'
                                                ? "bg-primary text-primary-foreground font-bold rounded-lg px-2 py-0.5"
                                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none rounded-lg px-2 py-0.5"
                                        }>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {user.isBlacklisted ? (
                                            <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-none rounded-lg px-2 py-1 flex w-fit items-center gap-1 font-bold">
                                                <ShieldAlert className="w-3 h-3" /> Blacklisted
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-none rounded-lg px-2 py-1 flex w-fit items-center gap-1 font-bold">
                                                <ShieldCheck className="w-3 h-3" /> Active
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        {user.role !== 'admin' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`font-bold transition-all rounded-xl h-10 px-4 ${user.isBlacklisted
                                                    ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10'
                                                    : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'}`}
                                                onClick={() => toggleBlacklist(user.id)}
                                            >
                                                {user.isBlacklisted ? 'Activate' : 'Restrict'}
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center text-slate-400">
                                        No users found matching your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminUsers;

