import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DestinationDetails from "./DestinationDetails";
import AIChatbot from "./AIChatbot";
import ItineraryPlanner from "./ItineraryPlanner";
import "./App.css";

const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    rating: "4.7",
  },
  {
    id: 5,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
  },
];

function App() {
  const [search, setSearch] = useState("");

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  // MANUAL LOCATION SEARCH
  const [manualLocation, setManualLocation] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");

  // WEATHER
  const [weatherCity, setWeatherCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Location is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationError(
          "Location access was denied. You can search manually instead."
        );
      }
    );
  };

  const handleManualLocation = () => {
    if (!manualLocation.trim()) {
      return;
    }

    setSearchedLocation(manualLocation.trim());
    setLocationError("");
  };

  // WEATHER GUIDE
  const checkWeather = () => {
    if (!weatherCity.trim()) {
      return;
    }

    const city = weatherCity.trim().toLowerCase();

    const weatherGuides = {
      bali: {
        city: "Bali, Indonesia",
        icon: "🌴",
        condition: "Warm & Tropical",
        temperature: "26–31°C",
        humidity: "High",
        bestTime: "April – October",
      },

      paris: {
        city: "Paris, France",
        icon: "🗼",
        condition: "Mild & Pleasant",
        temperature: "10–25°C",
        humidity: "Moderate",
        bestTime: "April – June",
      },

      tokyo: {
        city: "Tokyo, Japan",
        icon: "🗾",
        condition: "Seasonal",
        temperature: "8–30°C",
        humidity: "Moderate",
        bestTime: "March – May",
      },

      dubai: {
        city: "Dubai, UAE",
        icon: "🏙️",
        condition: "Hot & Sunny",
        temperature: "20–40°C",
        humidity: "Low–Moderate",
        bestTime: "November – March",
      },

      santorini: {
        city: "Santorini, Greece",
        icon: "🌊",
        condition: "Sunny & Dry",
        temperature: "15–30°C",
        humidity: "Moderate",
        bestTime: "May – October",
      },

      "new york": {
        city: "New York, USA",
        icon: "🗽",
        condition: "Seasonal",
        temperature: "0–30°C",
        humidity: "Moderate",
        bestTime: "September – November",
      },

      london: {
        city: "London, UK",
        icon: "🇬🇧",
        condition: "Cool & Changeable",
        temperature: "5–23°C",
        humidity: "High",
        bestTime: "June – August",
      },

      singapore: {
        city: "Singapore",
        icon: "🌆",
        condition: "Hot & Humid",
        temperature: "25–32°C",
        humidity: "Very High",
        bestTime: "February – April",
      },

      maldives: {
        city: "Maldives",
        icon: "🏝️",
        condition: "Tropical & Sunny",
        temperature: "25–31°C",
        humidity: "High",
        bestTime: "November – April",
      },
    };

    const result = weatherGuides[city];

    if (result) {
      setWeatherData(result);
    } else {
      setWeatherData({
        city: weatherCity.trim(),
        icon: "🌍",
        condition: "Check local forecast",
        temperature: "Varies by season",
        humidity: "Varies",
        bestTime: "Depends on destination",
      });
    }
  };

  const filteredDestinations = destinations.filter((destination) =>
    `${destination.name} ${destination.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* DESTINATION DETAILS PAGE */}
        <Route
          path="/destination/:name"
          element={<DestinationDetails />}
        />

        {/* HOME PAGE */}
        <Route
          path="*"
          element={
            <div className="app">

              {/* NAVBAR */}
              <nav className="navbar">
                <div className="logo">TRAVELORA</div>

                <div className="nav-links">
                  <a href="#home">Home</a>
                  <a href="#destinations">Destinations</a>
                  <a href="#location">Location</a>
                  <a href="#weather">Weather</a>
                  <a href="#assistant">AI Assistant</a>
                  <a href="#itinerary">AI Planner</a>
                </div>

                <button className="nav-button">
                  Plan a Trip
                </button>
              </nav>

              <main>

                {/* HERO */}
                <section className="hero" id="home">

                  <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="/videos/travel-hero.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="hero-overlay"></div>

                  <div className="hero-content">

                    <p className="hero-label">
                      YOUR JOURNEY STARTS HERE
                    </p>

                    <h1>
                      Explore the
                      <span> World.</span>
                    </h1>

                    <p className="hero-description">
                      Discover breathtaking destinations,
                      experience unforgettable places and let AI
                      help you plan your perfect journey.
                    </p>

                    <div className="search-box">

                      <span className="search-icon">
                        ⌕
                      </span>

                      <input
                        type="text"
                        placeholder="Where do you want to go?"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />

                      <button>
                        Explore
                      </button>

                    </div>

                    <div className="hero-stats">

                      <div>
                        <strong>100+</strong>
                        <span>Destinations</span>
                      </div>

                      <div>
                        <strong>500+</strong>
                        <span>Places to Visit</span>
                      </div>

                      <div>
                        <strong>AI</strong>
                        <span>Trip Planning</span>
                      </div>

                    </div>

                  </div>

                  <div className="scroll-indicator">
                    <span></span>
                    Scroll to explore
                  </div>

                </section>

                {/* DESTINATIONS */}
                <section
                  className="destinations-section"
                  id="destinations"
                >

                  <div className="section-heading">

                    <div>
                      <p>EXPLORE THE WORLD</p>
                      <h2>Popular Destinations</h2>
                    </div>

                    <span>
                      {filteredDestinations.length} destinations
                    </span>

                  </div>

                  <div className="destination-grid">

                    {filteredDestinations.map((destination) => (

                      <Link
                        to={`/destination/${destination.name
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="destination-card"
                        key={destination.id}
                      >

                        <img
                          src={destination.image}
                          alt={destination.name}
                        />

                        <div className="card-overlay"></div>

                        <div className="destination-info">

                          <div>
                            <p>{destination.country}</p>
                            <h3>{destination.name}</h3>
                          </div>

                          <div className="rating">
                            ★ {destination.rating}
                          </div>

                        </div>

                      </Link>

                    ))}

                  </div>

                  {filteredDestinations.length === 0 && (
                    <div className="empty-state">
                      <h3>No destination found</h3>
                      <p>
                        Try searching for another city or country.
                      </p>
                    </div>
                  )}

                </section>

                {/* LOCATION */}
                <section
                  className="location-section"
                  id="location"
                  style={{ background: "red", minHeight: "500px" }}
                >

                  <div className="location-heading">
                    <p>DISCOVER NEAR YOU</p>

                    <h2>
                      Find your
                      <br />
                      current location.
                    </h2>
                  </div>

                  <div className="location-card">

                    <div>

                      <span className="location-icon">
                        📍
                      </span>

                      <h3>
                        Use your location
                      </h3>

                      <p>
                        Allow Travelora to use your location
                        to personalize your travel experience.
                      </p>

                      {location && (
                        <div className="coordinates">

                          <strong>
                            Location detected ✓
                          </strong>

                          <span>
                            Latitude:{" "}
                            {location.latitude.toFixed(4)}
                          </span>

                          <span>
                            Longitude:{" "}
                            {location.longitude.toFixed(4)}
                          </span>

                        </div>
                      )}

                      {locationError && (
                        <p className="location-error">
                          {locationError}
                        </p>
                      )}

                      {/* MANUAL LOCATION SEARCH */}
                      <div className="manual-location">

                        <input
                          type="text"
                          placeholder="Or enter a city manually..."
                          value={manualLocation}
                          onChange={(e) =>
                            setManualLocation(e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleManualLocation();
                            }
                          }}
                        />

                        <button
                          onClick={handleManualLocation}
                        >
                          Search
                        </button>

                      </div>

                      {searchedLocation && (
                        <div className="manual-result">
                          📍 Searching travel information for{" "}
                          <strong>{searchedLocation}</strong>
                        </div>
                      )}

                    </div>

                    <button
                      className="location-button"
                      onClick={getLocation}
                    >
                      {location
                        ? "Location Detected"
                        : "Use My Location"}
                    </button>

                  </div>

                </section>

                {/* WEATHER */}
                <section
                  className="weather-section"
                  id="weather"
                >

                  <div className="weather-heading">

                    <p>TRAVEL WEATHER GUIDE</p>

                    <h2>
                      Know your destination
                      <br />
                      before you travel.
                    </h2>

                    <p className="weather-subtitle">
                      Get a quick climate guide for your destination
                      before planning your journey.
                    </p>

                  </div>

                  <div className="weather-card">

                    <div className="weather-search">

                      <input
                        type="text"
                        placeholder="Enter a destination..."
                        value={weatherCity}
                        onChange={(e) =>
                          setWeatherCity(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            checkWeather();
                          }
                        }}
                      />

                      <button
                        className="weather-button"
                        onClick={checkWeather}
                      >
                        Check Weather
                      </button>

                    </div>

                    {weatherData && (
                      <div className="weather-result">

                        <div className="weather-main">

                          <span className="weather-icon">
                            {weatherData.icon}
                          </span>

                          <div>
                            <p>DESTINATION</p>
                            <h3>{weatherData.city}</h3>
                            <strong>
                              {weatherData.condition}
                            </strong>
                          </div>

                        </div>

                        <div className="weather-details">

                          <div>
                            <span>🌡️ Temperature</span>
                            <strong>
                              {weatherData.temperature}
                            </strong>
                          </div>

                          <div>
                            <span>💧 Humidity</span>
                            <strong>
                              {weatherData.humidity}
                            </strong>
                          </div>

                          <div>
                            <span>✈️ Best Time</span>
                            <strong>
                              {weatherData.bestTime}
                            </strong>
                          </div>

                        </div>

                        <p className="weather-note">
                          ℹ️ This is a general destination climate
                          guide, not live weather data.
                        </p>

                      </div>
                    )}

                    {!weatherData && (
                      <div className="weather-empty">

                        <span>🌤️</span>

                        <p>
                          Enter a destination above to see its
                          travel weather guide.
                        </p>

                      </div>
                    )}

                  </div>

                </section>

                {/* AI CHATBOT */}
                <AIChatbot />

                {/* AI ITINERARY PLANNER */}
                <ItineraryPlanner />

                {/* INTRO */}
                <section className="intro-section">

                  <p>PLAN YOUR JOURNEY</p>

                  <h2>
                    Your next adventure
                    <br />
                    is waiting.
                  </h2>

                </section>

              </main>

            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
