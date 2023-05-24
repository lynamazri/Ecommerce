import React, { useState } from "react";
function Language() {
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "ar", name: "Arabic" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedLanguage(selectedCode);
    // Handle language selection logic
    console.log("Selected language:", selectedCode);
  };

  return (
    <div className="right-container">
      <div className="language-page">
        <div className="header">
          <h3>Language</h3>
          <p>Choose your preferred language.</p>
        </div>
        <div className="body">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="">Select a language</option>
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Language;
