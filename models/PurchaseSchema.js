import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Definindo o schema para Purchase
const PurchaseSchema = new mongoose.Schema({
  purchase_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  plan_id: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  mostPopular: {
    type: Boolean,
    required: true,
  }, 
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  moreFeatures: {
    type: [String],
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  
});

// Middleware para criptografar a senha antes de salvar
PurchaseSchema.pre('save', async function(next) {
  const purchase = this;

  if (!purchase.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(purchase.password, salt);
    purchase.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar senha
PurchaseSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Purchase = mongoose.model('Purchase', PurchaseSchema);
export default Purchase;





