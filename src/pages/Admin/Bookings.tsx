import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, Phone, Mail, Car, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminBookings = () => {
    const { toast } = useToast();
    const [bookings, setBookings] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await api.get('/bookings');
            setBookings(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-none rounded-lg font-bold">Confirmed</Badge>;
            case 'cancelled':
                return <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-none rounded-lg font-bold">Cancelled</Badge>;
            default:
                return <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-none rounded-lg font-bold">Pending Approval</Badge>;
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            await api.put(`/bookings/${id}/status`, { status });
            toast({
                title: "Status Updated",
                description: `Booking #${id} is now ${status}.`,
            });
            fetchBookings();
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "Could not update booking status.",
                variant: "destructive"
            });
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Reservations</h1>
                    <p className="text-slate-500">Monitor and manage all customer bookings and rental schedules.</p>
                </div>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by customer name or email..."
                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-none rounded-xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl gap-2 px-4 border-slate-200 dark:border-slate-700">
                            <Filter className="w-4 h-4" /> Filter Status
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                <TableHead className="py-4 pl-6 font-bold text-slate-900 dark:text-white">Customer</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Vehicle Context</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Duration</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Total Amount</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Status</TableHead>
                                <TableHead className="text-right pr-6 font-bold text-slate-900 dark:text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.map((booking) => (
                                <TableRow key={booking.id} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="py-4 pl-6">
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                <User className="w-3.5 h-3.5 text-slate-400" /> {booking.firstName} {booking.lastName}
                                            </p>
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> {booking.email}
                                            </p>
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                <Phone className="w-3 h-3" /> {booking.phone}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                            <Car className="w-4 h-4 text-primary" />
                                            <span>Vehicle ID: #{booking.carId}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                <Calendar className="w-3 h-3" /> {booking.pickupDate}
                                                <Clock className="w-3 h-3 ml-2" /> {booking.pickupTime}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-5">to</div>
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                <Calendar className="w-3 h-3" /> {booking.returnDate}
                                                <Clock className="w-3 h-3 ml-2" /> {booking.returnTime}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-lg font-black text-slate-900 dark:text-white">${booking.totalPrice?.toFixed(2)}</span>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status?.toLowerCase() !== 'confirmed' && booking.status?.toLowerCase() !== 'cancelled' && (
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-8 px-3 text-[10px] font-bold uppercase"
                                                    onClick={() => updateStatus(booking.id, 'Confirmed')}
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Confirm
                                                </Button>
                                            )}
                                            {booking.status?.toLowerCase() !== 'cancelled' && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg h-8 px-3 text-[10px] font-bold uppercase"
                                                    onClick={() => updateStatus(booking.id, 'Cancelled')}
                                                >
                                                    <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredBookings.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center text-slate-400">
                                        No reservations found matching your criteria.
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

export default AdminBookings;

