// app/api/partner/route.js
import { connectToDatabase } from "@/lib/mongodb";
import PartnerApplication from "@/models/PartnersApplication";

export async function POST(req: any) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { fullName, email, portfolio, whyJoin, valueBring } = body;

    if (!fullName || !email || !portfolio || !whyJoin || !valueBring) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await PartnerApplication.findOne({ email });

    if (existingUser) {
      return Response.json(
        { success: false, message: "You have already submitted this form" },
        { status: 409 }
      );
    }

    const newApplication = await PartnerApplication.create({
      fullName,
      email,
      portfolio,
      whyJoin,
      valueBring,
    });

    return Response.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: newApplication,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const data = await PartnerApplication.find().sort({ createdAt: -1 });

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}