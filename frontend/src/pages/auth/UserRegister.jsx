import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { isAuthenticated, setAuthFlag } from '../../utils/auth';

const UserRegister = () => {

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

        const firstName = e.target.firstName.value.trim();
        const lastName = e.target.lastName.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        // Basic validation
        if (!firstName || !lastName) {
            setError('Please enter your full name');
            setLoading(false);
            return;
        }

        if (!email) {
            setError('Please enter your email address');
            setLoading(false);
            return;
        }

        if (!password || password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/register", {
                fullName: firstName + " " + lastName,
                email,
                password
            },
            {
                withCredentials: true
            });

            console.log(response.data);
            setAuthFlag(); // Set authentication flag
            sessionStorage.setItem('userRole', 'user'); // Set user role
            navigate("/", { replace: true });
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async (role) => {
        await logout(role);
        navigate('/user/login', { replace: true });
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

                    <CardHeader className="items-center pt-8 pb-2 text-center">
                        {/* Icon */}
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bff364] shadow-xl shadow-[#bff364]/30 animate-in zoom-in-50 spin-in-6 duration-500 delay-200">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>

                        <CardTitle className="text-2xl font-extrabold tracking-tight">Create your account</CardTitle>
                        <CardDescription className="text-[15px]">Join to explore and enjoy delicious meals.</CardDescription>
                    </CardHeader>

                    <CardContent className="px-10 pt-2 pb-8">
                        {/* Role switcher */}
                        <nav className="mb-6 flex items-center justify-center gap-1 rounded-xl bg-muted/50 p-1">
                            <Button asChild variant="ghost" size="sm" className="flex-1 rounded-lg bg-card text-foreground shadow-sm hover:bg-card">
                                <Link to="/user/register">User</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="flex-1 rounded-lg text-muted-foreground hover:text-foreground">
                                <Link to="/food-partner/register">Food Partner</Link>
                            </Button>
                        </nav>

                        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                            {error && (
                                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</Label>
                                    <Input id="firstName" name="firstName" placeholder="Jane" autoComplete="given-name" required
                                        className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                                    <Input id="lastName" name="lastName" placeholder="Doe" autoComplete="family-name" required
                                        className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required
                                    className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" required minLength={6}
                                    className="h-11 rounded-xl border-zinc-700/60 bg-zinc-800/50 focus:border-[#bff364] focus:ring-2 focus:ring-[#bff364]/20"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="mt-1 h-12 w-full rounded-xl bg-[#bff364] text-sm font-semibold text-black shadow-lg shadow-[#bff364]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#bff364]/30 hover:bg-[#bff364]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </Button>
                        </form>

                        <div className="mt-6 flex items-center gap-3">
                            <Separator className="flex-1 bg-border/50" />
                            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">or</span>
                            <Separator className="flex-1 bg-border/50" />
                        </div>

                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/user/login" className="font-semibold text-[#bff364] transition-colors duration-200 hover:text-[#bff364]/80 hover:underline underline-offset-4">Sign in</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserRegister;
