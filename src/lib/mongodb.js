import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI_CGSONE;

if (!MONGODB_URI) {
    throw new Error("MongoDB URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: process.env.MONGODB_DB,
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
}