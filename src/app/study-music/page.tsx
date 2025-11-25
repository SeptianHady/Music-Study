"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Music = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  spotify_link?: string;
};

export default function StudyMusicPage() {
  const [musics, setMusics] = useState<Music[]>([]);
  
  // State Form
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    mood: "",
    spotify_link: "",
  });

  // State Tambahan untuk Edit Mode
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMusics() {
    try {
      const res = await fetch("/api/musics");
      const data = await res.json();
      setMusics(data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  }

  useEffect(() => {
    fetchMusics();
  }, []);

  // --- 2. HANDLE DELETE ---
  async function handleDelete(id: number) {
    if(!confirm("Yakin ingin menghapus lagu ini?")) return;

    try {
      await fetch(`/api/musics/${id}`, {
        method: "DELETE",
      });
      fetchMusics();
    } catch (error) {
      alert("Gagal menghapus data");
    }
  }

  // Fungsi ini dipanggil saat tombol "Edit" diklik
  function handleEdit(music: Music) {
    setEditId(music.id);
    setFormData({
      title: music.title,
      artist: music.artist,
      genre: music.genre,
      mood: music.mood || "",
      spotify_link: music.spotify_link || "",
    });
  }

  function handleCancel() {
    setEditId(null);
    setFormData({ title: "", artist: "", genre: "", mood: "", spotify_link: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editId) {
        await fetch(`/api/musics/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("/api/musics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      handleCancel();
      fetchMusics(); 

    } catch (error) {
      alert("Gagal menyimpan data!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">🎵 MyPlaylist</h1>
        <Link href="/" className="btn btn-secondary btn-sm">Kembali</Link>
      </div>

      <div className="row g-4">
        {/* FORM INPUT / EDIT */}
        <div className="col-md-4">
          <div className={`card shadow-sm border-${editId ? 'primary' : 'success'}`}>
            <div className={`card-header text-white fw-bold ${editId ? 'bg-primary' : 'bg-success'}`}>
              {editId ? "Edit Lagu" : "Tambah Lagu Baru"}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Judul Lagu</label>
                  <input type="text" className="form-control" required
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Artis</label>
                  <input type="text" className="form-control" required
                    value={formData.artist} 
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <select className="form-select" required
                    value={formData.genre} 
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  >
                    <option value="">Pilih Genre...</option>
                    <option value="Lofi">Lofi Beats</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Piano">Classical Piano</option>
                    <option value="Nature">Suara Alam</option>
                    <option value="Pop">Pop / Akustik</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mood</label>
                  <input type="text" className="form-control" placeholder="Cth: Santai, Fokus"
                    value={formData.mood} 
                    onChange={(e) => setFormData({ ...formData, mood: e.target.value })} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">YouTube Link</label>
                  <input type="text" className="form-control" placeholder="Link YouTube"
                    value={formData.spotify_link || ""} 
                    onChange={(e) => setFormData({ ...formData, spotify_link: e.target.value })} 
                  />
                  <div className="form-text small">
                    Copy Link video dari YouTube.
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className={`btn ${editId ? 'btn-primary' : 'btn-success'}`} disabled={isLoading}>
                    {isLoading ? "Proses..." : (editId ? "Update Perubahan" : "Simpan Lagu")}
                  </button>
                  
                  {editId && (
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* LIST DATA */}
        <div className="col-md-8">
          {musics.length === 0 ? (
            <div className="alert alert-info text-center">Belum ada data musik.</div>
          ) : (
            <div className="list-group">
              {musics.map((m) => (
                <div key={m.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                  <Link href={`/study-music/${m.id}`} className="text-decoration-none text-dark">
                    <h5 className="mb-1 fw-bold text-primary" style={{ cursor: "pointer" }}>{m.title} <i className="bi bi-play-circle-fill ms-1 small"></i></h5>
                  </Link>
                    <p className="mb-1 text-muted small">
                      <i className="bi bi-music-note-beamed"></i> {m.artist} &nbsp;|&nbsp; {m.genre}
                    </p>
                    <span className="badge bg-light text-dark border">{m.mood}</span>
                  </div>
                  
                  {/* Tombol Aksi (Edit & Delete) */}
                  <div className="btn-group">
                    <button 
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleEdit(m)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(m.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}