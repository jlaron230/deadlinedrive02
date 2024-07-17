import getCategoryName from "../services/getCategoryName";

describe('getCategoryName', () => {
    it('should return the correct category name', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
            { id_quote: 2, id_category: 102 },
        ];
        const category = [
            { id: 101, name: 'Inspiration' },
            { id: 102, name: 'Humor' },
        ];

        expect(getCategoryName(1, quoteCategory, category)).toBe('Inspiration');
        expect(getCategoryName(2, quoteCategory, category)).toBe('Humor');
    });

    it('should return "Pas de catégorie" if quoteCategory is not found', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
        ];
        const category = [
            { id: 101, name: 'Inspiration' },
        ];

        expect(getCategoryName(3, quoteCategory, category)).toBe('Pas de catégorie');
    });

    it('should return "Pas de catégorie" if quoteCategory is empty', () => {
        const quoteCategory = [];
        const category = [
            { id: 101, name: 'Inspiration' },
        ];

        expect(getCategoryName(1, quoteCategory, category)).toBe('Pas de catégorie');
    });

    it('should return "Catégorie inconnue" if category is empty', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
        ];
        const category = [];

        expect(getCategoryName(1, quoteCategory, category)).toBe('Catégorie inconnue');
    });

    it('should return "Pas de catégorie" if quoteCategory is undefined', () => {
        const category = [
            { id: 101, name: 'Inspiration' },
        ];

        expect(getCategoryName(1, undefined, category)).toBe('Pas de catégorie');
    });

    it('should return "Catégorie inconnue" if category is undefined', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
        ];

        expect(getCategoryName(1, quoteCategory, undefined)).toBe('Catégorie inconnue');
    });
});