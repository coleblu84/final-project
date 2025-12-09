import { useEffect } from "react";
import closeIcon from "../../assets/close.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  submitButtonText,
  isSubmitDisabled,
  alternateTextContent,
}) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal__overlay modal__overlay_opened"
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <button className="modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close modal" />
        </button>

        <h3 className="modal__title">{title}</h3>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          {submitButtonText && (
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={isSubmitDisabled}
            >
              {submitButtonText}
            </button>
          )}

          {alternateTextContent && (
            <p className="modal__link-option">{alternateTextContent}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
