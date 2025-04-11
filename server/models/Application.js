
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied",
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    default: "",
  },
});

applicationSchema.index({ user: 1, status: 1 });


export default mongoose.model("Application", applicationSchema);
