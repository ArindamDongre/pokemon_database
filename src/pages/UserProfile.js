import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=4&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchDetails = data.results.map((p) =>
          fetch(p.url).then((res) => res.json())
        );
        Promise.all(fetchDetails)
          .then((details) => {
            setPokemon(details);
            setLoading(false);
          })
          .catch((err) => {
            setError("Failed to fetch Pokémon details.");
            setLoading(false);
          });
      })
      .catch((err) => {
        setError("Failed to fetch Pokémon list.");
        setLoading(false);
      });
  }, [offset]);

  const handleLogout = () => {
    // Optionally clear user session or state here
    navigate("/");
  };

  return (
    <div className="user-profile">
      <h1>Welcome, {username}!</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <>
          <div className="pokemon-container">
            {pokemon.length > 0 ? (
              pokemon.map((poke) => (
                <Link
                  to={`/auth/${username}/${poke.name}`}
                  key={poke.name}
                  className="pokemon-card"
                >
                  <img src={poke.sprites.front_default} alt={poke.name} />
                  <div className="pokemon-info">
                    <h3>{poke.name}</h3>
                    <p>Height: {poke.height}</p>
                    <p>Weight: {poke.weight}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No Pokémon available.</p>
            )}
          </div>
          <div className="pagination">
            <button
              onClick={() => setOffset(Math.max(offset - 4, 0))}
              disabled={offset === 0}
            >
              Previous
            </button>
            <button onClick={() => setOffset(offset + 4)}>Next</button>
          </div>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
