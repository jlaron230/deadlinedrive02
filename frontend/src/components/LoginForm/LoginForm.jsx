import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import pic from '../../assets/log-in.webp'

const LoginForm = () => {
  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
    <div className=" max-w-6xl m-auto grid md:grid-cols-2 gap-8">
      <div>
      <img src={pic} alt="Login Visual" className="w-full object-cover h-40 rounded-xl md:h-full" />
      </div>
      <div className="p-2" >
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col">
          <label htmlFor="email" className="text-left mb-1">Email Address</label>
          <Field name="email" type="email" placeholder="Placeholder" className="p-2 mb-4 border border-gray-300 rounded" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-2" />

          <label htmlFor="password" className="text-left mb-1">Password</label>
          <Field name="password" type="password" placeholder="Placeholder" className="p-2 mb-4 border border-gray-300 rounded" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-2" />
          <div className="text-left text-gray-500 text-xs mb-4">It must be a combination of minimum 6 letters, numbers, and symbols.</div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <Field type="checkbox" name="rememberMe" className="mr-2" />
              Remember me
            </label>
            <a href="/PasswordRecovery" className="text-orange-600">Forgot Password?</a>
          </div>

          <button type="submit" className="bg-orange-500 text-white py-2 rounded">Log In</button>

          <div className="mt-4">
            No account yet? <a href="/inscription" className="text-orange-600">Sign Up</a>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
    </main>
  );
};

export default LoginForm;
