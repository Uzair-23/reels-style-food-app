import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string
const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="h-dvh overflow-hidden bg-black md:flex md:items-center md:justify-center">
      <div
        className="h-full w-full md:max-w-[470px] md:h-[calc(100dvh-2rem)] md:my-4 snap-y snap-mandatory overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] md:rounded-xl md:shadow-2xl"
        role="list"
      >
        {items.length === 0 && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/6 ring-1 ring-white/8 backdrop-blur-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p className="text-sm font-medium tracking-wide text-white/40">{emptyMessage}</p>
            </div>
          </div>
        )}

        {items.map((item) => (
          <section key={item._id} className="relative h-dvh md:h-full w-full snap-start bg-black md:first:rounded-t-xl md:last:rounded-b-xl" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="absolute inset-0 h-full w-full object-cover object-center md:object-contain"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* Overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-end">
              {/* Gradient */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.75) 100%)',
                }}
              />

              {/* Right-side action buttons */}
              <div className="pointer-events-auto absolute right-4 bottom-28 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                {/* Like */}
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900/60 ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-800/80 hover:scale-110 hover:shadow-lg hover:shadow-[#bff364]/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#bff364] focus-visible:outline-offset-2"
                    aria-label="Like"
                  >
                    <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-white drop-shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:text-[#bff364]">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <span className="text-xs font-bold tabular-nums text-white/90 drop-shadow-lg">
                    {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                  </span>
                </div>

                {/* Save */}
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900/60 ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-800/80 hover:scale-110 hover:shadow-lg hover:shadow-[#bff364]/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#bff364] focus-visible:outline-offset-2"
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Bookmark"
                  >
                    <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-white drop-shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:text-[#bff364]">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <span className="text-xs font-bold tabular-nums text-white/90 drop-shadow-lg">
                    {item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
                  </span>
                </div>

                {/* Comments */}
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900/60 ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-800/80 hover:scale-110 hover:shadow-lg hover:shadow-[#bff364]/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#bff364] focus-visible:outline-offset-2"
                    aria-label="Comments"
                  >
                    <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-white drop-shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:text-[#bff364]">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <span className="text-xs font-bold tabular-nums text-white/90 drop-shadow-lg">
                    {item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}
                  </span>
                </div>
              </div>

              {/* Bottom content */}
              <div className="pointer-events-auto relative flex w-full flex-col gap-3 px-5 pr-18 md:pr-5 pb-[calc(env(safe-area-inset-bottom,0px)+72px)] md:pb-[calc(env(safe-area-inset-bottom,0px)+88px)] md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <p
                  className="line-clamp-2 md:line-clamp-3 max-w-[90ch] text-[15px] font-medium leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:max-w-full md:text-base tracking-tight"
                  title={item.description}
                >
                  {item.description}
                </p>
                {item.foodPartner && (
                  <Link
                    className="group/btn relative self-start overflow-hidden rounded-full bg-[#bff364] px-5 py-2.5 text-[13px] font-bold tracking-widest uppercase text-black shadow-xl shadow-black/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#bff364]/40 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#bff364] focus-visible:outline-offset-2"
                    to={"/food-partner/" + item.foodPartner}
                    aria-label="Visit store"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/25 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 group-hover/btn:animate-[shimmer_1.5s_ease-in-out_infinite]" />
                    <span className="relative lime-glow">Visit Store</span>
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed
