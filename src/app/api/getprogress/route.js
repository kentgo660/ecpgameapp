import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ECPGameProgress from "@/models/ECPGameProgress";

export async function POST(req) {
    try {

        await connectDB();

        const { domainId } = await req.json();

        const progress =
            await ECPGameProgress.findOne({
                domainId
            });

        return NextResponse.json({
            success: true,
            progress
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}