import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationSuccessModal({ isOpen, onClose, switchToLogin }) {
  const handleSignInClick = (e) => {
    e.preventDefault();
    onClose();
    switchToLogin();
  };

  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSignInClick}
      submitButtonText=""
      isSubmitDisabled={false}
    >
      <div className="registration-success">
        <button
          type="button"
          className="modal__btn-success"
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegistrationSuccessModal;