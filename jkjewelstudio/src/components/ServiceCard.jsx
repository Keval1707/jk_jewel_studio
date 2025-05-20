// src/components/ServiceCard.jsx
import React from "react";
import Fadein from "./FadeIn";

const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="service-card">
      <Fadein>
        <div className="service-icon ">
          {icon} <h3 className="service-title">{title}</h3>
        </div>
      </Fadein>
      <Fadein>
        <p className="service-description">{description}</p>
      </Fadein>
    </div>
  );
};

export default ServiceCard;
