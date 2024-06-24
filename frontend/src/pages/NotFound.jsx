import React from "react";
function NotFound (){
    return (
        <>
          <section className="relative z-10 bg-404 py-[30px] min-h-screen">
            <div className="container mx-auto">
              <div className="flex">
                <div className="w-full">
                  <div className="mx-auto text-center">
                    <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                      404
                    </h2>
                    <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                    Oops ! Cette page est introuvable
                    </h4>
                    <p className="mb-8 text-lg text-white">
                    Retrouvez votre chemin et votre motivation
                    </p>
                    <a
                      href="/"
                      className="hover:text-black mt-12 inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary"
                    >
                      Revenir à l'accueil
                    </a>
                  </div>
                </div>
              </div>
            </div>
    
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

export default NotFound