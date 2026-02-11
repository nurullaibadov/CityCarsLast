import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumEffects from '@/components/shared/PremiumEffects';
import AnimatedBackground from '@/components/shared/AnimatedBackground';

const ForgotPassword: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset request:', email);
    setSubmitted(true);
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

        {!submitted ? (
          <>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {t('resetPassword')}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t('enterEmailReset')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('email')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 pl-12 bg-secondary/50 border-border"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base accent-gradient text-accent-foreground hover:opacity-90"
              >
                {t('sendResetLink')}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <Mail className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Check your email
            </h1>
            <p className="text-muted-foreground mb-8">
              We've sent a password reset link to <strong className="text-foreground">{email}</strong>
            </p>
          </div>
        )}

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('rememberPassword')} {t('login')}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
