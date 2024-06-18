import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/log-in.webp'

const LoginForm = () => {
  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
    <div className=" max-w-6xl m-auto grid md:grid-cols-2 gap-8">
      <div>
      <img src={logo} alt="Login Visual" className="w-full object-cover h-40 rounded-xl md:h-full" />
      </div>
      <div className="p-2" >
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={Yup.object({
          email: Yup.string().email("L'adresse e-mail saisie est invalide").required('Ce champ est obligatoire.'),
          password: Yup.string().min(6, 'Votre mot de passe doit contenir au moins 6 caractères.').required('Ce champ est obligatoire.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col">
          <label htmlFor="email" className="text-left mb-1">Adresse Email</label>
          <Field name="email" type="email" placeholder="Votre adresse e-mail" className="p-2 mb-4 border border-gray-300 rounded" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-2" />

          <label htmlFor="password" className="text-left mb-1">Mot de passe</label>
          <Field name="password" type="password" placeholder="Votre mot de passe" className="p-2 mb-4 border border-gray-300 rounded" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-2" />
          <div className="text-left text-gray-500 text-xs mb-4">Votre mot de passe doit être une combinaison d'au moins 6 lettres, chiffres et symboles.</div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <Field type="checkbox" name="rememberMe" className="mr-2" />
              Se souvenir de moi
            </label>
            <a href="/PasswordRecovery" className="text-caramel">Mot de passe oublié?</a>
          </div>

          <button type="submit" className="bg-butterscotch text-white py-2 rounded">Connexion</button>

          <div className="mt-4">
          Vous n'avez pas encore de compte? <a href="/Signup" className="text-caramel">Créez-en un dès maintenant !</a>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
    </main>
  );
};

export default LoginForm;
