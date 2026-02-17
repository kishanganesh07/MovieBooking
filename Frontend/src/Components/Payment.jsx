import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const FakePayment = ({ amount, bookingData, onClose, onBookingComplete }) => {
  const [step, setStep] = useState("upi"); 
  const [transactionId, setTransactionId] = useState("");

  const generateTransactionId = () => {
    return "TXN" + Math.floor(100000000 + Math.random() * 900000000);
  };

  const handlePayment = () => {
  setStep("loading");

  setTimeout(() => {
    const txn = generateTransactionId();
    setTransactionId(txn);
    setStep("success");

    // Wait 3 seconds BEFORE navigating
    setTimeout(() => {
      onBookingComplete(txn);
    }, 3000);

  }, 3000);
};

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[380px] p-6 rounded-xl shadow-xl relative">
        {step === "upi" && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              UPI Payment
            </h2>

            <div className="flex justify-center mb-4">
              <QRCodeCanvas
                value={`upi://pay?pa=movie@upi&pn=MovieApp&am=${amount}`}
                size={150}
              />
            </div>

            <div className="bg-gray-700 p-3 rounded-lg text-center mb-4">
              <p className="text-sm text-gray-100">Paying To</p>
              <p className="font-semibold">movie@upi</p>
            </div>

            <p className="text-center text-lg font-bold mb-4">
              ₹ {amount}
            </p>

            <button
              onClick={handlePayment}
              className="w-full bg-red-600 hover:bg-red-400 text-white py-2 rounded-lg transition cursor-pointer"
            >
              Pay Now
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 text-gray-500 cursor-pointer"
            >
              Cancel
            </button>
          </>
        )}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-red-600 font-medium">
              Processing Payment...
            </p>
          </div>
        )}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-green-600 font-semibold text-lg">
              Payment Successful
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Transaction ID:
            </p>
            <p className="font-mono text-sm text-black">{transactionId}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default FakePayment;
