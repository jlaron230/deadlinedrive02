//import { usePosts } from "../App";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import anime from 'animejs/lib/anime.es.js';
import { message } from "antd";


function Contact() {
  const [animation, setAnimation] = useState(null);
  const [animation2, setAnimation2] = useState(null);
  //Destructuration de l'objet retourné par le hook usePosts
  //const { posts, categories, setCategories, loading } = usePosts();

  // Schéma de validation
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    terms: false,
  };

  const register = async (values) => {
    // Simulez une fonction d'enregistrement asynchrone
    // Remplacez ceci par votre propre logique d'enregistrement
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.email === "error@example.com") {
          reject({ Error: { email: "Cet email est déjà pris" } });
        } else {
          resolve();
        }
      }, 1000);
    });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Le prénom est obligatoire"),
    lastName: Yup.string().required("Le nom est obligatoire"),
    email: Yup.string().email("Email invalide").required("L'email est obligatoire"),
    message: Yup.string().required("Le message est obligatoire"),
    terms: Yup.boolean().oneOf([true], "Vous devez accepter les conditions"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      try {
        // Appel de la fonction d'enregistrement avec les valeurs du formulaire
        await register(values);
        resetForm(); // Réinitialiser le formulaire après soumission réussie
        alert("Le message s'est bien envoyé"); // Afficher un message de succès
      } catch (error) {
        if (error.Error) { // Gérer les erreurs spécifiques du formulaire
          const errors = error.Error;
          for (let key in errors) {
            setFieldError(key, errors[key]); // Afficher les erreurs de champ individuelles
          }
        } else {
          alert("Une erreur s'est produite. Veuillez réessayer."); // Afficher un message d'erreur général
        }
      }
      setSubmitting(false); // Désactiver l'état de soumission du formulaire
    },
  });

  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Utilisez une classe pour cibler tous les éléments avec l'animation de fondu
      opacity: [0, 1], // Animation de fondu de 0 (invisible) à 1 (complètement visible)
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true, // Désactiver la lecture automatique pour l'animation initiale
      translateY: 30, //
    });
    setAnimation(anim); // Stockez l'objet animation dans l'état
  };

  const handleAnimationY = () => {
    const anim = anime({
      targets: '.fade-animationY', // Utilisez une classe pour cibler tous les éléments avec l'animation de fondu
      opacity: [0, 1], // Animation de fondu de 0 (invisible) à 1 (complètement visible)
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true, // Désactiver la lecture automatique pour l'animation initiale
      translateY: -30, //
    });
    setAnimation2(anim); // Stockez l'objet animation dans l'état
  };

  const handleReappearanceAnimation = () => {
    // Animation pour les nouvelles ServiceCard
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '0%'], // Déplacer la carte de 100% à 0% en X
      opacity: [0, 1], // Animation de fondu de 0 (invisible) à 1 (complètement visible)
      duration: 1000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad' // Type d'interpolation de l'animation
    });
  };

  const handleReappearanceAnimationY = () => {
    // Animation pour les nouvelles ServiceCard
    anime({
      targets: '.appear-animationY',
      translateY: ['100%', '0%'], // Déplacer la carte de 100% à 0% en X
      opacity: [0, 1], // Animation de fondu de 0 (invisible) à 1 (complètement visible)
      duration: 1000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad' // Type d'interpolation de l'animation
    });
  };
  
  
    // Fonction pour inverser l'animation
    const reverseAnimation = () => {
      if (animation) {
          handleReappearanceAnimation() // Inversez l'animation
      }
      if (animation2) {
        handleReappearanceAnimationY() // Inversez l'animation
    }
     handleReappearanceAnimationY()
      handleReappearanceAnimation(); // Lancer l'animation de réapparition
    };


    useEffect(() => {
      try{
    handleAnimation(); // Initialiser l'animation une fois au chargement du composant
    reverseAnimation();
    handleAnimationY();
    scrollToAncre()
      }catch(e){
          console.log(e);
      }
}, []);
  

    return (
        <>

          <section className="relative z-10 overflow-hidden py-20 dark:bg-dark lg:py-[120px] text-black p-12">
            <div className="container">
              <div className="-mx-4 flex flex-wrap lg:justify-center">
                <div className="w-full px-4 lg:w-1/2 xl:w-6/12 md:justify-center md:flex">
                  <div className="mb-12 max-w-[570px] lg:mb-0 appear-animation">
                    <h2 className="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                    Contactez-nous
                    </h2>
                    <div className="mb-8 flex w-full max-w-[370px]">
                      <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                          Adresse
                        </h4>
                        <p className="text-base text-body-color dark:text-dark-6">
                        30 rue de la citation 13100 Aix-en-Provence
                        </p>
                      </div>
                    </div>
    
                    <div className="mb-8 flex w-full max-w-[370px]">
                      <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_941_17577)">
                            <path
                              d="M24.3 31.1499C22.95 31.1499 21.4 30.7999 19.7 30.1499C16.3 28.7999 12.55 26.1999 9.19997 22.8499C5.84997 19.4999 3.24997 15.7499 1.89997 12.2999C0.39997 8.59994 0.54997 5.54994 2.29997 3.84994C2.34997 3.79994 2.44997 3.74994 2.49997 3.69994L6.69997 1.19994C7.74997 0.599942 9.09997 0.899942 9.79997 1.89994L12.75 6.29994C13.45 7.34994 13.15 8.74994 12.15 9.44994L10.35 10.6999C11.65 12.7999 15.35 17.9499 21.25 21.6499L22.35 20.0499C23.2 18.8499 24.55 18.4999 25.65 19.2499L30.05 22.1999C31.05 22.8999 31.35 24.2499 30.75 25.2999L28.25 29.4999C28.2 29.5999 28.15 29.6499 28.1 29.6999C27.2 30.6499 25.9 31.1499 24.3 31.1499ZM3.79997 5.54994C2.84997 6.59994 2.89997 8.74994 3.99997 11.4999C5.24997 14.6499 7.64997 18.0999 10.8 21.2499C13.9 24.3499 17.4 26.7499 20.5 27.9999C23.2 29.0999 25.35 29.1499 26.45 28.1999L28.85 24.0999C28.85 24.0499 28.85 24.0499 28.85 23.9999L24.45 21.0499C24.45 21.0499 24.35 21.0999 24.25 21.2499L23.15 22.8499C22.45 23.8499 21.1 24.1499 20.1 23.4999C13.8 19.5999 9.89997 14.1499 8.49997 11.9499C7.84997 10.8999 8.09997 9.54994 9.09997 8.84994L10.9 7.59994V7.54994L7.94997 3.14994C7.94997 3.09994 7.89997 3.09994 7.84997 3.14994L3.79997 5.54994Z"
                              fill="currentColor"
                            />
                            <path
                              d="M29.3 14.25C28.7 14.25 28.25 13.8 28.2 13.2C27.8 8.15003 23.65 4.10003 18.55 3.75003C17.95 3.70003 17.45 3.20003 17.5 2.55003C17.55 1.95003 18.05 1.45003 18.7 1.50003C24.9 1.90003 29.95 6.80003 30.45 13C30.5 13.6 30.05 14.15 29.4 14.2C29.4 14.25 29.35 14.25 29.3 14.25Z"
                              fill="currentColor"
                            />
                            <path
                              d="M24.35 14.7002C23.8 14.7002 23.3 14.3002 23.25 13.7002C22.95 11.0002 20.85 8.90018 18.15 8.55018C17.55 8.50018 17.1 7.90018 17.15 7.30018C17.2 6.70018 17.8 6.25018 18.4 6.30018C22.15 6.75018 25.05 9.65018 25.5 13.4002C25.55 14.0002 25.15 14.5502 24.5 14.6502C24.4 14.7002 24.35 14.7002 24.35 14.7002Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_941_17577">
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                        Adresse email
                        </h4>
                        <p className="text-base text-body-color dark:text-dark-6">
                        DeadlineDrive@mail.com
                        </p>
                      </div>
                    </div>
    
                    <div className="mb-8 flex w-full max-w-[370px]">
                      <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28 4.7998H3.99998C2.29998 4.7998 0.849976 6.1998 0.849976 7.9498V24.1498C0.849976 25.8498 2.24998 27.2998 3.99998 27.2998H28C29.7 27.2998 31.15 25.8998 31.15 24.1498V7.8998C31.15 6.1998 29.7 4.7998 28 4.7998ZM28 7.0498C28.05 7.0498 28.1 7.0498 28.15 7.0498L16 14.8498L3.84998 7.0498C3.89998 7.0498 3.94998 7.0498 3.99998 7.0498H28ZM28 24.9498H3.99998C3.49998 24.9498 3.09998 24.5498 3.09998 24.0498V9.2498L14.8 16.7498C15.15 16.9998 15.55 17.0998 15.95 17.0998C16.35 17.0998 16.75 16.9998 17.1 16.7498L28.8 9.2498V24.0998C28.9 24.5998 28.5 24.9498 28 24.9498Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                        Téléphone
                        </h4>
                        <p className="text-base text-body-color dark:text-dark-6">
                        +00 00 00 00 0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-1/2 xl:w-5/12 ">
                  <div className="relative rounded-lg bg-white p-8 dark:bg-dark-2 sm:p-12 appear-animationY">
       <form onSubmit={formik.handleSubmit}>
      {/* Champ de saisie pour le prénom */}
      {formik.touched.firstName && formik.errors.firstName && (
        <small className="error text-red">{formik.errors.firstName}</small>
      )}
      <ContactInputBox
        type="text"
        name="firstName"
        placeholder="Votre prénom"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {/* Champ de saisie pour le nom */}
      {formik.touched.lastName && formik.errors.lastName && (
        <small className="error text-red">{formik.errors.lastName}</small>
      )}
      <ContactInputBox
        type="text"
        name="lastName"
        placeholder="Votre nom"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      
      {/* Champ de saisie pour l'email */}
      {formik.touched.email && formik.errors.email && (
        <small className="error text-red">{formik.errors.email}</small>
      )}
      <ContactInputBox
        type="email"
        name="email"
        placeholder="Votre email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {/* Champ de texte pour le message */}
      {formik.touched.message && formik.errors.message && (
        <small className="error text-red">{formik.errors.message}</small>
      )}
      <ContactTextArea
        rows="6"
        name="message"
        placeholder="Votre message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      
      {/* Case à cocher pour accepter les termes et conditions */}
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
        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          J'accepte les <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">termes et conditions</a>.
        </label>
        {formik.touched.terms && formik.errors.terms && (
          <small className="error text-red ml-2">{formik.errors.terms}</small>
        )}
      </div>

      {/* Bouton d'envoi du formulaire */}
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

                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
  );
};

// Composant fonctionnel réutilisable pour une zone de texte dans un formulaire de contact
const ContactTextArea = ({ rows, name, placeholder, value, onChange, onBlur }) => {
  return (
    <div className="mb-4">
      <textarea
        rows={rows}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full p-3 border border-yellow-600 rounded"
      />
    </div>
  );
};

// Composant fonctionnel réutilisable pour un champ de saisie dans un formulaire de contact
const ContactInputBox = ({ type, name, placeholder, value, onChange, onBlur }) => {
  return (
    <div className="mb-9">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full p-3 border rounded border-yellow-600"
      />
    </div>
  );
};

export default Contact; // Export du composant ContactTextArea et ContactInputBox