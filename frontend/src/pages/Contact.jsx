import { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js'; // Importing animejs for animations
import Formik from "@components/Contact/Formik"; // Importing Formik component

function Contact() {
  const [animation, setAnimation] = useState(null); // State to hold animation instance
  const [animation2, setAnimation2] = useState(null); // State to hold another animation instance

  // Function to handle fade animation using animejs
  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Targeting elements with 'fade-animation' class
      opacity: [0, 1], // Fading from opacity 0 to 1
      duration: 2000, // Animation duration in milliseconds
      easing: 'easeInOutQuad', // Easing function for smooth animation
      autoplay: true, // Initially disable autoplay
      translateY: 30, // Translate animation in Y direction
    });
    setAnimation(anim); // Storing the animation object in state
  };

  // Function to handle reappearance animation for ServiceCard
  const handleReappearanceAnimation = () => {
    anime({
      targets: '.appear-animation', // Targeting elements with 'appear-animation' class
      translateX: ['100%', '0%'], // Translate animation from 100% to 0% in X direction
      opacity: [0, 1], // Fading from opacity 0 to 1
      duration: 1000, // Animation duration in milliseconds
      easing: 'easeInOutQuad' // Easing function for smooth animation
    });
  };

  // Function to handle reappearance animation for Y direction
  const handleReappearanceAnimationY = () => {
    anime({
      targets: '.appear-animationY', // Targeting elements with 'appear-animationY' class
      translateY: ['100%', '0%'], // Translate animation from 100% to 0% in Y direction
      opacity: [0, 1], // Fading from opacity 0 to 1
      duration: 1000, // Animation duration in milliseconds
      easing: 'easeInOutQuad' // Easing function for smooth animation
    });
  };
  
  // Function to reverse the animation
  const reverseAnimation = () => {
    if (animation) {
      handleReappearanceAnimation(); // Reversing animation
    }
    if (animation2) {
      handleReappearanceAnimationY(); // Reversing animation
    }
    handleReappearanceAnimationY(); // Initiating reappearance animation
    handleReappearanceAnimation(); // Initiating reappearance animation
  };

  // Effect hook to handle initial animation setup
  useEffect(() => {
    try {
      handleAnimation(); // Initialize animation on component load
      reverseAnimation(); // Reverse animation
      handleAnimationY(); // Initiate animation for Y direction
      scrollToAnchor(); // Scroll to specific anchor
    } catch (e) {
      console.log(e); // Log any errors during animation setup
    }
  }, []);

  // JSX structure for the Contact component
  return (
    <>
      <section className="relative z-10 overflow-hidden py-20 dark:bg-dark lg:py-[120px] text-black p-12">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-center">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12 md:justify-center md:flex">
              <div className="mb-12 max-w-[570px] lg:mb-0 appear-animation">
                <h2 className="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  Contact Us
                </h2>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Address
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      30 rue de la citation 13100 Aix-en-Provence
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      DeadlineDrive@mail.com
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Phone
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
                <Formik /> {/* Rendering Formik component for contact form */}
                <div>
                  {/* Additional content can be added here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact; // Exporting the Contact component
