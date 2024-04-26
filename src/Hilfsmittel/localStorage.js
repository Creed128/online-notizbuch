// Speichern von Daten im localStorage
export const speichernImLocalStorage = (schlüssel, wert) => {
    localStorage.setItem(schlüssel, JSON.stringify(wert));
  };
  
  // Daten abrufen aus dem localStorage
  export const abrufenAusLocalStorage = (schlüssel) => {
    const gespeicherterWert = localStorage.getItem(schlüssel);
    return gespeicherterWert ? JSON.parse(gespeicherterWert) : null;
  };
  
  // Daten löschen aus dem localStorage
  export const löschenAusLocalStorage = (schlüssel) => {
    localStorage.removeItem(schlüssel);
  };