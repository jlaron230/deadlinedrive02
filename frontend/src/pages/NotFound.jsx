import React from "react";

function NotFound() {
  return (
    <>
      <section className="relative z-10 bg-404 py-[30px] min-h-screen">
        {/* Container for centering content */}
        <div className="container mx-auto pt-20">
          <div className="flex">
            <div className="w-full">
              {/* Centered text content */}
              <div className="mx-auto text-center">
                {/* Large 404 heading */}
                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                {/* Error message */}
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  Oops ! Cette page est introuvable
                </h4>
                {/* Additional message */}
                <p className="mb-8 text-lg text-white">
                  Retrouvez votre chemin et votre motivation
                </p>
                {/* Link to go back to the homepage */}
                <a
                  href="/"
                  className="btn hover:text-black mt-12 inline-block rounded-lg border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary"
                >
                  Revenir à l'accueil
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background elements for decoration */}
        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b"></div>
            <div className="h-full w-1/2 bg-gradient-to-t "></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b"></div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
