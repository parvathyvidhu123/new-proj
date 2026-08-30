import { db } from "./db";

type BookingNotificationData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  style: string;
  placement: string;
  size: string;
  date: string;
  time: string;
  notes?: string;
};

type InquiryNotificationData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export async function sendWhatsAppNotification(
  data: { type: "booking"; details: BookingNotificationData } | { type: "inquiry"; details: InquiryNotificationData }
) {
  // 1. Build the message body
  let message = "";
  const ownerPhone = process.env.OWNER_PHONE_NUMBER || "+919746695575"; // default contact number
  const provider = process.env.WHATSAPP_PROVIDER || "mock";

  if (data.type === "booking") {
    const d = data.details;
    message = `🔔 New Tattoo Inquiry\n` +
      `Name: ${d.name}\n` +
      `Phone: ${d.phone}\n` +
      `Tattoo Style: ${d.style}\n` +
      `Preferred Size: ${d.size}\n` +
      `Preferred Date: ${d.date}\n` +
      `Service: ${d.service}\n` +
      `Placement: ${d.placement}\n` +
      `Time: ${d.time}\n` +
      `Notes: ${d.notes || "None"}\n\n` +
      `Please check the dashboard for full details.`;
  } else {
    const d = data.details;
    message = `🔔 New General Inquiry\n` +
      `Name: ${d.name}\n` +
      `Phone: ${d.phone}\n` +
      `Email: ${d.email}\n` +
      `Message: ${d.message}\n\n` +
      `Please check the dashboard for full details.`;
  }

  console.log(`[WhatsApp Service] Sending notification via ${provider} to ${ownerPhone}...`);
  console.log(message);

  let status = "Sent";
  let errorMsg: string | null = null;

  try {
    if (provider === "twilio") {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_FROM_NUMBER || "+14155238886";

      if (!accountSid || !authToken) {
        throw new Error("Missing Twilio Account SID or Auth Token in environment variables.");
      }

      const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: `whatsapp:${fromNumber}`,
            To: `whatsapp:${ownerPhone}`,
            Body: message,
          }),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || `Twilio error: ${response.statusText}`);
      }
      console.log(`[WhatsApp Service] Twilio message sent: ${resData.sid}`);
    } else if (provider === "whatsapp_cloud") {
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

      if (!phoneNumberId || !accessToken) {
        throw new Error("Missing WhatsApp Cloud API Phone Number ID or Access Token.");
      }

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: ownerPhone.startsWith("+") ? ownerPhone.replace("+", "") : ownerPhone,
            type: "text",
            text: { body: message },
          }),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error?.message || `WhatsApp Cloud API error: ${response.statusText}`);
      }
      console.log(`[WhatsApp Service] WhatsApp Cloud API message sent: ${resData.messages?.[0]?.id}`);
    } else if (provider === "callmebot") {
      const apiKey = process.env.CALLMEBOT_API_KEY;
      if (!apiKey) {
        throw new Error("Missing CALLMEBOT_API_KEY in environment variables.");
      }
      const cleanPhone = ownerPhone.replace("+", "");
      const response = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`CallMeBot request failed: ${response.statusText}`);
      }
      console.log(`[WhatsApp Service] CallMeBot message successfully dispatched.`);
    } else {
      // Mock mode: just log and succeed
      console.log(`[WhatsApp Service] MOCK WhatsApp notification logged successfully.`);
    }
  } catch (err) {
    status = "Failed";
    errorMsg = (err as Error).message || String(err);
    console.error(`[WhatsApp Service] Failed to send WhatsApp message:`, err);
  }

  // Log message transaction history to local SQLite
  try {
    await db.whatsappLog.create({
      data: {
        recipient: ownerPhone,
        message,
        status,
        error: errorMsg,
      },
    });
  } catch (dbErr) {
    console.error("[WhatsApp Service] Failed to save WhatsappLog to DB:", dbErr);
  }

  return { success: status === "Sent", error: errorMsg };
}
