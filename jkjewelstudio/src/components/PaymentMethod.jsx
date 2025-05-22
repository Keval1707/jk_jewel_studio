import React, { useState } from "react";

const PaymentMethod = ({ onPaymentSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: "credit-card", name: "Credit/Debit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🔵" },
    { id: "upi", name: "UPI", icon: "📱" },
    { id: "net-banking", name: "Net Banking", icon: "🏦" },
    { id: "cod", name: "Cash on Delivery", icon: "💰" },
  ];

  const validateCardDetails = () => {
    const newErrors = {};
    if (!cardDetails.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!cardDetails.cardName.trim()) newErrors.cardName = "Name on card is required";

    if (!cardDetails.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiryDate))
      newErrors.expiryDate = "Invalid expiry date (MM/YY)";

    if (!cardDetails.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(cardDetails.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "expiryDate") {
      const formattedValue = value.replace(/\D/g, "").replace(/^(\d{2})/, "$1/").substring(0, 5);
      setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="payment-method">
      <h3>Payment Method</h3>

      <div className="payment-options">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-option ${selectedMethod === method.id ? "selected" : ""}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <span className="payment-icon">{method.icon}</span>
            <span className="payment-name">{method.name}</span>
          </div>
        ))}
      </div>

      {selectedMethod === "credit-card" && (
        <div className="card-details">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              maxLength="19"
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
          </div>

          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              name="cardName"
              placeholder="John Doe"
              value={cardDetails.cardName}
              onChange={handleCardInputChange}
            />
            {errors.cardName && <span className="error">{errors.cardName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardInputChange}
                maxLength="5"
              />
              {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                maxLength="4"
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}
            </div>
          </div>
        </div>
      )}

      {selectedMethod === "upi" && (
        <div className="upi-details">
          <div className="form-group">
            <label>UPI ID</label>
            <input type="text" placeholder="yourname@upi" />
          </div>
          <p className="note">You'll be redirected to your UPI app for payment</p>
        </div>
      )}

      {selectedMethod === "net-banking" && (
        <div className="netbanking-details">
          <div className="form-group">
            <label>Select Bank</label>
            <select>
              <option value="">Select your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="other">Other Banks</option>
            </select>
          </div>
          <p className="note">You'll be redirected to your bank's website for payment</p>
        </div>
      )}

      {selectedMethod === "cod" && (
        <div className="cod-notice">
          <p>Pay with cash when your order is delivered.</p>
          <p className="note">A small convenience fee may apply</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
