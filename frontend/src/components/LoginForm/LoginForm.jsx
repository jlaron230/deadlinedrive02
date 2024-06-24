import React from "react"; // Import React to create the component
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components for form handling
import * as Yup from "yup"; // Import Yup for schema validation
import { motion } from "framer-motion"; // Import Framer Motion for animations
import logo from "../../assets/log-in.webp"; // Import logo image

const LoginForm = () => {
  // Animation parameters for the image
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Image starts hidden and off-screen to the left
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 2, bounce: 0.3 },
    }, // Image moves to its normal position with a 'spring' effect
  };

  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center"> {/* Main container with minimum height, centered content */}
      <div className="max-w-6xl m-auto grid md:grid-cols-2 gap-8"> {/* Responsive grid for large screens */}
        <motion.div variants={imageVariants} initial="hidden" animate="visible"> {/* Animated component for the image */}
          <img
            src={logo}
            alt="Login Visual"
            className="w-full object-cover h-40 rounded-xl md:h-full" // Logo image with styles
          />
        </motion.div>
        <div className="p-2"> {/* Container for the form */}
          <h2 className="text-2xl font-bold mb-4">Connexion</h2> {/* Form title */}
          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }} // Initial form values
            validationSchema={Yup.object({
              email: Yup.string()
                .email("L'adresse e-mail saisie est invalide")
                .required("Ce champ est obligatoire."),
              password: Yup.string()
                .min(6, "Votre mot de passe doit contenir au moins 6 caractères.")
                .required("Ce champ est obligatoire."),
            })} // Validation schema for form fields
            onSubmit={(values, { setSubmitting }) => {
              console.log(values); // Log form values to the console
              setSubmitting(false); // End form submission
            }}
          >
            <Form className="flex flex-col"> {/* Form start */}
              <label htmlFor="email" className="text-left mb-1"> {/* Label for email field */}
                Adresse Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Votre adresse e-mail"
                className="p-2 mb-4 border border-gray-300 rounded" // Email field with styles
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mb-2" // Error message for email field
              />

              <label htmlFor="password" className="text-left mb-1"> {/* Label for password field */}
                Mot de passe
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Votre mot de passe"
                className="p-2 mb-4 border border-gray-300 rounded" // Password field with styles
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mb-2" // Error message for password field
              />
              <div className="text-left text-gray-500 text-xs mb-4">
                Votre mot de passe doit être une combinaison d'au moins 6 lettres, chiffres et symboles.
              </div>

              <div className="flex justify-between items-center mb-4"> {/* Container for checkbox and forgot password link */}
                <label className="flex items-center">
                  <Field type="checkbox" name="rememberMe" className="mr-2" /> {/* Remember me checkbox */}
                  Se souvenir de moi
                </label>
                <a href="/passwordRecovery" className="text-caramel"> {/* Forgot password link */}
                  Mot de passe oublié?
                </a>
              </div>

              <button
                type="submit"
                className="bg-butterscotch text-white py-2 rounded" // Submit button with styles
              >
                Connexion
              </button>

              <div className="mt-4"> {/* Link to sign-up page */}
                Vous n'avez pas encore de compte?{" "}
                <a href="/signup" className="text-caramel">
                  Créez-en un dès maintenant !
                </a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default LoginForm; // Export LoginForm component for use in other parts of the application