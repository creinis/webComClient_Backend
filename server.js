import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db-connection.js';
import Purchase from './models/PurchaseSchema.js';
import Payment from './models/PaymentSchema.js';
import SubscriptionStatus from './models/SubscriptionStatusSchema.js';


const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, './.env') });

// Conectar ao banco de dados
connectDB();

const app = express();

// Configuração de CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5500',
  'https://web-com-client-frontend.vercel.app',
  'https://web-com-client-backend.vercel.app',
  'https://web-com-client-backend.vercel.app/purchase',
  'https://web-com-client-backend.vercel.app/payment',
  'https://remind-api.vercel.app/users',
  'https://remind-api.vercel.app',
  'https://129.148.47.221:8000'

];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Helmet configuração
app.use(helmet());

app.use(bodyParser.json());

app.options('*', cors()); // Enable pre-flight requests for all routes

// Rota para criação de Purchase
app.post('/purchase', async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    console.log('Status da operação: 201 Created');
    res.status(201).send(purchase);
  } catch (error) {
    console.log('Status da operação: 400 Bad Request', error);
    res.status(400).send(error);
  }
});

// Rota para criação de Payment
app.post('/payment', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rota para criação de SubscriptionStatus
app.post('/subscription-status', async (req, res) => {
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

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`CLIENT Server running on port ${PORT}`));
