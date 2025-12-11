import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidation from "../Hooks/useFormValidation.jsx";

function LoginModal({ isOpen, onClose, onLogin, switchToRegister }) {
  const { values, errors, handleChange, isValid } = useFormValidation({}, [
    "email",
    "password",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) onLogin(values);
  };

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isSubmitDisabled={!isValid}
      alternateTextContent={
        <>
          or{" "}
          <span className="modal__link-text" onClick={switchToRegister}>
            Sign Up
          </span>
        </>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="modal__error-message_visible">{errors.email}</span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error-message_visible">
            {errors.password}
          </span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
