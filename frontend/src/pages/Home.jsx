import React from 'react';
import QuotePerDays from '@components/QuotePerDays/QuotePerDays';
import YourQuotes from '@components/YoursQuotes/YoursQuotes';
import WelcomeHome from '@components/WelcomeHome/WelcomeHome';

export default function Home() {
  return (
    <>
      <WelcomeHome />
      <h3 className="flex flex-col items-center font-semibold">Citations aléatoires</h3>
      <QuotePerDays /> 

      <YourQuotes />
    </>
  );
}