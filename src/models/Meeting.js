import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  agenda: {
    type: String,
    required: [true, 'Agenda is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  meetingUrl: {
    type: String,
    required: [true, 'Meeting URL is required']
  }
}, {
  timestamps: true
});

export default mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema); 