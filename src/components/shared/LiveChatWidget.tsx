import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
}

const LiveChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Hello! Welcome to CityCars Azerbaijan. How can I help you today?',
            sender: 'agent',
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');

        // Simulate agent response
        setTimeout(() => {
            const agentResponse: Message = {
                id: messages.length + 2,
                text: 'Thank you for your message! Our team will assist you shortly.',
                sender: 'agent',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, agentResponse]);

            if (isMinimized) {
                setUnreadCount((prev) => prev + 1);
            }
        }, 1000);
    };

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setUnreadCount(0);
        }
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
        if (!isMinimized) {
            setUnreadCount(0);
        }
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <Button
                    onClick={handleToggleChat}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full accent-gradient text-accent-foreground shadow-2xl hover:scale-110 transition-transform z-50"
                >
                    <MessageCircle className="w-6 h-6" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 bg-red-500 text-white">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 w-96 h-[500px] card-gradient border-border shadow-2xl z-50 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border accent-gradient">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <h3 className="font-semibold text-accent-foreground">Live Chat Support</h3>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleMinimize}
                                className="h-8 w-8 text-accent-foreground"
                            >
                                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleToggleChat}
                                className="h-8 w-8 text-accent-foreground"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                                                ? 'bg-accent text-accent-foreground'
                                                : 'bg-secondary text-foreground'
                                                }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </CardContent>

                            {/* Input */}
                            <div className="p-4 border-t border-border">
                                <div className="flex gap-2">
                                    <Input
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type your message..."
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        className="accent-gradient text-accent-foreground"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    {isMinimized && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Chat minimized
                            {unreadCount > 0 && ` • ${unreadCount} new message${unreadCount > 1 ? 's' : ''}`}
                        </div>
                    )}
                </Card>
            )}
        </>
    );
};

export default LiveChatWidget;
