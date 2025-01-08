import React, { useState, useEffect } from "react";
import Axios from "axios";

const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const publicKey = "4d52fb3fa1ef52af3d6b38218aff5477";
  const ts = 1;
  const hash = "a80ea7d0806646c1f3b6bf37422fc6fd";
  const apiUrl = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await Axios.get(`${apiUrl}`);
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [apiUrl, hash]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="character-list">
      {characters.map((character) => (
        <div
          key={character.id}
          className="character-card"
          onClick={() => onCharacterClick(character.id)}
        >
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="character-thumbnail"
          />
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
