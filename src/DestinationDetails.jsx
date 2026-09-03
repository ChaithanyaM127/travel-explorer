import { useNavigate, useParams } from "react-router-dom";

const destinations = {
  bali: {
    name: "Bali",
    country: "Indonesia",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    description:
      "Bali is a beautiful island known for tropical beaches, lush rice terraces, ancient temples and unforgettable sunsets.",
    places: [
      {
        name: "Uluwatu Temple",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tegallalang Rice Terrace",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Seminyak Beach",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  paris: {
    name: "Paris",
    country: "France",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
    description:
      "Paris combines historic architecture, world-famous landmarks, art, fashion and incredible French cuisine.",
    places: [
      {
        name: "Eiffel Tower",
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Louvre Museum",
        image:
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Arc de Triomphe",
        image:
          "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  tokyo: {
    name: "Tokyo",
    country: "Japan",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85",
    description:
      "Tokyo is a fascinating blend of futuristic technology, traditional culture, incredible food and vibrant city life.",
    places: [
      {
        name: "Shibuya Crossing",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tokyo Tower",
        image:
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Senso-ji Temple",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  dubai: {
    name: "Dubai",
    country: "UAE",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    description:
      "Dubai is famous for its futuristic skyline, luxury experiences, desert adventures and stunning architecture.",
    places: [
      {
        name: "Burj Khalifa",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Palm Jumeirah",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Dubai Marina",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  santorini: {
    name: "Santorini",
    country: "Greece",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85",
    description:
      "Santorini is known for its whitewashed villages, blue-domed buildings, dramatic cliffs and spectacular sunsets.",
    places: [
      {
        name: "Oia",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Fira",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Red Beach",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  "new-york": {
    name: "New York",
    country: "USA",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=85",
    description:
      "New York is a global city filled with iconic landmarks, diverse neighborhoods, entertainment and culture.",
    places: [
      {
        name: "Times Square",
        image:
          "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Central Park",
        image:
          "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Statue of Liberty",
        image:
          "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
};

function DestinationDetails() {
  const { name } = useParams();
  const navigate = useNavigate();

  const destination = destinations[name];

  if (!destination) {
    return (
      <div className="not-found">
        <h1>Destination Not Found</h1>

        <button onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="destination-details">
      <div
        className="details-hero"
        style={{
          backgroundImage: `url(${destination.image})`,
        }}
      >
        <div className="details-overlay"></div>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <div className="details-content">
          <p>{destination.country}</p>

          <h1>{destination.name}</h1>

          <span>★ {destination.rating}</span>
        </div>
      </div>

      <section className="details-body">
        <div className="details-description">
          <p className="details-label">ABOUT THE DESTINATION</p>

          <h2>Discover {destination.name}</h2>

          <p>{destination.description}</p>
        </div>

        <div className="famous-places">
          <p className="details-label">MUST VISIT</p>

          <h2>Famous Places</h2>

          <div className="places-grid">
            {destination.places.map((place, index) => (
              <div className="place-card" key={place.name}>
                <img
                  src={place.image}
                  alt={place.name}
                />

                <div className="place-card-content">
                  <span>0{index + 1}</span>

                  <h3>{place.name}</h3>

                  <p>Explore this famous attraction</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DestinationDetails;