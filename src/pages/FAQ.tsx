import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        category: 'Booking',
        question: 'How do I book a car?',
        answer: 'You can book a car by browsing our fleet, selecting your preferred vehicle, choosing your pickup and return dates, and completing the booking form. Payment can be made online securely.'
    },
    {
        category: 'Booking',
        question: 'Can I modify or cancel my booking?',
        answer: 'Yes, you can modify or cancel your booking up to 24 hours before the pickup time without any charges. Log into your dashboard to manage your bookings.'
    },
    {
        category: 'Booking',
        question: 'What documents do I need to rent a car?',
        answer: 'You need a valid driver\'s license (held for at least 1 year), a valid ID or passport, and a credit card in the driver\'s name for the security deposit.'
    },
    {
        category: 'Payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers. Payment can be made online during booking or at pickup.'
    },
    {
        category: 'Payment',
        question: 'Is there a security deposit?',
        answer: 'Yes, a refundable security deposit is required at pickup. The amount varies by vehicle type and will be returned within 7-14 business days after the car is returned in good condition.'
    },
    {
        category: 'Payment',
        question: 'Are there any hidden fees?',
        answer: 'No, we believe in transparent pricing. All fees including taxes, insurance, and any additional services are clearly displayed during the booking process.'
    },
    {
        category: 'Insurance',
        question: 'Is insurance included in the rental price?',
        answer: 'Basic insurance is included in all our rental prices. You can also opt for additional coverage options like CDW (Collision Damage Waiver) and theft protection.'
    },
    {
        category: 'Insurance',
        question: 'What does the insurance cover?',
        answer: 'Our basic insurance covers third-party liability. Optional CDW reduces your liability in case of damage to the rental vehicle. Full details are provided during booking.'
    },
    {
        category: 'Vehicle',
        question: 'Can I add an additional driver?',
        answer: 'Yes, you can add additional drivers for a small daily fee. All additional drivers must meet the same requirements as the primary driver and be present at pickup.'
    },
    {
        category: 'Vehicle',
        question: 'What if the car breaks down?',
        answer: 'All our vehicles are regularly maintained. In the unlikely event of a breakdown, contact our 24/7 roadside assistance. We\'ll arrange a replacement vehicle or repairs at no extra cost.'
    },
    {
        category: 'Vehicle',
        question: 'Can I take the car outside Azerbaijan?',
        answer: 'Cross-border travel requires prior approval and additional documentation. Please contact us at least 48 hours before your trip to arrange this.'
    },
    {
        category: 'General',
        question: 'What is your fuel policy?',
        answer: 'We operate on a full-to-full fuel policy. You receive the car with a full tank and should return it full. Alternatively, you can pre-purchase a full tank at a competitive rate.'
    },
    {
        category: 'General',
        question: 'Is there a mileage limit?',
        answer: 'Most rentals include unlimited mileage. Some special offers or long-term rentals may have mileage limits, which will be clearly stated in your booking confirmation.'
    },
    {
        category: 'General',
        question: 'Do you offer airport pickup/delivery?',
        answer: 'Yes, we offer complimentary pickup and delivery at Baku International Airport. For other locations, delivery fees may apply based on distance.'
    }
];

const FAQ: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

    const filteredFAQs = faqData.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const groupedFAQs = categories.reduce((acc, category) => {
        if (category === 'All') return acc;
        acc[category] = filteredFAQs.filter(item => item.category === category);
        return acc;
    }, {} as Record<string, FAQItem[]>);

    return (
        <Layout>
            {/* Header */}
            <section className="hero-section py-16 md:py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                        <HelpCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                        Find answers to common questions about our car rental service
                    </p>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-8 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Search Bar */}
                        <div className="mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 pl-12 bg-card border-border text-lg"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    onClick={() => setSelectedCategory(category)}
                                    className={selectedCategory === category ? 'accent-gradient text-accent-foreground' : ''}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* FAQ Accordion */}
                        {selectedCategory === 'All' ? (
                            Object.entries(groupedFAQs).map(([category, items]) => (
                                items.length > 0 && (
                                    <div key={category} className="mb-12">
                                        <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                                            <div className="w-1 h-8 accent-gradient rounded-full" />
                                            {category}
                                        </h2>
                                        <Accordion type="single" collapsible className="space-y-4">
                                            {items.map((item, index) => (
                                                <AccordionItem
                                                    key={index}
                                                    value={`${category}-${index}`}
                                                    className="glass-card border-border rounded-lg px-6"
                                                >
                                                    <AccordionTrigger className="text-left hover:text-accent">
                                                        <span className="font-semibold">{item.question}</span>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                )
                            ))
                        ) : (
                            <Accordion type="single" collapsible className="space-y-4">
                                {filteredFAQs.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="glass-card border-border rounded-lg px-6"
                                    >
                                        <AccordionTrigger className="text-left hover:text-accent">
                                            <span className="font-semibold">{item.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}

                        {filteredFAQs.length === 0 && (
                            <Card className="glass-card border-border">
                                <CardContent className="p-12 text-center">
                                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-foreground mb-2">No results found</h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your search or browse all categories
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Contact Support */}
                        <Card className="glass-card border-border mt-12">
                            <CardContent className="p-8 text-center">
                                <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                                    Still have questions?
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Our support team is here to help you 24/7
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Button className="accent-gradient text-accent-foreground">
                                        Contact Support
                                    </Button>
                                    <Button variant="outline">
                                        Live Chat
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default FAQ;
