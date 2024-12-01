import React from 'react'
import { Text } from '../../common/locale/script'
import { useSelector } from 'react-redux'

function Payment() {
  const locale = useSelector((state) => state.locale.value)
  const redirectToUPI = () => {
    const upiID = "yagnesyagne@ybl";
    const payeeName = "yagnesh";
    const amount = "100";
    const currency = "INR";
    const transactionNote = "Payment to rocket post for the delivery";

    const upiUrl = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=${currency}&tn=${encodeURIComponent(transactionNote)}`;

    // Redirect to UPI app
    window.location.href = upiUrl;
  };
  return (
    <div>
      <button onClick={redirectToUPI}>Pay via UPI</button>
    </div>
  )
}

export default Payment