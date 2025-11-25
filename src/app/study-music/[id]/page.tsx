"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

type Music = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  spotify_link?: string;
};

export default function MusicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // Unboxing params
  const [music, setMusic] = useState<Music | null>(null);

  useEffect(() => {
    fetch(`/api/musics`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m: Music) => m.id === Number(resolvedParams.id));
        setMusic(found || null);
      });
  }, [resolvedParams.id]);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };

  if (!music) return <div className="p-5 text-center">Loading Data...</div>;

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow border-0" style={{ maxWidth: "700px", width: "100%", borderRadius: "15px" }}>
        
        <div className="card-header bg-danger text-white text-center py-4" style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}>
          <h2 className="h4 fw-bold mb-0">{music.title}</h2>
          <small className="text-white-50">{music.artist}</small>
        </div>

        <div className="card-body p-4">
          <div className="d-flex justify-content-center gap-2 mb-4">
            <span className="badge bg-secondary">{music.genre}</span>
            <span className="badge bg-warning text-dark">{music.mood}</span>
          </div>

          <div className="ratio ratio-16x9 mb-4 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
             {music.spotify_link && getYoutubeEmbedUrl(music.spotify_link) ? (
               <iframe
                 src={getYoutubeEmbedUrl(music.spotify_link)!}
                 title="YouTube video player"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               ></iframe>
             ) : (
               <div className="d-flex align-items-center justify-content-center bg-light text-muted h-100">
                 <p className="mb-0">Link YouTube tidak valid</p>
               </div>
             )}
          </div>

          <div className="d-grid">
            <Link href="/study-music" className="btn btn-outline-danger">
              ← Kembali ke List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}