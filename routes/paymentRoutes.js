import express from 'express';
import Payment from '../models/PaymentSchema.js';

const router = express.Router();

router.post('/payment', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
