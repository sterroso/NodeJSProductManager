export const PAYMENT_FORMS = {
  CREDIT_CARD: "Credit card",
  DEBIT_CARD: "Debit card",
  WIRE_TRANSFER: "Wire transfer / Electronic transfer",
  E_CHEQUE: "Electronic cheque",
  CASH_DEPOSIT: "Cash deposit",
  PAYPAY: "PayPal",
  COD: "Cash on delivery",
  DISCOUNT_CODE: "Discount code",
  SIMPLE_DISCOUNT: "Simple discount",
  REIMBURSEMENT: "Reimbursement",
};

export const DEFAULT_PAYMENT_FORM = PAYMENT_FORMS.CREDIT_CARD;

export const CARD_TYPES = {
  MC: "Master Card",
  VISA: "Visa",
  AMEX: "American Express",
};

export const PAYMENT_STATUS = {
  ON_HOLD: "On hold",
  REJECTED_BY_ISSUER: "Rejected by issuer",
  REJECTED_BY_SELLER: "Rejected by seller",
  ACCEPTED: "Accepted",
};

export const VALID_CVV_PATTERN = /^[0..9]{3,4}$/;
