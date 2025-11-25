import { NextResponse } from "next/server";
import db from "@/lib/db";

// DELETE: Hapus data berdasarkan ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Update untuk Next.js terbaru
) {
  try {
    const { id } = await params; // Await params

    const stmt = db.prepare('DELETE FROM musics WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes === 0) {
        return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}

// PUT: Update data berdasarkan ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, artist, genre, mood, spotify_link } = body;

    const stmt = db.prepare(`
      UPDATE musics 
      SET title = ?, artist = ?, genre = ?, mood = ?, spotify_link = ? 
      WHERE id = ?
    `);

    const info = stmt.run(title, artist, genre, mood, spotify_link || "", id);

    if (info.changes === 0) {
        return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengupdate" }, { status: 500 });
  }
}