import React from 'react';
import quotePerDays from '@components/QuotePerDays/QuotePerDays';
import YourQuotes from '@components/YoursQuotes/YoursQuotes';
import WelcomeHome from '@components/WelcomeHome/WelcomeHome';

export default function Home() {
  return (
    <>
      <WelcomeHome />
        
      <quotePerDays /> 
        <div class="flex flex-col items-center">
            <button  class="font-semibold p-4  bg-custom-main-orange  rounded-lg">
              Appuyez ici pour vous connecter ou vous enregistrer !
            </button> 
        </div>

        
      <YourQuotes />
    </>
  );
}