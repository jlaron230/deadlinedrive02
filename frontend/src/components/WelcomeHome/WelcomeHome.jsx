import React from 'react';

const WelcomeHome = () => {
    return (
        <main class="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
            <h1 class=" p-8 font-semibold text-xl flex justify-center	">Bienvenue sur Deadline Drive, votre allié pour rester motiver</h1>

                <div class='flex flex-row flex-wrap p-4 m-2 '>
                
                    <div class="flex-1 basis-80">
                    <img src="src\assets\image-live-work.webp" alt=" Image d'un mur avec les mots : Live, work and create " class=" rounded-md h-max w-full	"/>
                    </div>

                    <div class=" space-y-4 ml-6 flex-1 basis-80">
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

        </main>

    );
}

export default WelcomeHome