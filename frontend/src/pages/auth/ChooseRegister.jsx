import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { isAuthenticated } from '../../utils/auth';

const ChooseRegister = () => {
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-16">

      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#bff364]/8 blur-3xl animate-in fade-in zoom-in-50 duration-1000" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#bff364]/6 blur-3xl animate-in fade-in zoom-in-50 duration-1000 delay-300" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-[#bff364]/5 blur-2xl animate-in fade-in zoom-in-75 duration-1000 delay-500" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700">
        <Card className="border-zinc-800/50 bg-zinc-900/90 shadow-2xl shadow-black/20 ring-1 ring-zinc-800/50 backdrop-blur-2xl rounded-3xl py-0 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-[#bff364] via-[#bff364]/80 to-[#bff364]" />

          <CardHeader className="items-center pt-10 pb-2 text-center">
            {/* Animated icon badge */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#bff364] shadow-xl shadow-[#bff364]/30 animate-in zoom-in-50 spin-in-6 duration-500 delay-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>

            <Badge variant="secondary" className="mx-auto mb-3 bg-[#bff364]/10 text-[#bff364] border-[#bff364]/20 text-[11px] font-semibold uppercase tracking-widest px-3 py-1">
              Get started
            </Badge>

            <CardTitle className="text-3xl font-extrabold tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
              Join FoodView
            </CardTitle>
            <CardDescription className="mx-auto max-w-xs text-[15px] leading-relaxed animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
              Choose your account type to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-8 px-10 pt-4 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">

            {/* Option cards */}
            <div className="flex flex-col gap-3">

              {/* User option */}
              <Button
                asChild
                variant="ghost"
                className="group h-auto w-full justify-start gap-4 rounded-2xl bg-[#bff364] px-5 py-4 text-black shadow-lg shadow-[#bff364]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#bff364]/30 hover:bg-[#bff364]/90 hover:-translate-y-0.5 active:translate-y-0 hover:text-black"
              >
                <Link to="/user/register" className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/10 ring-1 ring-black/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-sm font-bold leading-tight">Register as User</div>
                    <p className="mt-0.5 text-xs font-normal text-black/70">
                      Discover &amp; save food reels
                    </p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </Button>

              {/* Food Partner option */}
              <Button
                asChild
                variant="outline"
                className="group h-auto w-full justify-start gap-4 rounded-2xl border-zinc-700/70 bg-zinc-800/50 px-5 py-4 shadow-sm transition-all duration-300 hover:border-[#bff364]/50 hover:bg-zinc-800/70 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <Link to="/food-partner/register" className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#bff364]/10 text-[#bff364] ring-1 ring-[#bff364]/20 transition-transform duration-300 group-hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3h7v7H3z" /><path d="M14 3h7v7h-7z" /><path d="M14 14h7v7h-7z" /><path d="M3 14h7v7H3z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-sm font-bold leading-tight text-foreground">Register as Food Partner</div>
                    <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                      Showcase your menu &amp; grow
                    </p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:text-[#bff364] group-hover:translate-x-0.5">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 animate-in fade-in duration-500 delay-700">
              <Separator className="flex-1 bg-border/50" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50 select-none">or</span>
              <Separator className="flex-1 bg-border/50" />
            </div>

            {/* Sign-in button */}
            <div className="text-center animate-in fade-in duration-500 delay-700">
              <Button asChild variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
                <Link to="/user/login">
                  Already have an account?{' '}
                  <span className="font-semibold text-lime-600 underline decoration-lime-300/0 underline-offset-4 transition-all duration-300 group-hover:decoration-lime-400 hover:text-lime-700 hover:decoration-lime-400">
                    Sign in
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChooseRegister;
