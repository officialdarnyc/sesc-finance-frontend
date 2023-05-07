// Portal page component
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const Portal = () => {
  const [referenceId, setReferenceId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [invoicePay, setInvoicePay] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8000/api/invoices/reference/${referenceId}`
      );
      setInvoice(response.data);
      setModalIsOpen(true);
    } catch (error) {
      setError("An error occurred while fetching invoice details.");
      console.error(error);
    }
  };

  const handlePay = async () => {
    try {
      if (invoice.status === "PAID") {
        setNotification("Invoice has been paid already!");
        return;
      }
      const response = await axios.put(
        `http://localhost:8000/api/invoices/${referenceId}/pay`
      );
      setInvoicePay(response);
      setNotification("Payment has been successfully made!");
    } catch (error) {
      setError("An error occurred while making payment.");
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setInvoice(null);
    setInvoicePay(null);
  };

  const handleCloseNotification = () => {
    setNotification("");
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <body>
      <div>
        <h2>Payment Portal</h2>
        <form onSubmit={handleSubmit}>
          <h3>Enter Invoice Reference</h3>
          <input
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
            minLength={5}
            maxLength={7}
          />
          <button type="submit" onClick={handleSubmit}>
            Find Invoice
          </button>
        </form>
        <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
          {invoice && (
            <div className="Modal-content">
              <div className="Modal-header">
                <h3>Invoice Found</h3>
                <button className="Modal-close" onClick={handleModalClose}>
                  X
                </button>
              </div>
              <p>Reference: {invoice.reference}</p>
              <p>Student ID: {invoice.studentId}</p>
              <p>Amount: ${invoice.amount}</p>
              <p>Due Date: {invoice.dueDate}</p>
              <p>Type: {invoice.type}</p>
              <p>Status: {invoice.status}</p>
              <button type="submit" onClick={handlePay}>
                Pay
              </button>
              {error && (
                <div>
                  <p className="error-message">{error}</p>
                  <button onClick={handleCloseError}>X</button>
                </div>
              )}
            </div>
          )}
          {notification && (
            <div className="notification-message">
              <p>{notification}</p>
              <button onClick={handleCloseNotification}>X</button>
            </div>
          )}
        </Modal>
      </div>
    </body>
  );
};

export default Portal;
