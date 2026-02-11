import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Plus, Trash, Edit, Car as CarIcon, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Car {
    id: number;
    name: string;
    price: number;
    type: string;
    image: string;
    fuel?: string;
    rating?: number;
    seats?: number;
}

const AdminCars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCar, setNewCar] = useState<Partial<Car>>({
        name: '',
        price: 0,
        type: 'Sedan',
        image: '',
        fuel: 'Petrol',
        rating: 4.5,
        seats: 5
    });
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await api.get('/cars');
            setCars(response.data);
        } catch (error) {
            console.error("Failed to fetch cars", error);
            toast.error("Could not fetch cars");
        }
    };

    const handleAddCar = async () => {
        try {
            await api.post('/cars', newCar);
            toast.success("Car added successfully");
            fetchCars();
            setNewCar({
                name: '',
                price: 0,
                type: 'Sedan',
                image: '',
                fuel: 'Petrol',
                rating: 4.5
            });
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to add car");
        }
    };

    const handleUpdateCar = async () => {
        if (!editingCar) return;
        try {
            await api.put(`/cars/${editingCar.id}`, editingCar);
            toast.success("Car updated successfully");
            fetchCars();
            setIsEditOpen(false);
            setEditingCar(null);
        } catch (error) {
            toast.error("Failed to update car");
        }
    };

    const handleDeleteCar = async (id: number) => {
        if (!confirm("Are you sure you want to delete this car?")) return;
        try {
            await api.delete(`/cars/${id}`);
            toast.success("Car deleted successfully");
            fetchCars();
        } catch (error) {
            toast.error("Failed to delete car");
        }
    };

    const openEditDialog = (car: Car) => {
        setEditingCar(car);
        setIsEditOpen(true);
    };

    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Fleet Management</h1>
                    <p className="text-slate-500">Manage your vehicle catalog, pricing, and availability.</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all font-bold">
                            <Plus className="w-5 h-5" /> Add New Vehicle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px] rounded-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Vehicle</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new car in your fleet.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={newCar.name} onChange={e => setNewCar({ ...newCar, name: e.target.value })} className="col-span-3" placeholder="e.g. BMW 5 Series" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">Price/Day</Label>
                                <Input id="price" type="number" value={newCar.price} onChange={e => setNewCar({ ...newCar, price: Number(e.target.value) })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Type</Label>
                                <Input id="type" value={newCar.type} onChange={e => setNewCar({ ...newCar, type: e.target.value })} className="col-span-3" placeholder="SUV, Sedan, etc." />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">Image URL</Label>
                                <Input id="image" value={newCar.image} onChange={e => setNewCar({ ...newCar, image: e.target.value })} className="col-span-3" placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fuel" className="text-right">Fuel</Label>
                                <Input id="fuel" value={newCar.fuel} onChange={e => setNewCar({ ...newCar, fuel: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="seats" className="text-right">Seats</Label>
                                <Input id="seats" type="number" value={newCar.seats} onChange={e => setNewCar({ ...newCar, seats: Number(e.target.value) })} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddCar} className="w-full h-12 rounded-xl font-bold">Save Vehicle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[525px] rounded-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Vehicle</DialogTitle>
                            <DialogDescription>
                                Update the details for this vehicle.
                            </DialogDescription>
                        </DialogHeader>
                        {editingCar && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input id="edit-name" value={editingCar.name} onChange={e => setEditingCar({ ...editingCar, name: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-price" className="text-right">Price/Day</Label>
                                    <Input id="edit-price" type="number" value={editingCar.price} onChange={e => setEditingCar({ ...editingCar, price: Number(e.target.value) })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">Type</Label>
                                    <Input id="edit-type" value={editingCar.type} onChange={e => setEditingCar({ ...editingCar, type: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-image" className="text-right">Image URL</Label>
                                    <Input id="edit-image" value={editingCar.image} onChange={e => setEditingCar({ ...editingCar, image: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-fuel" className="text-right">Fuel</Label>
                                    <Input id="edit-fuel" value={editingCar.fuel} onChange={e => setEditingCar({ ...editingCar, fuel: e.target.value })} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-seats" className="text-right">Seats</Label>
                                    <Input id="edit-seats" type="number" value={editingCar.seats} onChange={e => setEditingCar({ ...editingCar, seats: Number(e.target.value) })} className="col-span-3" />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" onClick={handleUpdateCar} className="w-full h-12 rounded-xl font-bold">Update Vehicle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search vehicles by name or type..."
                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-none rounded-xl"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl gap-2 px-4 border-slate-200 dark:border-slate-700">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                <TableHead className="py-4 pl-6 font-bold text-slate-900 dark:text-white">Vehicle</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Type</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Fuel</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Price/Day</TableHead>
                                <TableHead className="font-bold text-slate-900 dark:text-white">Status</TableHead>
                                <TableHead className="text-right pr-6 font-bold text-slate-900 dark:text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCars.map((car) => (
                                <TableRow key={car.id} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                                                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{car.name}</p>
                                                <p className="text-xs text-slate-500">ID: #{car.id.toString().padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-none rounded-lg px-2 py-0.5">
                                            {car.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{car.fuel || 'Petrol'}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-bold text-primary">${car.price}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-500/10 text-green-600 border-none rounded-lg px-2 py-0.5">
                                            Available
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => openEditDialog(car)}>
                                                <Edit className="w-4 h-4 text-slate-500" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                                onClick={() => handleDeleteCar(car.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredCars.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <CarIcon className="w-12 h-12 mb-4 opacity-20" />
                                            <p className="font-medium">No vehicles found matching your search</p>
                                            <Button variant="link" onClick={() => setSearchTerm('')} className="text-primary mt-2">Clear search</Button>
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

export default AdminCars;
