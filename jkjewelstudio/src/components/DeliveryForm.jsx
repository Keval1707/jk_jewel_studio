import React, { useState } from "react";
import Button from "./Button";


const DeliveryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    else if (!/^\d{5,6}$/.test(formData.postalCode))
      newErrors.postalCode = "Postal code must be 5 or 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="delivery-form">
      <h3>Delivery Details</h3>

      <input
        className="form-group"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />
      {errors.fullName && <span className="error">{errors.fullName}</span>}
      <div className="form-row">
        <input
          className="form-group"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          className="form-group"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-row">
        <input
          className="form-group"
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}

        <input
          className="form-group"
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div className="form-row">
        <input
          className="form-group"
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        {errors.state && <span className="error">{errors.state}</span>}

        <input
          className="form-group"
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && <span className="error">{errors.country}</span>}

        <input
          className="form-group"
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
        />
        {errors.postalCode && (
          <span className="error">{errors.postalCode}</span>
        )}
      </div>
      {/* <button type="button" className="button-primary" onClick={handleSubmit}>
        Confirm Order
      </button> */}
      <Button
                type="submit"
                text="Confirm Order"
                variant="primary"
                onClick={handleSubmit}
              />
    </div>
  );
};

export default DeliveryForm;
