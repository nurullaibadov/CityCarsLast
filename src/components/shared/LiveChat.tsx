import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
}

const LiveChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Hello! Welcome to CityCars Azerbaijan. How can I help you today?',
            sender: 'agent',
            timestamp: new Date()
        }
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: message,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages([...messages, newMessage]);
        setMessage('');

        // Simulate agent response
        setTimeout(() => {
            const agentResponse: Message = {
                id: messages.length + 2,
                text: 'Thank you for your message! Our team will get back to you shortly.',
                sender: 'agent',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, agentResponse]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    size="icon"
                    className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full accent-gradient text-accent-foreground shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 animate-pulse-slow"
                    aria-label="Open live chat"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-8 left-8 z-50 w-96 shadow-2xl border-border animate-scale-in">
                    <CardHeader className="accent-gradient text-accent-foreground p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <CardTitle className="text-lg">Live Chat Support</CardTitle>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="h-8 w-8 text-accent-foreground hover:bg-accent-foreground/10"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 text-accent-foreground hover:bg-accent-foreground/10"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    {!isMinimized && (
                        <CardContent className="p-0">
                            <ScrollArea className="h-96 p-4">
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === 'user'
                                                    ? 'accent-gradient text-accent-foreground'
                                                    : 'bg-secondary text-foreground'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="p-4 border-t border-border">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        size="icon"
                                        className="accent-gradient text-accent-foreground"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>
            )}
        </>
    );
};

export default LiveChat;
