import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { isAuthenticated, setAuthFlag } from '../../utils/auth';

const UserLogin = () => {

  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/login", {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      setAuthFlag(); // Set authentication flag
      sessionStorage.setItem('userRole', 'user'); // Set user role
      navigate("/", { replace: true }); // Redirect to home after login, replace history
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#bff364]/8 blur-3xl animate-in fade-in zoom-in-50 duration-1000" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#bff364]/6 blur-3xl animate-in fade-in zoom-in-50 duration-1000 delay-300" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700">
        <Card className="border-zinc-800/50 bg-zinc-900/90 shadow-2xl shadow-black/20 ring-1 ring-zinc-800/50 backdrop-blur-2xl rounded-3xl py-0 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-[#bff364] via-[#bff364]/80 to-[#bff364]" />

          <CardHeader className="items-center pt-10 pb-2 text-center">
            {/* Icon */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bff364] shadow-xl shadow-[#bff364]/30 animate-in zoom-in-50 spin-in-6 duration-500 delay-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>

            <CardTitle className="text-2xl font-extrabold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-[15px]">Sign in to continue your food journey.</CardDescription>
          </CardHeader>

          <CardContent className="px-10 pt-4 pb-10">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email"
                  className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                  <Link to="#" className="text-xs text-[#bff364] hover:text-[#bff364]/80 hover:underline underline-offset-4">Forgot?</Link>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password"
                  className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="mt-1 h-12 w-full rounded-xl bg-[#bff364] text-sm font-semibold text-black shadow-lg shadow-[#bff364]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#bff364]/30 hover:bg-[#bff364]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <Separator className="flex-1 bg-border/50" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">or</span>
              <Separator className="flex-1 bg-border/50" />
            </div>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              New here?{' '}
              <Link to="/user/register" className="font-semibold text-[#bff364] transition-colors duration-200 hover:text-[#bff364]/80 hover:underline underline-offset-4">Create account</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserLogin;
