import React from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const newsArticles = [
  {
    id: 1,
    title: 'CityCars Expands Fleet with 50 New Electric Vehicles',
    excerpt: 'We are proud to announce the addition of 50 new Tesla and BMW electric vehicles to our premium fleet, making sustainable travel easier than ever.',
    date: '2026-01-25',
    author: 'CityCars Team',
    category: 'Company News',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
  },
  {
    id: 2,
    title: 'New Airport Transfer Service Launched',
    excerpt: 'Experience seamless airport transfers with our new dedicated service featuring luxury vehicles and professional multilingual drivers.',
    date: '2026-01-20',
    author: 'CityCars Team',
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  },
  {
    id: 3,
    title: 'Winter Driving Tips for Azerbaijan Roads',
    excerpt: 'Stay safe this winter with our comprehensive guide to driving in Azerbaijan during the cold season. Essential tips for all drivers.',
    date: '2026-01-15',
    author: 'Safety Team',
    category: 'Tips & Guides',
    image: 'https://images.unsplash.com/photo-1478439407929-1eb95f498802?w=800&q=80',
  },
  {
    id: 4,
    title: 'Partnership with Leading Hotels in Baku',
    excerpt: 'CityCars partners with top 5-star hotels in Baku to offer exclusive rental packages and VIP transfer services for hotel guests.',
    date: '2026-01-10',
    author: 'CityCars Team',
    category: 'Partnerships',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
  {
    id: 5,
    title: 'Mobile App Update: Real-Time Tracking Now Available',
    excerpt: 'Track your rental car and driver in real-time with our latest app update. Enhanced features for a better rental experience.',
    date: '2026-01-05',
    author: 'Tech Team',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    id: 6,
    title: 'Explore Gabala: Best Routes & Hidden Gems',
    excerpt: 'Discover the beautiful mountain town of Gabala with our curated driving routes. From scenic viewpoints to local attractions.',
    date: '2025-12-28',
    author: 'Travel Team',
    category: 'Travel Guide',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  },
];

const News: React.FC = () => {
  const { t } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            News & Updates
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and announcements from CityCars
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden card-gradient border-border shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img
                  src={newsArticles[0].image}
                  alt={newsArticles[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 w-fit">
                  {newsArticles[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  {newsArticles[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {newsArticles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(newsArticles[0].date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {newsArticles[0].author}
                  </span>
                </div>
                <Button className="w-fit accent-gradient text-accent-foreground hover:opacity-90">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.slice(1).map((article, index) => (
              <Card
                key={article.id}
                className="overflow-hidden card-gradient border-border hover:shadow-2xl transition-all duration-500 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-display font-bold text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.date)}
                    </span>
                    <Link to="#" className="text-accent hover:underline flex items-center gap-1">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="hero-section border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Get the latest news, travel tips, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                />
                <Button className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default News;
