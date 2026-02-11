import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Mail, Phone, MapPin, Lock, Bell, CreditCard, Save, Upload, X, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiry: string;
}

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    createdAt: string;
}

const Profile: React.FC = () => {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile>({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        createdAt: ''
    });

    // Form state for editing
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: '1', type: 'visa', last4: '4242', expiry: '12/25' }
    ]);
    const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/auth/profile');
            const userData = response.data;
            setUser(userData);
            setFormData({
                name: userData.name || '',
                phone: userData.phone || '',
                address: userData.address || ''
            });
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            toast({
                title: "Error",
                description: "Could not load profile data.",
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const response = await api.put('/auth/profile', formData);
            setUser({ ...user, ...formData });
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast({
                title: "Error",
                description: "Could not update profile.",
                variant: 'destructive'
            });
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                toast({
                    title: 'Profile Picture Updated',
                    description: 'Your profile picture has been successfully uploaded.',
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddPaymentMethod = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cardNumber = formData.get('cardNumber') as string;
        const expiry = formData.get('expiry') as string;

        const newMethod: PaymentMethod = {
            id: Date.now().toString(),
            type: 'visa',
            last4: cardNumber.slice(-4),
            expiry: expiry
        };

        setPaymentMethods([...paymentMethods, newMethod]);
        setIsAddPaymentOpen(false);
        toast({
            title: 'Payment Method Added',
            description: 'Your new payment method has been saved successfully.',
        });
    };

    const handleRemovePaymentMethod = (id: string) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
        toast({
            title: 'Payment Method Removed',
            description: 'The payment method has been removed from your account.',
        });
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-accent animate-spin" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Header */}
            <section className="hero-section py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
                        My Profile
                    </h1>
                    <p className="text-primary-foreground/80">
                        Manage your account settings and preferences
                    </p>
                </div>
            </section>

            {/* Profile Content */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <Card className="card-gradient border-border">
                                    <CardContent className="p-6 text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-4 group">
                                            <Avatar className="w-24 h-24">
                                                {profileImage ? (
                                                    <AvatarImage src={profileImage} alt="Profile" />
                                                ) : (
                                                    <AvatarFallback className="text-2xl accent-gradient text-accent-foreground">
                                                        {user.name ? user.name.substring(0, 2).toUpperCase() : 'ME'}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}>
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <h3 className="text-xl font-bold text-foreground mb-1">{user.name || 'User'}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                                        <Button
                                            variant="outline"
                                            className="w-full mb-2"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Change Avatar
                                        </Button>
                                        <div className="pt-4 border-t border-border mt-4">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-muted-foreground">Member Since</span>
                                                <span className="font-semibold text-foreground">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Status</span>
                                                <span className="font-semibold text-foreground capitalize">{user.role}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <Tabs defaultValue="personal" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4 mb-8">
                                        <TabsTrigger value="personal">Personal</TabsTrigger>
                                        <TabsTrigger value="security">Security</TabsTrigger>
                                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                        <TabsTrigger value="payment">Payment</TabsTrigger>
                                    </TabsList>

                                    {/* Personal Information */}
                                    <TabsContent value="personal">
                                        <Card className="card-gradient border-border">
                                            <CardHeader>
                                                <CardTitle className="flex items-center justify-between">
                                                    <span>Personal Information</span>
                                                    {!isEditing && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setIsEditing(true)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName">Full Name</Label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="fullName"
                                                            value={isEditing ? formData.name : user.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={user.email}
                                                            disabled={true} // Email cannot be changed easily
                                                            className="pl-10 opacity-70"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="phone"
                                                            value={isEditing ? formData.phone : user.phone || ''}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            placeholder="+994 50 123 45 67"
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="address">Address</Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="address"
                                                            value={isEditing ? formData.address : user.address || ''}
                                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                            placeholder="123 Main Street, Baku"
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                {isEditing && (
                                                    <div className="flex gap-2 pt-4">
                                                        <Button
                                                            onClick={handleSave}
                                                            className="accent-gradient text-accent-foreground"
                                                        >
                                                            <Save className="w-4 h-4 mr-2" />
                                                            Save Changes
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setIsEditing(false);
                                                                setFormData({
                                                                    name: user.name,
                                                                    phone: user.phone,
                                                                    address: user.address
                                                                }); // Reset form
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Security */}
                                    <TabsContent value="security">
                                        <Card className="card-gradient border-border">
                                            <CardHeader>
                                                <CardTitle>Security Settings</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="currentPassword">Current Password</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="currentPassword"
                                                            type="password"
                                                            placeholder="Enter current password"
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="newPassword">New Password</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="newPassword"
                                                            type="password"
                                                            placeholder="Enter new password"
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="confirmPassword"
                                                            type="password"
                                                            placeholder="Confirm new password"
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                <Button className="accent-gradient text-accent-foreground">
                                                    Update Password
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Notifications */}
                                    <TabsContent value="notifications">
                                        <Card className="card-gradient border-border">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Bell className="w-5 h-5" />
                                                    Notification Preferences
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-foreground">Email Notifications</p>
                                                        <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
                                                    </div>
                                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-foreground">SMS Notifications</p>
                                                        <p className="text-sm text-muted-foreground">Get text messages for important updates</p>
                                                    </div>
                                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-foreground">Promotional Emails</p>
                                                        <p className="text-sm text-muted-foreground">Receive special offers and deals</p>
                                                    </div>
                                                    <input type="checkbox" className="w-5 h-5" />
                                                </div>
                                                <Button className="accent-gradient text-accent-foreground">
                                                    Save Preferences
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Payment Methods */}
                                    <TabsContent value="payment">
                                        <Card className="card-gradient border-border">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <CreditCard className="w-5 h-5" />
                                                    Saved Payment Methods
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                {paymentMethods.length === 0 ? (
                                                    <div className="text-center py-8">
                                                        <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                                                        <p className="text-muted-foreground mb-4">No payment methods saved</p>
                                                    </div>
                                                ) : (
                                                    paymentMethods.map((method) => (
                                                        <div key={method.id} className="glass-card p-4 rounded-lg border border-border hover:shadow-lg transition-shadow">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                                                        {method.type.toUpperCase()}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-foreground">•••• •••• •••• {method.last4}</p>
                                                                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleRemovePaymentMethod(method.id)}
                                                                    className="text-destructive hover:text-destructive"
                                                                >
                                                                    <X className="w-4 h-4 mr-1" />
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}

                                                <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="w-full">
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Add New Payment Method
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Add Payment Method</DialogTitle>
                                                            <DialogDescription>
                                                                Enter your card details to add a new payment method
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                                <Input
                                                                    id="cardNumber"
                                                                    name="cardNumber"
                                                                    placeholder="1234 5678 9012 3456"
                                                                    maxLength={16}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="expiry">Expiry Date</Label>
                                                                    <Input
                                                                        id="expiry"
                                                                        name="expiry"
                                                                        placeholder="MM/YY"
                                                                        maxLength={5}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="cvv">CVV</Label>
                                                                    <Input
                                                                        id="cvv"
                                                                        name="cvv"
                                                                        placeholder="123"
                                                                        maxLength={3}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="cardName">Cardholder Name</Label>
                                                                <Input
                                                                    id="cardName"
                                                                    name="cardName"
                                                                    placeholder="John Doe"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button type="submit" className="flex-1 accent-gradient text-accent-foreground">
                                                                    Add Card
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    onClick={() => setIsAddPaymentOpen(false)}
                                                                    className="flex-1"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Profile;
