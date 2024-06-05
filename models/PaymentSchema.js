import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cartão de Crédito', 'PayPall', 'Pague com Amazon', 'Débito Automático'],
  },
  // Credit Card fields
  creditCardBrand: { type: String, required: function() { return this.paymentMethod === 'credit_card'; } },
  creditCardNumber: { type: String, required: function() { return this.paymentMethod === 'credit_card'; } },
  creditCardExpiry: { type: String, required: function() { return this.paymentMethod === 'credit_card'; } },
  creditCardCVS: { type: String, required: function() { return this.paymentMethod === 'credit_card'; } },
  clientName: { type: String, required: function() { return this.paymentMethod === 'credit_card' || this.paymentMethod === 'bank_transfer'; } },
  clienteCpf: { type: String, required: function() { return this.paymentMethod === 'credit_card' || this.paymentMethod === 'bank_transfer'; } },
  creditCardTermsAccepted: { type: Boolean, required: function() { return this.paymentMethod === 'credit_card'; } },
  
  // PayPal fields
  payPallEmail: { type: String, required: function() { return this.paymentMethod === 'paypal'; } },
  payPallPassword: { type: String, required: function() { return this.paymentMethod === 'paypal'; } },
  payPallTermsAccepted: { type: Boolean, required: function() { return this.paymentMethod === 'paypal'; } },
  
  // Amazon fields
  amazonEmail: { type: String, required: function() { return this.paymentMethod === 'amazon'; } },
  amazonPassword: { type: String, required: function() { return this.paymentMethod === 'amazon'; } },
  amazonTermsAccepted: { type: Boolean, required: function() { return this.paymentMethod === 'amazon'; } },
  
  // Bank Transfer fields
  bankName: { type: String, required: function() { return this.paymentMethod === 'bank_transfer'; } },
  bankAccountNumber: { type: String, required: function() { return this.paymentMethod === 'bank_transfer'; } },
  bankRoutingNumber: { type: String, required: function() { return this.paymentMethod === 'bank_transfer'; } },
  bankAccountAgencyNumber: { type: String, required: function() { return this.paymentMethod === 'bank_transfer'; } },
  bankTransferTermsAccepted: { type: Boolean, required: function() { return this.paymentMethod === 'bank_transfer'; } },
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
