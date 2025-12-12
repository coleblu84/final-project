import { useState } from "react";

export default function useFormValidation(
  initialValues = {},
  requiredFields = [],
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";

    if (name === "email") {
      if (!value) {
        errorMsg = "Email is required";
      } else if (!emailPattern.test(value)) {
        errorMsg = "Please enter a valid email.";
      }
    } else if (name === "password") {
      if (!value) {
        errorMsg = "Password is required";
      } else if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters.";
      }
    } else if (name === "name") {
      if (!value) {
        errorMsg = "Name is required";
      } else if (value.length < 2) {
        errorMsg = "Name must be at least 2 characters.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  }

  const allRequiredFilled = requiredFields.every(
    (field) => values[field] && values[field].trim() !== "",
  );

  const noErrors = Object.values(errors).every((err) => !err);

  const isValid = allRequiredFilled && noErrors;

  function resetForm() {
    setValues(initialValues);
    setErrors({});
  }

  return { values, errors, isValid, handleChange, resetForm };
}
