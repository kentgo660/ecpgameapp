import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import ECPINDPRAttendance from "@/models/ECPINDPRAttendance";
import ECPGameProgress from "@/models/ECPGameProgress";

export async function GET() {
    try {

        await connectDB();

        const progressRecords =
            await ECPGameProgress
                .find({})
                .sort({
                    totalScore: -1
                })
                .lean();

        const leaderboard =
            await Promise.all(

                progressRecords.map(
                    async (record) => {

                        const attendee =
                            await ECPINDPRAttendance
                                .findOne({
                                    domainId:
                                        record.domainId
                                })
                                .lean();

                        return {

                            domainId:
                                record.domainId,

                            fullName:
                                attendee?.fullName || "",

                            country:
                                attendee?.country || "",

                            totalScore:
                                record.totalScore || 0,

                            completedStages:
                                record.completedStages || [],

                            currentStage:
                                record.currentStage || 1

                        };

                    }
                )

            );

        return NextResponse.json({
            success: true,
            leaderboard
        });

    } catch (error) {

        console.error(
            "Leaderboard Error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            {
                status: 500
            }
        );

    }
}