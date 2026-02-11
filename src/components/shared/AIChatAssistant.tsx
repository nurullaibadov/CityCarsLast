import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

const AIChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your CityCars Assistant. Looking for a specific car or need a recommendation for your trip to Baku?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            let botResponse = "That sounds like a great plan! We have several options for you. Would you prefer a luxury SUV or a sports car?";

            if (inputValue.toLowerCase().includes('luxury') || inputValue.toLowerCase().includes('expensive')) {
                botResponse = "For ultimate luxury, I highly recommend our Rolls-Royce Ghost or Mercedes-Maybach. They are perfect for making an impression.";
            } else if (inputValue.toLowerCase().includes('suv') || inputValue.toLowerCase().includes('family')) {
                botResponse = "Our Range Rover Sport and Porsche Cayenne are very popular for families and long trips across Azerbaijan.";
            } else if (inputValue.toLowerCase().includes('fast') || inputValue.toLowerCase().includes('sport')) {
                botResponse = "If you want speed, you should check out the BMW M4 or our Audi RS6. They offer incredible performance on Baku's roads.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-card w-[350px] md:w-[400px] h-[500px] rounded-3xl overflow-hidden flex flex-col shadow-2xl border-accent/20 mb-6"
                    >
                        {/* Header */}
                        <div className="accent-gradient p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-accent-foreground">
                                <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">CityCars AI</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] opacity-80 uppercase tracking-tighter">Online & Helping</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:rotate-90 transition-transform p-1"
                            >
                                <X className="w-5 h-5 text-accent-foreground" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            className="flex-1 p-4 overflow-y-auto"
                            ref={scrollRef}
                        >
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-accent/10' : 'bg-primary/10'
                                                }`}>
                                                {msg.sender === 'bot' ? <Bot className="w-4 h-4 text-accent" /> : <User className="w-4 h-4 text-primary" />}
                                            </div>
                                            <div className={`p-4 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-accent text-accent-foreground rounded-tr-none'
                                                : 'bg-muted text-foreground rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-background/50 backdrop-blur-sm border-t border-border/50">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ask about a car..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    className="bg-muted border-none focus-visible:ring-1 focus-visible:ring-accent"
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSend}
                                    className="accent-gradient rounded-xl shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-[10px] text-center mt-2 text-muted-foreground flex items-center justify-center gap-1">
                                <Sparkles className="w-3 h-3 text-accent" /> Powered by CityCars AI Intelligence
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full accent-gradient flex items-center justify-center text-accent-foreground shadow-2xl premium-glow relative"
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-background rounded-full" />
                )}
            </motion.button>
        </div>
    );
};

export default AIChatAssistant;
