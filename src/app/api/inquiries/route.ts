import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to SQLite
    const inquiry = await db.inquiry.create({
      data: {
        name,
        phone,
        email,
        message,
      },
    });

    // Send WhatsApp notification
    await sendWhatsAppNotification({
      type: "inquiry",
      details: {
        name,
        phone,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error("API Error in POST /api/inquiries:", err);
    return NextResponse.json({ error: err.message || "Failed to create inquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("API Error in GET /api/inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updated = await db.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("API Error in PATCH /api/inquiries:", error);
    return NextResponse.json({ error: "Failed to update inquiry status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing inquiry id" }, { status: 400 });
    }

    await db.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("API Error in DELETE /api/inquiries:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
