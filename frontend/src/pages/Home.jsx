import React from 'react';
import logo from '../assets/deadlinedrive_logo.png';

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-center'>
      <header className="text-red-500 text-center">
        <img src={logo} className="w-32 h-32 mb-4" alt="logo" />
        <p className="text-xl font-bold">Hello Vite + React!</p>
        <p className="mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR updates.
        </p>
        <p className="mt-4">
          <a
            className="text-blue-500 hover:underline"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="text-blue-500 hover:underline"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}