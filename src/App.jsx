import React, { useState } from "react";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import "./Marvel.css"

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterClick = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <div className="app">
      <h1>Marvel Comics Characters</h1>
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
      <CharacterList onCharacterClick={handleCharacterClick} />
    </div>
  );
};

export default App;
