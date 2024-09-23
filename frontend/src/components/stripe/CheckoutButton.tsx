"use client";
import React from "react";

const CheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/stripe/create-checkout-session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded"
    >
      有料プランへ
    </button>
  );
};

export default CheckoutButton;
