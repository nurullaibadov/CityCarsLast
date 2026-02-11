import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            if (user.role !== 'admin') {
                toast.error("Unauthorized access. Admin privileges required.");
                return;
            }

            login(token, user);
            toast.success("Login successful");
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="admin-panel flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Username/Email</label>
                        <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Admin"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Admin123@"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
