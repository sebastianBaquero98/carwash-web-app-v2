import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  const { to, body } = await request.json();

  try {
    const message = await client.messages.create({
      body,
      messagingServiceSid: "MGb319290fc6161c882b18b689c2beae48",
      to,
    });
    return NextResponse.json({ success: true, messageId: message.sid });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
