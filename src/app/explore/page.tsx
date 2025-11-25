"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export default function ExplorePage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  async function getMotivation() {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error("Gagal ambil quote", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMotivation();
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-primary">Mood Booster</h1>
        <p className="text-muted">Sedang lelah belajar? Cari inspirasi di sini.</p>
      </div>

      <div className="card shadow-lg border-0 text-center p-5" style={{ maxWidth: "700px", borderRadius: "20px" }}>
        <div className="card-body">
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : quote ? (
            <>
              <i className="bi bi-quote fs-1 text-warning mb-3 d-block"></i>
              <h3 className="fst-italic fw-light mb-4">"{quote.quote}"</h3>
              <h6 className="fw-bold text-uppercase letter-spacing-2 text-primary">
                — {quote.author}
              </h6>
            </>
          ) : (
            <p>Gagal memuat data.</p>
          )}

          <hr className="my-5" />

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button 
              onClick={getMotivation} 
              className="btn btn-warning text-dark fw-bold px-4"
              disabled={loading}
            >
              <i className="bi bi-shuffle me-2"></i> Quote Lain
            </button>
            <Link href="/" className="btn btn-outline-secondary px-4">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-muted small">
        Data diambil dari <a href="https://dummyjson.com/" target="_blank" className="text-decoration-none">DummyJSON API</a>
      </div>
    </div>
  );
}