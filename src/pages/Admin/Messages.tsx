import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Mail, User, MessageSquare, Search, Calendar, Trash, Reply } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminMessages = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/messages');
            setMessages(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await api.delete(`/messages/${id}`);
            toast({
                title: "Message Deleted",
                description: "The inquiry has been removed successfully.",
            });
            fetchMessages();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete message.",
                variant: "destructive"
            });
        }
    };

    const filteredMessages = messages.filter(msg =>
        msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Inbox</h1>
                    <p className="text-slate-500">Read and respond to customer inquiries and contact requests.</p>
                </div>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search messages by sender or subject..."
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
                                <TableHead className="py-4 pl-6 font-bold text-slate-900 dark:text-white">Sender</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Subject & Message</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Date Received</TableHead>
                                <TableHead className="text-right pr-6 font-bold text-slate-900 dark:text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMessages.map((msg) => (
                                <TableRow key={msg.id} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.name}`} />
                                                <AvatarFallback><User /></AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{msg.name}</p>
                                                <p className="text-xs text-slate-500">{msg.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{msg.subject}</p>
                                            <p className="text-sm text-slate-500 line-clamp-2" title={msg.message}>
                                                {msg.message}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(msg.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600"
                                                onClick={() => handleDelete(msg.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredMessages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-64 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                                            <p className="font-medium">No messages found in your inbox.</p>
                                        </div>
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

export default AdminMessages;

