import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, Car, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumEffects from '@/components/shared/PremiumEffects';
import AnimatedBackground from '@/components/shared/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';

const ResetPassword: React.FC = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            toast({
                title: "Invalid Link",
                description: "The reset password link is missing a security token. Please check your email again.",
                variant: "destructive"
            });
        }
    }, [token, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive"
            });
            return;
        }

        if (!token) {
            toast({
                title: "Error",
                description: "Invalid or missing token",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            const { default: api } = await import('@/services/api');
            await api.post('/auth/reset-password', { token, newPassword: password });
            setSuccess(true);
            toast({
                title: "Success",
                description: "Password has been reset successfully.",
            });
            setTimeout(() => navigate('/login'), 3000);
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Could not reset password.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <PremiumEffects />
            <AnimatedBackground />
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mb-10">
                    <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center shadow-lg">
                        <Car className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <span className="text-2xl font-display font-bold text-foreground">
                        City<span className="text-gradient">Cars</span>
                    </span>
                </Link>

                {!success ? (
                    <>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                            Reset Password
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Enter your new password below.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="h-12 pl-12 pr-12 bg-secondary/50 border-border"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="h-12 pl-12 pr-12 bg-secondary/50 border-border"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 text-base accent-gradient text-accent-foreground hover:opacity-90 mt-4"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                            Success!
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Your password has been successfully reset. Redirecting to login...
                        </p>
                        <Link to="/login">
                            <Button className="w-full h-12 accent-gradient text-accent-foreground">
                                Go to Login
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
