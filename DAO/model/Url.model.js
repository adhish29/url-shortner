import mongoose, { Schema } from "mongoose";

const URLSchema = new Schema(
  {
    _id: { type: String, required: true },
    shortURL: { type: String, required: true, unique: true },
    redirectedURL: { type: String, required: true },
    visitHistory: [
      {
        clientAddress: { type: String },
        timestamp: { type: String },
      },
    ],
    createdBy: { type: String },
  },
  { timestamps: true, strict: false }
);

export default mongoose.connection.useDb("TestDB").collection("URL", URLSchema);
