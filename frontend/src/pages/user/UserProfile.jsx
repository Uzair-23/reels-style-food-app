import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import { logout, clearAuthFlag } from '../../utils/auth';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [savedReels, setSavedReels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data and saved reels
        const fetchUserData = async () => {
            try {
                // Fetch saved reels
                const response = await axios.get('http://localhost:3000/api/food/save', { 
                    withCredentials: true 
                });
                
                setSavedReels(response.data.savedFoods || []);
                
                // For now, use dummy data for user info
                // Replace with actual API call when available
                setUser({
                    fullName: 'John Doe',
                    email: 'john.doe@example.com',
                    joinedDate: 'January 2026',
                    totalSaved: response.data.savedFoods?.length || 0
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await logout('user');
        navigate('/register', { replace: true });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#bff364] border-t-transparent" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#bff364]/5 blur-3xl" />
                <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-[#bff364]/5 blur-3xl" />
            </div>

            {/* Profile Header */}
            <section className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 animate-in fade-in slide-in-from-top-8 duration-700">
                <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
                    {/* Avatar and Info */}
                    <div className="flex items-start gap-3 sm:gap-5">
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-[#bff364]/50 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                            <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-linear-to-br from-[#bff364]/20 to-[#bff364]/5 ring-2 ring-zinc-800/50 shadow-xl flex items-center justify-center">
                                <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#bff364]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground truncate">
                                        {user?.fullName || 'User'}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="bg-[#bff364]/10 text-[#bff364] border-[#bff364]/20 px-2 sm:px-3 py-0.5 sm:py-1 w-fit text-xs sm:text-sm">
                                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Member
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Joined {user?.joinedDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl shadow-xl">
                        <CardContent className="p-4 sm:p-6">
                            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Saved Reels</p>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-[#bff364]">
                                        {user?.totalSaved || 0}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Following</p>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-foreground">
                                        0
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator className="mx-auto max-w-4xl bg-zinc-800/50" />

            {/* Account Settings Section */}
            <section className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
                <div className="mx-auto max-w-4xl space-y-4">
                    <h2 className="text-base sm:text-lg font-semibold tracking-tight mb-3 sm:mb-4">Account Settings</h2>
                    
                    <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-sm sm:text-base">Personal Information</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Manage your account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                            <div className="grid gap-3 sm:gap-4">
                                <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-4">
                                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">Name</span>
                                    <span className="text-sm text-foreground break-words">{user?.fullName}</span>
                                </div>
                                <Separator className="bg-zinc-800/50" />
                                <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-4">
                                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">Email</span>
                                    <span className="text-sm text-foreground break-all">{user?.email}</span>
                                </div>
                                <Separator className="bg-zinc-800/50" />
                                <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-4">
                                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">Role</span>
                                    <Badge variant="outline" className="w-fit text-xs">User</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-sm sm:text-base">Preferences</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Customize your experience</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                                <div className="space-y-0.5 flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-medium">Email Notifications</div>
                                    <div className="text-xs text-muted-foreground">Receive updates about new reels</div>
                                </div>
                                <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">Configure</Button>
                            </div>
                            <Separator className="bg-zinc-800/50" />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                                <div className="space-y-0.5 flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-medium">Privacy Settings</div>
                                    <div className="text-xs text-muted-foreground">Manage who can see your activity</div>
                                </div>
                                <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">Manage</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logout Section */}
                    <Card className="border-red-900/30 bg-red-950/10 backdrop-blur-xl">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-foreground">Sign Out</h3>
                                    <p className="text-xs text-muted-foreground">
                                        You'll need to sign in again to access your account
                                    </p>
                                </div>
                                <Button 
                                    variant="destructive" 
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white shadow-lg w-full sm:w-auto text-sm"
                                >
                                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* My Saved Reels Preview */}
            {savedReels.length > 0 && (
                <>
                    <Separator className="mx-auto max-w-4xl bg-zinc-800/50 my-6 sm:my-8" />
                    <section className="relative px-4 sm:px-6 pb-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h2 className="text-base sm:text-lg font-semibold tracking-tight">My Saved Reels</h2>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => navigate('/saved')}
                                    className="text-[#bff364] hover:text-[#bff364]/80 hover:bg-[#bff364]/10 text-xs sm:text-sm"
                                >
                                    View All
                                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {savedReels.slice(0, 6).map((item, index) => (
                                    <div 
                                        key={item.food?._id || index}
                                        className="group relative aspect-9/16 overflow-hidden rounded-lg border border-zinc-800/30 bg-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#bff364]/10 cursor-pointer animate-in fade-in zoom-in-95"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                        onClick={() => navigate('/saved')}
                                    >
                                        <video
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={item.food?.video}
                                            muted
                                            playsInline
                                        />
                                        
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="rounded-full bg-[#bff364]/90 p-1 sm:p-1.5 w-fit">
                                                <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default UserProfile;
