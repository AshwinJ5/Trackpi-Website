import React, { useState, useEffect } from "react";
import JobFairReg from "./JobFairReg";
import "../../CSS/JobFair/jobs.css";

function Jobs({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <JobFairReg />

      {/* Show the popup conditionally */}
      {isOpen && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-box">
            <h2 className="fw-bold">Join TRACKPI's Exclusive Online Job Fair</h2>
            <h4 className="fw-bold text-center">Let's Build Your Team Together!</h4>
            <p>
              TRACKPI "YOUR STRATEGIC GROWTH PARTNER" wishes to extend a warm welcome to you for joining our Online Job Fair. Before you dive in, we want to share a few very important points you should know:
            </p>
            <ul className="modal-list ms-3">
              <li>✅ This form can be filled out only by a senior decision-maker.</li>
              <li>(CEO, CMO, CTO, CLO, CFO, CPO, COO, CHRO)</li>
              <li>✅ Only your corporate email is accepted. Public domains (e.g., @gmail.com) will not be accepted.</li>
              <li>✅ Proofread and check for accuracy before submission.</li>
              <li>✅ All complimentary gifts can be claimed without being shy!</li>
              <li>✅ If you need assistance, do not hesitate to contact us at any time.</li>
            </ul>
            <p className="modal-footer-text fw-bold text-center">
              To begin your registration process, click on 'Proceed'!
            </p>
            <div className="d-flex justify-content-center">
              <button className="btn-warning fw-bold px-4" onClick={handleClose} >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Jobs;
