import React from 'react';
import quotePerDays from '@components/QuotePerDays/QuotePerDays';
import YourQuotes from '@components/YoursQuotes/YoursQuotes';

export default function Home() {
  return (
    <div className=''>
      <header class="">
        <h1 class=" p-8 font-semibold text-xl flex justify-center	">Bienvenue sur Deadline Drive, votre allié pour rester motiver</h1>
      </header>

      <main class="min_h_screen">
        <div class='flex flex-row p-4 m-2 '>

         
        <img src="src\assets\image-live-work.webp" alt=" Image d'un mur avec les mots : Live, work and create " class=" rounded-md w-amx	h-max	"/>
          

          <div class=" space-y-4 ml-6">
            <p>
              Pour commencer, inscrivez-vous sur notre plateforme.
              Une fois inscrit, vous pourrez définir vos deadlines personnelles. Chaque jour, vous recevrez une notification avec une citation inspirante correspondant à un thème que vous aurez choisi parmi nos catégories : sport, personnalité, auteurs, manga, série, film, histoire, poésie.

              Voici un aperçu des fonctionnalités disponibles sur DeadlineDrive :
            </p>

            <p>
            Voici un aperçu des fonctionnalités disponibles sur DeadlineDrive :
            </p>

            <ul  class="list-disc">
              <li> Choix du type de citations pour personnaliser votre inspiration quotidienne. </li>
              <li> Accès à un calendrier interactif pour visualiser vos deadlines et planifier vos actions. </li>
              <li> Participation à notre système de trending quotes où vous pourrez découvrir les citations les plus appréciées et les partager avec la communauté. </li>
            </ul>

            <p>
              Rejoignez dès maintenant notre communauté sur DeadlineDrive et donnez un nouvel élan à votre motivation !
            </p>

          </div>

          
        </div>
        
        <quotePerDays />
        <div class=" p-4  flex   flex-col  items-center bg-amber-500 m-3 rounded-lg ">
          <p> Le premier Savoir est le savoir de mon ignorance : c’est le début de l’intelligence</p>
          <h3 class="font-semibold" > Socrates</h3>
          <p>Choissisez un thème différent</p>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>

        <div className="container mx-auto p-4">
            <YourQuotes />
        </div>

      </main>
    </div>
  );
}