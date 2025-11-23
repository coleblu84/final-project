import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
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
    </ModalWithForm>
  );
}

export default LoginModal;
