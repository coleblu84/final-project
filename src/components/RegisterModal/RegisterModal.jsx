import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidation from "../Hooks/useFormValidation.jsx";

function RegisterModal({ isOpen, onClose, onRegister, switchToLogin }) {
  const { values, errors, handleChange, isValid } = useFormValidation({}, [
    "email",
    "password",
    "name",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Sign Up"
      isSubmitDisabled={!isValid}
      alternateTextContent={
        <>
          or{" "}
          <span className="modal__link-text" onClick={switchToLogin}>
            Sign In
          </span>
        </>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="modal__error-message modal__error-message_visible">
            {errors.email}
          </span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error-message modal__error-message_visible">
            {errors.password}
          </span>
        )}
      </label>

      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="modal__error-message modal__error-message_visible">
            {errors.name}
          </span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
