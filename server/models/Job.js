import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'remote', 'contract'],
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  salary: {
    type: Number,
  },
  deadline: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
