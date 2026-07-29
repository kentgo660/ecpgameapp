import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import ECPAssociate from "@/models/ECPAssociate";
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

                        const associate =
                            await ECPAssociate
                                .findOne({
                                    domainId:
                                        record.domainId
                                })
                                .lean();

                        return {

                            domainId:
                                record.domainId,

                            firstName:
                                associate?.firstName || "",

                            lastName:
                                associate?.lastName || "",

                            position:
                                associate?.position || "",

                            group:
                                associate?.group || "",

                            tower:
                                associate?.tower || "",

                            totalScore:
                                record.totalScore || 0,

                            completedStages:
                                record.completedStages || []

                        };

                    }
                )

            );

        return NextResponse.json({
            success: true,
            leaderboard
        });

    } catch (error) {

        console.error(error);

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