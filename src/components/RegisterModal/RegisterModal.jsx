import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="modal__label">
        Email
        <input type="email" required className="modal__input" />
      </label>

      <label className="modal__label">
        Password
        <input type="password" required className="modal__input" />
      </label>

      <label className="modal__label">
        Username
        <input type="text" required className="modal__input" />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
