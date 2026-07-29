import mongoose from "mongoose";

const ECPGameProgressSchema = new mongoose.Schema(
    {
        domainId: String,
        currentStage: Number,

        completedStages: [String],

        totalScore: {
            type: Number,
            default: 0
        },

        lastPlayed: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "ecpgameprogress"
    }
);

export default mongoose.models.ECPGameProgress ||
    mongoose.model(
        "ECPGameProgress",
        ECPGameProgressSchema
    );