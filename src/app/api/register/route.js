import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ECPINDPRAttendance from "@/models/ECPINDPRAttendance";

export async function POST(request) {
    try {
        await connectDB();

        const {
            domainId,
            fullName,
            country
        } = await request.json();

        // Validation

        if (!domainId || !domainId.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "US Domain is required."
                },
                {
                    status: 400
                }
            );
        }

        if (!fullName || !fullName.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Full Name is required."
                },
                {
                    status: 400
                }
            );
        }

        if (!country || !country.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Country is required."
                },
                {
                    status: 400
                }
            );
        }

        const normalizedDomain =
            domainId.trim().toUpperCase();

        const existingAttendance =
            await ECPINDPRAttendance.findOne({
                domainId: normalizedDomain
            });

        // Already registered

        if (existingAttendance) {
            return NextResponse.json({
                success: true,
                message: "Already registered.",
                user: {
                    domainId:
                        existingAttendance.domainId,
                    fullName:
                        existingAttendance.fullName,
                    country:
                        existingAttendance.country
                }
            });
        }

        const now = new Date();

        const checkInDate =
            now.toLocaleDateString("en-US");

        const checkInTime =
            now.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );

        const attendance =
            await ECPINDPRAttendance.create({
                domainId: normalizedDomain,
                fullName: fullName.trim(),
                country: country.trim(),
                checkInDate,
                checkInTime,
                createdAt: now
            });

        return NextResponse.json({
            success: true,
            message: "Registration successful.",
            user: {
                domainId:
                    attendance.domainId,
                fullName:
                    attendance.fullName,
                country:
                    attendance.country
            }
        });

    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to complete registration."
            },
            {
                status: 500
            }
        );
    }
}