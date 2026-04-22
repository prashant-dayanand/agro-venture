// models/PartnerApplication.js
import mongoose from "mongoose";

const PartnerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    portfolio: {
      type: String,
      required: true,
      trim: true,
    },
    whyJoin: {
      type: String,
      required: true,
      trim: true,
    },
    valueBring: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PartnerApplication ||
  mongoose.model("PartnerApplication", PartnerApplicationSchema);