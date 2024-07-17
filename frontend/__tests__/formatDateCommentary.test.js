import '@testing-library/jest-dom';
import formatDateCommentary from '../src/services/formatDateCommentary'; // Ajustez le chemin si nécessaire

// Groupe de tests pour formatDateCommentary
describe('formatDateCommentary', () => {
  // Cas de test pour vérifier le formatage correct de la date
  it('should format the date string correctly', () => {
    const inputDate = '2023-07-16';
    const expectedOutput = '16/07/2023';
  
    const output = formatDateCommentary(inputDate);
  
    expect(output).toBe(expectedOutput);
  });

  // Test pour une date invalide
  it('should handle invalid date inputs gracefully', () => {
    const invalidInputDate = 'not-a-date';
    expect(() => formatDateCommentary(invalidInputDate)).toThrow('Invalid Date');
  });

  // Test pour une date avec une timezone différente
  it('should handle dates with different timezones consistently', () => {
    const inputDateWithTimezone = '2023-07-16T23:59:00Z'; // UTC timezone
    const expectedOutput = '17/07/2023'; // Expected output in French locale, depending on timezone handling
    const output = formatDateCommentary(inputDateWithTimezone);
  
    expect(output).toBe(expectedOutput);
  });

});