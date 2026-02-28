import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { logout } from '../../utils/auth'

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [ id ])

    const handleLogout = async () => {
        await logout('foodPartner');
        navigate('/register', { replace: true });
    };


    return (
        <main className="min-h-screen bg-background pb-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#bff364]/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#bff364]/5 blur-3xl" />
            </div>

            {/* Profile Header */}
            <section className="relative px-4 pt-6 pb-8 animate-in fade-in slide-in-from-top-8 duration-700">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Avatar and Info */}
                    <div className="flex items-start gap-5">
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-[#bff364]/50 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                            <img 
                                className="relative h-24 w-24 rounded-full object-cover ring-2 ring-zinc-800/50 shadow-xl" 
                                src="" 
                                alt={profile?.name || "Profile"} 
                            />
                        </div>

                        <div className="flex-1 space-y-3">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                {profile?.name}
                            </h1>
                            {profile?.address && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{profile.address}</span>
                                </div>
                            )}
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={handleLogout}
                                className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="group relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
                            <div className="absolute inset-0 bg-linear-to-br from-[#bff364]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative space-y-1">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Meals</p>
                                <p className="text-3xl font-bold tabular-nums text-[#bff364]">
                                    {profile?.totalMeals || 0}
                                </p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
                            <div className="absolute inset-0 bg-linear-to-br from-[#bff364]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative space-y-1">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Customers Served</p>
                                <p className="text-3xl font-bold tabular-nums text-[#bff364]">
                                    {profile?.customersServed || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="mx-auto max-w-4xl bg-zinc-800/50" />

            {/* Video Grid */}
            <section className="relative px-4 pt-8 pb-4" aria-label="Food reels">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-4 text-lg font-semibold tracking-tight">Food Reels</h2>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        {videos.map((v, index) => (
                            <div 
                                key={v.id} 
                                className="group relative aspect-9/16 overflow-hidden rounded-lg border border-zinc-800/30 bg-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#bff364]/10 animate-in fade-in zoom-in-95"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <video
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={v.video} 
                                    muted
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                />
                                
                                {/* Overlay gradient on hover */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Play icon hint */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="rounded-full bg-[#bff364]/90 p-3 shadow-lg backdrop-blur-xl">
                                        <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {videos.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="rounded-full bg-zinc-900/50 p-6 mb-4">
                                <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm text-muted-foreground">No reels yet</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Profile