import React from 'react';
import QuotePerDays from '@components/QuotePerDays/QuotePerDays';
import YourQuotes from '@components/YoursQuotes/YoursQuotes';
import WelcomeHome from '@components/WelcomeHome/WelcomeHome';

export default function Home() {
  return (
    <>
      <WelcomeHome />
      
      <QuotePerDays /> 

      <YourQuotes />
    </>
  );
}