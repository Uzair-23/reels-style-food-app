import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const CreateFood = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ videoFile, setVideoFile ] = useState(null);
    const [ videoURL, setVideoURL ] = useState('');
    const [ fileError, setFileError ] = useState('');
    const [ isDragging, setIsDragging ] = useState(false);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);
        return () => URL.revokeObjectURL(url);
    }, [ videoFile ]);

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[ 0 ];
        if (!file) { setVideoFile(null); setFileError(''); return; }
        if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer?.files?.[ 0 ];
        if (!file) { return; }
        if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const openFileDialog = () => fileInputRef.current?.click();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append("mama", videoFile);

        try {
            const response = await axios.post("http://localhost:3000/api/food", formData, {
                withCredentials: true,
            });

            console.log(response.data);
            navigate("/"); // Redirect to home or another page after successful creation
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create food reel. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [ name, videoFile ]);

    return (
        <div className="relative min-h-screen bg-background pb-24 pt-6 px-4">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#bff364]/5 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#bff364]/5 blur-3xl" />
            </div>

            <Card className="relative mx-auto max-w-2xl glass-strong border-zinc-800/50 shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <CardHeader className="space-y-2 pb-6">
                    <CardTitle className="text-3xl font-bold tracking-tight">Create Food Reel</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Upload a short video, give it a catchy name, and describe your dish.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-8">
                        {error && (
                            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
                                {error}
                            </div>
                        )}
                        {/* Video Upload Section */}
                        <div className="space-y-3">
                            <Label htmlFor="foodVideo" className="text-base font-semibold">Video Upload</Label>
                            <input
                                id="foodVideo"
                                ref={fileInputRef}
                                className="hidden"
                                type="file"
                                accept="video/*"
                                onChange={onFileChange}
                            />

                            <div
                                className={cn(
                                    "group relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer",
                                    isDragging 
                                        ? "border-[#bff364] bg-[#bff364]/5 scale-[1.02]"
                                        : "border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-900/30"
                                )}
                                role="button"
                                tabIndex={0}
                                onClick={openFileDialog}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                            >
                                <div className="flex flex-col items-center justify-center px-6 py-12">
                                    {/* Upload icon */}
                                    <div className={cn(
                                        "mb-4 rounded-full p-4 transition-all duration-300",
                                        isDragging ? "bg-[#bff364]/20 scale-110" : "bg-zinc-800/50 group-hover:bg-zinc-800"
                                    )}>
                                        <svg 
                                            className={cn(
                                                "h-10 w-10 transition-colors duration-300",
                                                isDragging ? "text-[#bff364]" : "text-zinc-400 group-hover:text-zinc-300"
                                            )} 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <p className="text-base font-semibold text-foreground">
                                            {isDragging ? "Drop your video here" : "Click to upload or drag and drop"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            MP4, WebM, or MOV • Maximum 100MB
                                        </p>
                                    </div>
                                </div>

                                {/* Animated border gradient on hover */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-[#bff364]/5 to-transparent" />
                                </div>
                            </div>

                            {fileError && (
                                <div className="flex items-center gap-2 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300" role="alert">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {fileError}
                                </div>
                            )}

                            {videoFile && (
                                <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4 animate-in fade-in slide-in-from-top-2 duration-500">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-md bg-[#bff364]/10 p-2">
                                            <svg className="h-5 w-5 text-[#bff364]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{videoFile.name}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={(e) => { e.stopPropagation(); openFileDialog(); }}
                                                className="text-xs h-8"
                                            >
                                                Change
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={(e) => { e.stopPropagation(); setVideoFile(null); setFileError(''); }}
                                                className="text-xs h-8 text-destructive hover:text-destructive"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video Preview */}
                        {videoURL && (
                            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                                <Label className="text-base font-semibold">Preview</Label>
                                <div className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-black shadow-xl">
                                    <video 
                                        className="w-full aspect-video object-contain" 
                                        src={videoURL} 
                                        controls 
                                        playsInline 
                                        preload="metadata"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Name Field */}
                        <div className="space-y-3">
                            <Label htmlFor="foodName" className="text-base font-semibold">Dish Name</Label>
                            <Input
                                id="foodName"
                                type="text"
                                placeholder="e.g., Spicy Paneer Tikka Wrap"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-11 text-base border-zinc-700/50 focus-visible:ring-[#bff364]"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="space-y-3">
                            <Label htmlFor="foodDesc" className="text-base font-semibold">Description</Label>
                            <Textarea
                                id="foodDesc"
                                rows={4}
                                placeholder="Describe your dish: key ingredients, flavors, spice level, or what makes it special..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="resize-none text-base border-zinc-700/50 focus-visible:ring-[#bff364]"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button 
                                className="w-full h-12 text-base font-bold tracking-wide bg-[#bff364] text-black hover:bg-[#bff364]/90 shadow-lg shadow-[#bff364]/20 hover:shadow-xl hover:shadow-[#bff364]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                                type="submit" 
                                disabled={isDisabled || loading}
                            >
                                {loading ? "Creating..." : isDisabled ? "Fill all required fields" : "Create Food Reel"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

// Helper function (inline cn utility if not using it from lib/utils)
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default CreateFood;