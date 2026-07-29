import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import ECPGameProgress from "@/models/ECPGameProgress";

export async function POST(req) {
    try {

        await connectDB();

        const body = await req.json();

        const {
            domainId,
            stageName,
            score
        } = body;

        let progress =
            await ECPGameProgress.findOne({
                domainId
            });

        if (!progress) {

            progress =
                await ECPGameProgress.create({
                    domainId,
                    currentStage: 2,
                    completedStages: [stageName],
                    totalScore: score
                });

        } else {

            if (
                !progress.completedStages.includes(
                    stageName
                )
            ) {
                progress.completedStages.push(
                    stageName
                );

                progress.totalScore += score;

                progress.currentStage += 1;
            }

            progress.lastPlayed = new Date();

            await progress.save();
        }

        return NextResponse.json({
            success: true
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}