import express from 'express';
import SubscriptionStatus from '../models/SubscriptionStatusSchema.js';

const router = express.Router();

router.post('/subscription-status', async (req, res) => {
  try {
    const { purchase_id, payment_id } = req.body;

    const status = purchase_id && payment_id ? true : false;

    const subscriptionStatus = new SubscriptionStatus({
      purchase_id,
      payment_id,
      status,
    });

    await subscriptionStatus.save();
    res.status(201).send(subscriptionStatus);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
