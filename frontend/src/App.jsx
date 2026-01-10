import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      const res = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="container">
      <h1>🌦️ Weather App</h1>
      <p>Get the state of the weather today!</p>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>See the Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>
          <p>Temperature! {weather.main.temp}°C</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
