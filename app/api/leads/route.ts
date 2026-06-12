import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, lookingFor, preferredTime } = body;

    // Basic validation
    if (!name || !mobile || !lookingFor || !preferredTime) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // TODO: Connect to MongoDB and save lead
    // const { default: connectDB } = await import("@/lib/mongodb");
    // const { Lead } = await import("@/lib/models/Lead");
    // await connectDB();
    // await Lead.create({ name, mobile, lookingFor, preferredTime });

    console.log("[Lead Captured]", { name, mobile, lookingFor, preferredTime });

    return NextResponse.json(
      { message: "Lead captured successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/leads]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
