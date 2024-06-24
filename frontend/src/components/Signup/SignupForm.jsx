import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import logo from "../../assets/log-in.webp";

const SignupForm = () => {
  // Paramètres d'animation pour l'image
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Image commence cachée et hors de l'écran à gauche
    visible: {
      opacity: 2,
      x: 0,
      transition: { type: "spring", duration: 1, bounce: 0.3 },
    }, // Image se déplace vers sa position normale avec un effet 'ressort'
  };

  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div variants={imageVariants} initial="hidden" animate="visible">
          <img
            src={logo}
            alt="Signup Visual"
            className="w-full object-cover h-40 rounded-xl md:h-full"
          />
        </motion.div>
        <div className="p-2">
          <h2 className="text-2xl font-bold mb-4">Inscription</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("Required"),
              lastName: Yup.string().required("Required"),
              email: Yup.string()
                .email("L'adresse e-mail saisie est invalide")
                .required("Ce champ est obligatoire."),
              password: Yup.string()
                .min(
                  6,
                  "Votre mot de passe doit contenir au moins 6 caractères."
                )
                .required("Ce champ est obligatoire."),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex-1 mr-2">
                  <label htmlFor="firstName" className="text-left mb-1">
                    Nom
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Votre Nom"
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs mb-2"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <label htmlFor="lastName" className="text-left mb-1">
                    Prenom
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Votre Prenom"
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs mb-2"
                  />
                </div>
              </div>

              <label htmlFor="email" className="text-left mb-1">
                Adresse Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Votre adresse e-mail"
                className="p-2 mb-4 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mb-2"
              />

              <label htmlFor="password" className="text-left mb-1">
                Mot de passe
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Votre mot de passe"
                className="p-2 mb-4 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mb-2"
              />

              <div className="flex items-center mb-4">
                <Field type="checkbox" name="rememberMe" className="mr-2" />
                Se souvenir de moi
              </div>

              <button
                type="submit"
                className="bg-custom-main-orange text-white py-2 rounded"
              >
                Inscrivez-vous
              </button>

              <div className="mt-4">
                Vous avez déjà un compte?{" "}
                <a href="/login" className="text-caramel">
                  Connectez-vous!
                </a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
