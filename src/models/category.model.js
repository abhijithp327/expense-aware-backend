    import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String, 
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Category', categorySchema);
