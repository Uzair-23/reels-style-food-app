import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated, setAuthFlag } from '../../utils/auth';

const FoodPartnerLogin = () => {

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

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      setAuthFlag(); // Set authentication flag
      sessionStorage.setItem('userRole', 'foodPartner'); // Set food partner role
      const foodPartnerId = response.data.foodPartner._id;
      sessionStorage.setItem('foodPartnerId', foodPartnerId); // Store food partner ID
      navigate(`/food-partner/${foodPartnerId}`, { replace: true }); // Redirect to food partner profile
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
        <div className="w-full rounded-3xl border border-zinc-800/50 bg-zinc-900/90 px-10 py-8 shadow-2xl shadow-black/20 ring-1 ring-zinc-800/50 backdrop-blur-2xl overflow-hidden" role="region" aria-labelledby="partner-login-title">
          {/* Top accent bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 w-full bg-linear-to-r from-[#bff364] via-[#bff364]/80 to-[#bff364]" />
        {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bff364] shadow-xl shadow-[#bff364]/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </div>

        <header className="mb-6 text-center">
          <h1 id="partner-login-title" className="text-2xl font-bold tracking-tight text-foreground">Partner login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Access your dashboard and manage orders.</p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email"
              className="w-full rounded-xl border border-zinc-700/60 bg-zinc-800/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-[#bff364] focus:bg-zinc-800/70 focus:ring-2 focus:ring-[#bff364]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password"
              className="w-full rounded-xl border border-zinc-700/60 bg-zinc-800/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-[#bff364] focus:bg-zinc-800/70 focus:ring-2 focus:ring-[#bff364]/20"
            />
          </div>
          <button
            className="mt-2 w-full rounded-xl bg-[#bff364] py-3 text-sm font-semibold text-black shadow-lg shadow-[#bff364]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#bff364]/30 hover:bg-[#bff364]/90 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bff364] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New partner?{' '}
          <Link to="/food-partner/register" className="font-semibold text-[#bff364] transition-colors duration-200 hover:text-[#bff364]/80 hover:underline underline-offset-4">Create an account</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
