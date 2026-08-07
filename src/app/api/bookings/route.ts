import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, style, placement, size, date, time, notes } = body;

    // Validate essential fields
    if (!name || !phone || !email || !service || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to SQLite via Prisma
    const booking = await db.booking.create({
      data: {
        name,
        phone,
        email,
        service,
        style: style || "",
        placement: placement || "",
        size: size || "",
        date,
        time: time || "",
        notes: notes || "",
      },
    });

    // Send WhatsApp notification
    await sendWhatsAppNotification({
      type: "booking",
      details: {
        name,
        phone,
        email,
        service,
        style: style || "",
        placement: placement || "",
        size: size || "",
        date,
        time: time || "",
        notes: notes || "",
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    console.error("API Error in POST /api/bookings:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("API Error in GET /api/bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updated = await db.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("API Error in PATCH /api/bookings:", error);
    return NextResponse.json({ error: "Failed to update booking status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
    }

    await db.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error: any) {
    console.error("API Error in DELETE /api/bookings:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
