import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { isAuthenticated, setAuthFlag } from '../../utils/auth';

const FoodPartnerRegister = () => {

  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const foodPartnerId = sessionStorage.getItem('foodPartnerId');
      if (foodPartnerId) {
        navigate(`/food-partner/${foodPartnerId}`, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [navigate]);
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError('');
    setLoading(true);

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
        name:businessName,
        contactName,
        phone,
        email,
        password,
        address
      }, { withCredentials: true });
      
      console.log(response.data);
      setAuthFlag(); // Set authentication flag
      sessionStorage.setItem('userRole', 'foodPartner'); // Set food partner role
      const foodPartnerId = response.data.foodPartner._id;
      sessionStorage.setItem('foodPartnerId', foodPartnerId); // Store food partner ID
      navigate(`/food-partner/${foodPartnerId}`, { replace: true }); // Redirect to food partner profile
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#bff364]/8 blur-3xl animate-in fade-in zoom-in-50 duration-1000" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#bff364]/6 blur-3xl animate-in fade-in zoom-in-50 duration-1000 delay-300" />
      <div className="pointer-events-none absolute top-1/4 right-1/3 h-48 w-48 rounded-full bg-[#bff364]/5 blur-2xl animate-in fade-in zoom-in-75 duration-1000 delay-500" />

      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700">
        <Card className="border-zinc-800/50 bg-zinc-900/90 shadow-2xl shadow-black/20 ring-1 ring-zinc-800/50 backdrop-blur-2xl rounded-3xl py-0 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-[#bff364] via-[#bff364]/80 to-[#bff364]" />

          <CardHeader className="items-center pt-8 pb-2 text-center">
            {/* Icon */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bff364] shadow-xl shadow-[#bff364]/30 animate-in zoom-in-50 spin-in-6 duration-500 delay-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h7v7H3z" /><path d="M14 3h7v7h-7z" /><path d="M14 14h7v7h-7z" /><path d="M3 14h7v7H3z" />
              </svg>
            </div>

            <Badge variant="secondary" className="mx-auto mb-3 bg-[#bff364]/10 text-[#bff364] border-[#bff364]/20 text-[11px] font-semibold uppercase tracking-widest px-3 py-1">
              Business Account
            </Badge>

            <CardTitle className="text-2xl font-extrabold tracking-tight">Partner sign up</CardTitle>
            <CardDescription className="text-[15px]">Grow your business with our platform.</CardDescription>
          </CardHeader>

          <CardContent className="px-10 pt-2 pb-8">
            {/* Role switcher */}
            <nav className="mb-6 flex items-center justify-center gap-1 rounded-xl bg-muted/50 p-1">
              <Button asChild variant="ghost" size="sm" className="flex-1 rounded-lg text-muted-foreground hover:text-foreground">
                <Link to="/user/register">User</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="flex-1 rounded-lg bg-card text-foreground shadow-sm hover:bg-card">
                <Link to="/food-partner/register">Food Partner</Link>
              </Button>
            </nav>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="businessName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Name</Label>
                <Input id="businessName" name="businessName" placeholder="Tasty Bites" autoComplete="organization"
                  className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contactName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Name</Label>
                  <Input id="contactName" name="contactName" placeholder="Jane Doe" autoComplete="name"
                    className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+1 555 123" autoComplete="tel"
                    className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email"
                  className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Create password" autoComplete="new-password"
                  className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</Label>
                <Input id="address" name="address" placeholder="123 Market Street" autoComplete="street-address"
                  className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                />
                <p className="text-[11px] leading-tight text-muted-foreground/70">Full address helps customers find you faster.</p>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="mt-1 h-12 w-full rounded-xl bg-[#bff364] text-sm font-semibold text-black shadow-lg shadow-[#bff364]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#bff364]/30 hover:bg-[#bff364]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Partner Account'}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <Separator className="flex-1 bg-border/50" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">or</span>
              <Separator className="flex-1 bg-border/50" />
            </div>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Already a partner?{' '}
              <Link to="/food-partner/login" className="font-semibold text-[#bff364] transition-colors duration-200 hover:text-[#bff364]/80 hover:underline underline-offset-4">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
