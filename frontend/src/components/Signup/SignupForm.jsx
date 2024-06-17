import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import pic from '../../assets/log-in.webp'

const SignupForm = () => {
  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <div>
      <img src={pic} alt="Signup Visual" className="w-full object-cover h-40 rounded-xl md:h-full" />
      </div>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '', rememberMe: false }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
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
            <div className="flex justify-between">
              <div className="flex-1 mr-2">
                <label htmlFor="firstName" className="text-left mb-1">First Name</label>
                <Field name="firstName" type="text" placeholder="Placeholder" className="p-2 mb-4 border border-gray-300 rounded w-full" />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mb-2" />
              </div>
              <div className="flex-1 ml-2">
                <label htmlFor="lastName" className="text-left mb-1">Last Name</label>
                <Field name="lastName" type="text" placeholder="Placeholder" className="p-2 mb-4 border border-gray-300 rounded w-full" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mb-2" />
              </div>
            </div>

            <label htmlFor="email" className="text-left mb-1">Email</label>
            <Field name="email" type="email" placeholder="Placeholder" className="p-2 mb-4 border border-gray-300 rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-2" />

            <label htmlFor="password" className="text-left mb-1">Password</label>
            <Field name="password" type="password" placeholder="Placeholder" className="p-2 mb-4 border border-gray-300 rounded" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-2" />

            <div className="flex items-center mb-4">
              <Field type="checkbox" name="rememberMe" className="mr-2" />
              Remember Me
            </div>

            <button type="submit" className="bg-orange-500 text-white py-2 rounded">Sign Up</button>

            <div className="mt-4">
              Already have an account? <a href="/connexion" className="text-orange-600">Log In</a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
    </main>
  );
};

export default SignupForm;
