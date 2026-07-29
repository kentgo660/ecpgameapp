import mongoose from "mongoose";

const ECPAttendanceSchema = new mongoose.Schema(
    {
        domainId: String,
        employeeId: Number,
        firstName: String,
        lastName: String,
        group: String,
        tower: String,

        checkInDate: String,
        checkInTime: String,

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "ecpattendance",
    }
);

export default mongoose.models.ECPAttendance ||
    mongoose.model("ECPAttendance", ECPAttendanceSchema);