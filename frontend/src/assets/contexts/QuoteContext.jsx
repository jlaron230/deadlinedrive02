import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

// Créez un contexte React pour la citation
const QuoteContext = createContext();

// Hook personnalisé pour accéder au contexte facilement
export const useQuote = () => useContext(QuoteContext);

// Provider qui gérera l'état de la citation et son chargement
export const QuoteProvider = ({ children }) => {
    const [quote, setQuote] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Fonction pour charger la citation quotidienne depuis votre backend
    const fetchQuote = useCallback(async () => {
        if (!isLoaded) {
            try {
                // Modifiez l'URL selon votre configuration de backend
                const response = await axios.get('http://localhost:5000/daily-quote');
                if (response.data && response.data.text && response.data.author) {
                    setQuote(`Citation du jour: ${response.data.text} - Auteur: ${response.data.author}`);
                    setIsLoaded(true); // Marquez la citation comme chargée
                } else {
                    throw new Error('No quote data available');
                }
            } catch (error) {
                console.error('Error fetching daily quote:', error);
                setQuote('Aucune citation disponible aujourd’hui.');
            }
        }
    }, [isLoaded]);

    // Exposez le quote, fetchQuote, et isLoaded à travers le provider
    return (
        <QuoteContext.Provider value={{ quote, fetchQuote, isLoaded }}>
            {children}
        </QuoteContext.Provider>
    );
};
