import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, AppWindow, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Settings: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Admin Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Configure application preferences and security protocols.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Security Settings */}
                <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-accent" />
                            Security Protocol
                        </CardTitle>
                        <CardDescription>Manage administrative access and encryption.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-xs text-muted-foreground">Require a secondary code for elite access.</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="space-y-2">
                            <Label>Admin Username (Env: ADMIN_EMAIL)</Label>
                            <Input value="Vaqif" disabled className="bg-slate-50 dark:bg-slate-900" />
                        </div>
                        <Button className="w-full accent-gradient text-accent-foreground">Update Credentials</Button>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-accent" />
                            Communications
                        </CardTitle>
                        <CardDescription>Configure SMTP and notification triggers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-xs text-muted-foreground">Send real-time alerts for new bookings.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>SMTP Status</Label>
                                <p className="text-xs text-muted-foreground">Current gateway: Ethereal (Mock)</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-none">Active</Badge>
                        </div>
                        <Button variant="outline" className="w-full">Test Gateway</Button>
                    </CardContent>
                </Card>

                {/* System Settings */}
                <Card className="rounded-[2rem] border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-accent" />
                            System Intelligence
                        </CardTitle>
                        <CardDescription>Fine-tune application performance and data synchronization.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                            <AppWindow className="w-8 h-8 text-accent mb-4" />
                            <h4 className="font-bold mb-1">Frontend Version</h4>
                            <p className="text-sm text-muted-foreground">v2.4.0 (Stable)</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                            <Database className="w-8 h-8 text-accent mb-4" />
                            <h4 className="font-bold mb-1">Database API</h4>
                            <p className="text-sm text-muted-foreground">Sequelize v6.37</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                            <Shield className="w-8 h-8 text-accent mb-4" />
                            <h4 className="font-bold mb-1">Last Sync</h4>
                            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
