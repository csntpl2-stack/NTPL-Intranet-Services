import React from "react";

const Modal = ({ show, onClose, content, isPoster }) => {
  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1" style={{ display: show ? "block" : "none", background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "80vw", width: "80%" }}>
        <div className="modal-content" style={{ width: "100%", height: "80vh" }}>
          <div className="modal-header">
            <h5 className="modal-title">Vigilance Awareness Campaign 2025</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center" style={{ height: "90%",width:'100%' }}>
            {isPoster ? (
              <img src={content} alt="Poster" className="img-fluid" style={{ maxHeight: "100%", width: "100%", objectFit: "contain" }} />
            ) : (
              <p className="text-muted" style={{ fontSize: "1.5rem" }}>{content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
