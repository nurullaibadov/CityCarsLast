import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash, User, Search, Star, Globe, Clock, Banknote, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AdminDrivers = () => {
    const [drivers, setDrivers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newDriver, setNewDriver] = useState({
        name: '', image: '', experience: 0, rating: 5.0, languages: '', price: 0, available: true, rides: 0, specialties: ''
    });
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await api.get('/drivers');
            setDrivers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddDriver = async () => {
        try {
            await api.post('/drivers', newDriver);
            toast({ title: 'Driver added successfully' });
            setIsOpen(false);
            setNewDriver({ name: '', image: '', experience: 0, rating: 5.0, languages: '', price: 0, available: true, rides: 0, specialties: '' });
            fetchDrivers();
        } catch (error) {
            console.error(error);
            toast({ title: 'Error adding driver', variant: 'destructive' });
        }
    };

    const handleDeleteDriver = async (id: number) => {
        if (!confirm('Are you sure you want to remove this driver?')) return;
        try {
            await api.delete(`/drivers/${id}`);
            toast({ title: 'Driver removed' });
            fetchDrivers();
        } catch (error) {
            console.error(error);
            toast({ title: 'Error deleting driver', variant: 'destructive' });
        }
    };

    const toggleBlacklist = async (id: number) => {
        try {
            const res = await api.put(`/drivers/${id}/blacklist`);
            toast({
                title: "Status Updated",
                description: res.data.message,
            });
            fetchDrivers();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update driver status",
                variant: 'destructive'
            });
        }
    };

    const filteredDrivers = drivers.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.languages.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Driver Management</h1>
                    <p className="text-slate-500">Recruit and manage your professional chauffeurs.</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all font-bold">
                            <Plus className="w-5 h-5" /> Add New Driver
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px] rounded-2xl">
                        <DialogHeader>
                            <DialogTitle>Add Professional Driver</DialogTitle>
                            <DialogDescription>
                                Create a new driver profile with their experience and details.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Experience (Years)</Label>
                                    <Input type="number" value={newDriver.experience} onChange={e => setNewDriver({ ...newDriver, experience: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Profile Image URL</Label>
                                <Input value={newDriver.image} onChange={e => setNewDriver({ ...newDriver, image: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Hourly Price ($)</Label>
                                    <Input type="number" value={newDriver.price} onChange={e => setNewDriver({ ...newDriver, price: parseFloat(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Rating</Label>
                                    <Input type="number" step="0.1" value={newDriver.rating} onChange={e => setNewDriver({ ...newDriver, rating: parseFloat(e.target.value) })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Total Rides</Label>
                                    <Input type="number" value={newDriver.rides} onChange={e => setNewDriver({ ...newDriver, rides: parseInt(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Specialties</Label>
                                    <Input value={newDriver.specialties} placeholder="VIP, Airport..." onChange={e => setNewDriver({ ...newDriver, specialties: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Languages</Label>
                                <Input value={newDriver.languages} placeholder="Azerbaijani, English, Russian" onChange={e => setNewDriver({ ...newDriver, languages: e.target.value })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddDriver} className="w-full h-12 rounded-xl font-bold">Save Profile</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search by name or languages..."
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
                                <TableHead className="py-4 pl-6 font-bold text-slate-900 dark:text-white">Profile</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Experience</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Languages</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Rate/Hr</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Status</TableHead>
                                <TableHead className="text-right pr-6 font-bold text-slate-900 dark:text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDrivers.map((driver) => (
                                <TableRow key={driver.id} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-slate-200">
                                                <AvatarImage src={driver.image} />
                                                <AvatarFallback><User /></AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{driver.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                                    <Star className="w-3 h-3 fill-current" /> {driver.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Clock className="w-4 h-4" /> {driver.experience} Years
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Globe className="w-4 h-4" />
                                            <span className="max-w-[150px] truncate" title={driver.languages}>{driver.languages}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 font-bold text-primary">
                                            <Banknote className="w-4 h-4" /> ${driver.price}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {driver.isBlacklisted ? (
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
                                        <div className="flex items-center justify-end gap-2 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`font-bold transition-all rounded-xl h-10 px-4 ${driver.isBlacklisted
                                                    ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10'
                                                    : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'}`}
                                                onClick={() => toggleBlacklist(driver.id)}
                                            >
                                                {driver.isBlacklisted ? 'Activate' : 'Restrict'}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteDriver(driver.id)}
                                                className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredDrivers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center text-slate-400">
                                        No drivers found in the directory.
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

export default AdminDrivers;

