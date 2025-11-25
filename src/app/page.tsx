import Link from "next/link";

export default function Home() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Card Utama */}
      <div className="card text-center shadow-lg p-5 border-0" style={{ maxWidth: "700px", borderRadius: "20px" }}>
        <div className="card-body">
          
          {/* BAGIAN DATA DIRI (Ganti dengan data aslimu) */}
          <h1 className="display-4 fw-bold text-primary mb-2">Septian Hady Putra</h1>
          <h4 className="text-secondary fw-light mb-4">NIM: 535240212</h4>
          
          <hr className="my-4" />
          
          {/* BAGIAN TOPIK PROJECT */}
          <div className="mb-5">
            <h2 className="h4 fw-bold mb-3">🎵 Study Music Companion</h2>
            <p className="text-muted">
              Aplikasi sederhana untuk menyimpan daftar musik favorit (Lofi, Jazz, Piano) 
              yang cocok menemani sesi belajar mahasiswa agar lebih fokus.
            </p>
            {/* Badges Teknologi */}
            <div className="d-flex justify-content-center gap-2">
              <span className="badge bg-dark">Next.js 15</span>
              <span className="badge bg-primary">Bootstrap 5</span>
              <span className="badge bg-warning text-dark">SQLite</span>
            </div>
          </div>

          {/* TOMBOL NAVIGASI */}
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {/* Tombol ke halaman CRUD */}
            <Link href="/study-music" className="btn btn-primary btn-lg px-4 gap-3">
              Buka Playlist
            </Link>
            
            {/* Tombol ke halaman API Explore (Soal No. 6) */}
            <Link href="/explore" className="btn btn-outline-secondary btn-lg px-4">
              Inspirasi API
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer Kecil */}
      <footer className="mt-5 text-muted small">
        &copy; 2025 Septian Hady Putra
      </footer>
    </main>
  );
}