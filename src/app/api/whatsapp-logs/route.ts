import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const logs = await db.whatsappLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100, // limit to 100 items
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("API Error in GET /api/whatsapp-logs:", error);
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await db.whatsappLog.deleteMany({});
    return NextResponse.json({ success: true, message: "Logs cleared" });
  } catch (error) {
    console.error("API Error in DELETE /api/whatsapp-logs:", error);
    return NextResponse.json({ error: "Failed to clear logs" }, { status: 500 });
  }
}
