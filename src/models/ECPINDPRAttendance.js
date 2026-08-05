import mongoose from "mongoose";

const ECPINDPRAttendanceSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
            enum: [
                "India",
                "Puerto Rico"
            ],
        },

        checkInDate: {
            type: String,
            required: true,
        },

        checkInTime: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "ecpindprattendance",
    }
);

export default mongoose.models.ECPINDPRAttendance ||
    mongoose.model(
        "ECPINDPRAttendance",
        ECPINDPRAttendanceSchema
    );