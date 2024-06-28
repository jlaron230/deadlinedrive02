import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FetchData({ userId }) {
  const [user, setUser] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(response.data);
      setFormValues(response.data); // Set form values to fetched user data
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data'); // Set error state for display
    }
  };

  // Fetch user data when component mounts or userId changes
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Function to handle edit mode toggling
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // Reset form values to current user data when entering edit mode
  };

  // Function to save edited user data
  const handleSaveClick = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/users/${userId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false); // Exit edit mode after successful save
      fetchUserData(); // Refetch user data to update the state
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Failed to update user data'); // Set error state for display
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ce champ est obligatoire"),
    lastName: Yup.string().required("Ce champ est obligatoire"),
    email: Yup.string().email("Adresse e-mail invalide").required("Ce champ est obligatoire"),
  });

  return (
    <div>
      {user ? (
        <div>
          <Formik
            initialValues={formValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSaveClick}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <div className="flex flex-wrap max-lg:justify-center gap-3">
                  <div className="flex max-lg:justify-center">
                    <Button type="button" edit={handleEditClick} text={isEditing ? "Annuler" : "Éditer"} />
                  </div>
                  {isEditing && (
                    <div className="flex max-lg:justify-center">
                      <Button type="submit" text={"Sauvegarder"} disabled={isSubmitting} />
                    </div>
                  )}
                </div>

                <div className="flex max-lg:justify-center">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 gap-8 flex flex-wrap">
                    <div>
                      <dd className="text-sm font-medium leading-6 text-gray-900">Nom</dd>
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        {isEditing ? (
                          <Field
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                          />
                        ) : (
                          `${user.firstName}`
                        )}
                        <ErrorMessage name="firstName" component="div" className="text-red-600" />
                      </dt>
                    </div>
                    <div>
                      <dd className="text-sm font-medium leading-6 text-gray-900">Prénom</dd>
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        {isEditing ? (
                          <Field
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                          />
                        ) : (
                          `${user.lastName}`
                        )}
                        <ErrorMessage name="lastName" component="div" className="text-red-600" />
                      </dt>
                    </div>
                    <div>
                      <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Adresse email</dd>
                      <dt className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {isEditing ? (
                          <Field
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                          />
                        ) : (
                          user.email
                        )}
                        <ErrorMessage name="email" component="div" className="text-red-600" />
                      </dt>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchData;
