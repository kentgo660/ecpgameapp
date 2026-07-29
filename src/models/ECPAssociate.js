import mongoose from "mongoose";

const ECPAssociateSchema = new mongoose.Schema(
    {
        employeeId: Number,
        domainId: String,
        firstName: String,
        lastName: String,
        position: String,
        group: String,
        tower: String,
    },
    {
        collection: "ecpassociates",
    }
);

export default mongoose.models.ECPAssociate ||
    mongoose.model("ECPAssociate", ECPAssociateSchema);