import mongoose from 'mongoose';

const SubscriptionStatusSchema = new mongoose.Schema({
  purchase_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase',
    required: true,
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  renewDate: {
    type: Date,
    default: Date.now,
  },
});

const SubscriptionStatus = mongoose.model('SubscriptionStatus', SubscriptionStatusSchema);
export default SubscriptionStatus;
