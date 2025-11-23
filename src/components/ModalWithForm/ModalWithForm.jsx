import { useEffect } from "react";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({ title, children, onClose, buttonText, onSubmit }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // ESC key handler
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close modal" />
        </button>

        <h3 className="modal__title">{title}</h3>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
