import React, { useState, useEffect } from "react";
import Axios from "axios";

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const publicKey = "4d52fb3fa1ef52af3d6b38218aff5477";
  const privateKey = "9394870fafc8931dc52368af8fdbc806e86f8320y";
  const ts = 1;
  const hash = "4d12be3f643adb2bbc6b01830702d350";
  const apiUrl = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await Axios.get(`${apiUrl}`);
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching character details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!character) {
    return <p>No character selected.</p>;
  }

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>{character.description || "No description available."}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.length > 0 ? (
          character.comics.items.map((comic, index) => (
            <li key={index}>{comic.name}</li>
          ))
        ) : (
          <p>No comics found.</p>
        )}
      </ul>
    </div>
  );
};

export default CharacterDetail;