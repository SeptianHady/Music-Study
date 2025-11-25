import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM musics ORDER BY id DESC');
    const musics = stmt.all();
    
    return NextResponse.json(musics);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, artist, genre, mood, spotify_link } = body;

    const stmt = db.prepare(`
      INSERT INTO musics (title, artist, genre, mood, spotify_link) 
      VALUES (?, ?, ?, ?, ?)
    `);

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