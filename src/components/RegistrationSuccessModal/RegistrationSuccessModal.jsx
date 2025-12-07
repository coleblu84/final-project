import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationSuccessModal({ isOpen, onClose, switchToLogin }) {
  const handleSignInClick = (e) => {
    e.preventDefault();
    switchToLogin();
  };

  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSignInClick}
      submitButtonText="Sign in"
      isSubmitDisabled={false}
    />
  );
}

export default RegistrationSuccessModal;
