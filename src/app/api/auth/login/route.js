import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import ECPAssociate from "@/models/ECPAssociate";
import ECPAttendance from "@/models/ECPAttendance";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const domainId = body.domainId?.trim().toUpperCase();

        if (!domainId) {
            return NextResponse.json({
                success: false,
                message: "US Domain is required.",
            });
        }

        const associate = await ECPAssociate.findOne({
            domainId: domainId,
        });

        if (!associate) {
            return NextResponse.json({
                success: false,
                message: "US Domain not found.",
            });
        }

        const today = new Date().toISOString().split("T")[0];

        const existingAttendance = await ECPAttendance.findOne({
            domainId: domainId,
            checkInDate: today,
        });

        if (!existingAttendance) {
            await ECPAttendance.create({
                domainId: associate.domainId,
                employeeId: associate.employeeId,
                firstName: associate.firstName,
                lastName: associate.lastName,
                group: associate.group,
                tower: associate.tower,

                checkInDate: today,
                checkInTime: new Date().toLocaleTimeString(),
            });
        }

        return NextResponse.json({
            success: true,
            user: associate,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}