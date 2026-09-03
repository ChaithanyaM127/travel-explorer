import { useState } from "react";

function ItineraryPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateItinerary = async () => {
    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    setLoading(true);
    setError("");
    setItinerary([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Gemini API key is missing.");
      }

      const prompt = `
Create a ${days}-day travel itinerary for ${destination}.

Return ONLY valid JSON in this exact format:

[
  {
    "day": 1,
    "title": "Day title",
    "places": [
      {
        "time": "9:00 AM",
        "place": "Place name",
        "description": "Short description"
      },
      {
        "time": "1:00 PM",
        "place": "Place name",
        "description": "Short description"
      },
      {
        "time": "6:00 PM",
        "place": "Place name",
        "description": "Short description"
      }
    ]
  }
]

Create exactly ${days} days.
Include famous attractions, local experiences, food suggestions and realistic travel pacing.
Do not include markdown or code fences.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to generate itinerary.");
      }

      const data = await response.json();

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedItinerary = JSON.parse(cleanedText);

      setItinerary(parsedItinerary);
    } catch (err) {
      console.error(err);
      setError(
        "Sorry, we couldn't generate the itinerary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="itinerary-section" id="itinerary">

      <div className="itinerary-heading">
        <p>AI TRIP PLANNER</p>

        <h2>
          Build your perfect
          <br />
          journey.
        </h2>

        <span>
          Let AI create a personalized day-by-day travel plan.
        </span>
      </div>

      <div className="itinerary-planner">

        <div className="itinerary-form">

          <div className="form-group">
            <label>Where are you going?</label>

            <input
              type="text"
              placeholder="e.g. Paris, Bali, Tokyo..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Number of days</label>

            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              <option value={1}>1 Day</option>
              <option value={2}>2 Days</option>
              <option value={3}>3 Days</option>
              <option value={4}>4 Days</option>
              <option value={5}>5 Days</option>
              <option value={6}>6 Days</option>
              <option value={7}>7 Days</option>
            </select>
          </div>

          <button
            className="generate-itinerary-button"
            onClick={generateItinerary}
            disabled={loading}
          >
            {loading
              ? "Creating your itinerary..."
              : "✨ Generate Itinerary"}
          </button>

          {error && (
            <p className="itinerary-error">
              {error}
            </p>
          )}

        </div>

        {loading && (
          <div className="itinerary-loading">
            <div className="loading-spinner"></div>
            <p>
              AI is planning your perfect trip...
            </p>
          </div>
        )}

        {!loading && itinerary.length > 0 && (
          <div className="itinerary-results">

            <div className="results-title">
              <p>YOUR PERSONALIZED PLAN</p>

              <h3>
                {destination} in {days}{" "}
                {days === 1 ? "day" : "days"}
              </h3>
            </div>

            {itinerary.map((day) => (
              <div
                className="itinerary-day"
                key={day.day}
              >

                <div className="day-number">
                  <span>DAY</span>
                  <strong>{day.day}</strong>
                </div>

                <div className="day-content">

                  <h4>{day.title}</h4>

                  <div className="day-places">

                    {day.places?.map((place, index) => (
                      <div
                        className="itinerary-place"
                        key={index}
                      >

                        <div className="place-time">
                          {place.time}
                        </div>

                        <div className="place-line">
                          <span></span>
                        </div>

                        <div className="place-details">
                          <h5>{place.place}</h5>
                          <p>{place.description}</p>
                        </div>

                      </div>
                    ))}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}

export default ItineraryPlanner;
