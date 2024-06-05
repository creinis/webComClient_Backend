import express from 'express';
import Purchase from '../models/PurchaseSchema.js';

const router = express.Router();

router.post('/purchase', async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).send(purchase);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
