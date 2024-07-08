import React from "react";
//import formik for form
import { useFormik } from "formik";
//import yup schema
import * as Yup from "yup";
import ContactTextArea from "@components/Contact/ContactTextArea";
import ContactInputBox from "@components/Contact/ContactInputBox";

// Initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  terms: false,
};

// Validation schema using Yup
const validationSchema = Yup.object({ // First name, lastName, email, message and terms is required
  firstName: Yup.string().required("Le prénom est obligatoire"),
  lastName: Yup.string().required("Le nom est obligatoire"),
  email: Yup.string()
    .email("Email invalide")
    .required("L'email est obligatoire"),
  message: Yup.string().required("Le message est obligatoire"),
  terms: Yup.boolean().oneOf([true], "Vous devez accepter les conditions"),
});

// Simulated registration function
const register = async (values) => {
  // Replace with your own registration logic
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (values.email === "error@example.com") {
        reject({ Error: { email: "Cet email est déjà pris" } }); // Simulate email already taken error
      } else {
        resolve(); // Simulate successful registration
      }
    }, 1000);
  });
};

const Formik = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      try {
        // Call registration function with form values
        await register(values);
        resetForm(); // Reset form after successful submission
        alert("Le message s'est bien envoyé");
      } catch (error) {
        if (error.Error) {

          // Handle specific form errors
          const errors = error.Error;
          for (let key in errors) {
            setFieldError(key, errors[key]);
          }
        } else {
          alert("Une erreur s'est produite. Veuillez réessayer."); 
        }
      }
      setSubmitting(false); // Disable form submission state
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* First name input field */}
      {formik.submitForm.firstName ||
        (!formik.isValid && formik.errors.firstName && (
          <small className="error text-red-800 font-semibold">
            {formik.errors.firstName}
          </small>
        ))}
      <ContactInputBox
        type="text"
        name="firstName"
        placeholder="Votre prénom"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {/* Last name input field */}
      {formik.submitForm.lastName ||
        (!formik.isValid && formik.errors.lastName && (
          <small className="error text-red-800 font-semibold">
            {formik.errors.lastName}
          </small>
        ))}
      <ContactInputBox
        type="text"
        name="lastName"
        placeholder="Votre nom"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {/* Email input field */}
      {formik.submitForm.email ||
        (!formik.isValid && formik.errors.email && (
          <small className="error text-red-800 font-semibold">
            {formik.errors.email}
          </small>
        ))}
      <ContactInputBox
        type="email"
        name="email"
        placeholder="Votre email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {/* Message textarea field */}
      {formik.submitForm.message ||
        (!formik.isValid && formik.errors.message && (
          <small className="error text-red-800 font-semibold">
            {formik.errors.message}
          </small>
        ))}
      <ContactTextArea
        rows="6"
        name="message"
        placeholder="Votre message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {/* Checkbox to accept terms and conditions */}
      <div className="flex items-center mb-5">
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="terms"
          className="text-red ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          J'accepte les{" "}
          <a
            href="/privacy-policy"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            termes et conditions
          </a>
          .
        </label>
        {formik.submitForm.terms ||
          (!formik.isValid && formik.errors.terms && (
            <small className="error text-red-600 ml-2">
              {formik.errors.terms}
            </small>
          ))}
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="text-white btn text-black w-full rounded border border-primary bg-primary p-3 transition hover:bg-opacity-90 bg-amber-800 max-sm:w-full md:w-6/12"
        >
          Envoyer le message
        </button>
      </div>
    </form>
  );
};

export default Formik;
