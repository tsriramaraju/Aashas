enum authType {
  email,
  mobile,
  facebook,
  google,
}

enum verification {
  pending = 'pending',
  no = 'no',
  yes = 'yes',
}

enum paymentStatus {
  pending = 'pending',
  paid = 'paid',
  failed = 'failed',
}

enum paymentModes {
  creditCard = 'Credit Card',
  debitCard = 'Debit Card',
  paytm = 'Paytm',
  UPI = 'UPI',
}
enum size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

enum categories {
  men,
  women,
  kids,
}

export {
  authType,
  verification,
  paymentStatus,
  paymentModes,
  size,
  categories,
};
