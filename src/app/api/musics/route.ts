import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET: Ambil data (Query SQL: SELECT)
export async function GET() {
  try {
    // prepare() menyiapkan query, all() menjalankannya dan mengambil semua data
    const stmt = db.prepare('SELECT * FROM musics ORDER BY id DESC');
    const musics = stmt.all();
    
    return NextResponse.json(musics);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

// POST: Tambah data (Query SQL: INSERT)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, artist, genre, mood, spotify_link } = body;

    // Tanda tanya (?) adalah parameter agar aman dari hack SQL Injection
    const stmt = db.prepare(`
      INSERT INTO musics (title, artist, genre, mood, spotify_link) 
      VALUES (?, ?, ?, ?, ?)
    `);

    // run() menjalankan query insert
    const info = stmt.run(title, artist, genre, mood || "-", spotify_link || "-");

    return NextResponse.json({ 
      id: info.lastInsertRowid,
      title, artist, genre, mood 
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal simpan data" }, { status: 500 });
  }
}