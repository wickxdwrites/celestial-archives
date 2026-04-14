import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stars = [
  { id: 1, top: "12%", left: "18%", size: "small", delay: "0s" },
  { id: 2, top: "20%", left: "72%", size: "small", delay: "1.2s" },
  { id: 3, top: "34%", left: "58%", size: "tiny", delay: "2.1s" },
  { id: 4, top: "48%", left: "82%", size: "small", delay: "0.8s" },
  { id: 5, top: "62%", left: "22%", size: "tiny", delay: "1.8s" },
  { id: 6, top: "75%", left: "70%", size: "small", delay: "2.8s" },
  { id: 7, top: "28%", left: "30%", size: "tiny", delay: "1.4s" },
  { id: 8, top: "82%", left: "38%", size: "small", delay: "0.3s" },
  { id: 9, top: "55%", left: "48%", size: "tiny", delay: "2.4s" },
  { id: 10, top: "10%", left: "52%", size: "small", delay: "3.1s" },
  { id: 11, top: "40%", left: "12%", size: "tiny", delay: "1.1s" },
  { id: 12, top: "68%", left: "88%", size: "tiny", delay: "2.7s" },
];

const destinations = [
  {
    id: "fics",
    label: "Fics",
    to: "/fics",
    top: "26%",
    left: "72%",
    size: "large",
    type: "star",
    description:
      "Step into fanfiction archives, chapter worlds, and story collections gathered beneath their own constellations.",
  },
  {
    id: "originals",
    label: "Originals",
    to: "/originals",
    top: "68%",
    left: "68%",
    size: "large",
    type: "planet",
    description:
      "Explore original stories, characters, and settings built as their own distant worlds within the archive.",
  },
  {
    id: "extras",
    label: "Extras",
    to: "/extras",
    top: "48%",
    left: "28%",
    size: "medium",
    type: "portal",
    description:
      "Open side paths to bonus content, experiments, mini-pages, and future additions beyond the main routes.",
  },
];

const TRAVEL_DURATION = 1100;

export default function CelestialMap() {
  const navigate = useNavigate();

  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [travelingTo, setTravelingTo] = useState(null);

  const handleMove = (e) => {
    if (travelingTo) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPointer({ x, y });
    setIsActive(true);
  };

  const handleLeave = () => {
    if (travelingTo) return;
    setPointer({ x: 50, y: 50 });
    setIsActive(false);
  };

  const handleSelectDestination = (item) => {
    if (travelingTo) return;
    setSelectedDestination(item);
    setPointer({
      x: parseFloat(item.left),
      y: parseFloat(item.top),
    });
  };

  const handleEnterDestination = () => {
    if (!selectedDestination || travelingTo) return;

    setTravelingTo(selectedDestination.id);

    setTimeout(() => {
      navigate(selectedDestination.to);
    }, TRAVEL_DURATION);
  };

  const offsetX = travelingTo ? 0 : ((pointer.x - 50) / 50) * 10;
  const offsetY = travelingTo ? 0 : ((pointer.y - 50) / 50) * 10;

  return (
    <div
      className={`celestial-map ${isActive ? "is-active" : ""} ${
        selectedDestination ? "has-selection" : ""
      } ${travelingTo ? "is-traveling" : ""}`}
      aria-label="Interactive celestial navigation map"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ "--travel-duration": `${TRAVEL_DURATION}ms` }}
    >
      <div
        className="celestial-pointer-glow"
        style={{
          left: `${pointer.x}%`,
          top: `${pointer.y}%`,
        }}
      />

      <div className="celestial-travel-overlay" aria-hidden="true" />
      <div className="celestial-travel-stars" aria-hidden="true" />

      <div
        className="celestial-map-layer celestial-map-layer--back"
        style={{
          transform: `translate(${offsetX * -0.35}px, ${offsetY * -0.35}px)`,
        }}
      >
        <div className="celestial-map-glow" />
        <div className="celestial-map-noise" />

        <div className="shooting-star shooting-star-a" />
        <div className="shooting-star shooting-star-b" />

        {stars.map((star) => (
          <span
            key={star.id}
            className={`ambient-star ambient-star--${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
            aria-hidden="true"
          />
        ))}

        <div className="map-orbit map-orbit-outer" aria-hidden="true" />
        <div className="map-orbit map-orbit-inner" aria-hidden="true" />
        <div className="map-central-glow" aria-hidden="true" />
      </div>

      <div
        className="celestial-map-layer celestial-map-layer--front"
        style={{
          transform: `translate(${offsetX * -0.7}px, ${offsetY * -0.7}px)`,
        }}
      >
        <div className="map-moon" aria-hidden="true">
          <span className="map-moon-disc" />
          <span className="map-moon-cutout" />
        </div>

        {destinations.map((item) => {
          const isSelected = selectedDestination?.id === item.id;
          const isTraveling = travelingTo === item.id;
          const isDimmed =
            selectedDestination &&
            selectedDestination.id !== item.id &&
            !travelingTo;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectDestination(item)}
              className={`destination-star destination-star--${item.size} destination-star--${item.type} ${
                isSelected ? "destination-star--selected" : ""
              } ${isTraveling ? "destination-star--traveling" : ""} ${
                isDimmed ? "destination-star--dimmed" : ""
              }`}
              style={{ top: item.top, left: item.left }}
              aria-label={`Select ${item.label}`}
            >
              <span className="destination-core" />
              <span className="destination-ring" />
              <span className="destination-hover-glow" />
              {item.type === "planet" && <span className="destination-planet-ring" />}
              {item.type === "portal" && <span className="destination-portal-aura" />}
              <span className="destination-label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <aside
  className={`celestial-info-panel ${
    selectedDestination ? "celestial-info-panel--open" : ""
  } ${
    selectedDestination ? `celestial-info-panel--${selectedDestination.id}` : ""
  }`}
  aria-hidden={!selectedDestination}
>
  {selectedDestination && (
    <>
      <div className="celestial-info-panel__planet" aria-hidden="true" />
      <div className="celestial-info-panel__ring-system" aria-hidden="true">
        <div className="planetary-ring planetary-ring--inner" />
        <div className="planetary-ring planetary-ring--middle" />
        <div className="planetary-ring planetary-ring--outer" />
      </div>
      <div className="celestial-info-panel__sparkle" aria-hidden="true" />

      <div className="celestial-info-panel__content">
        <div className="celestial-info-panel__eyebrow">
          {selectedDestination.type === "star" && "Star Route"}
          {selectedDestination.type === "planet" && "World Route"}
          {selectedDestination.type === "portal" && "Portal Route"}
        </div>

        <h3 className="celestial-info-panel__title">
          {selectedDestination.label}
        </h3>

        <p className="celestial-info-panel__description">
          {selectedDestination.description}
        </p>

        <div className="celestial-info-panel__divider" aria-hidden="true" />

        <div className="celestial-info-panel__actions">
          <button
            type="button"
            className="celestial-enter-button"
            onClick={handleEnterDestination}
            disabled={Boolean(travelingTo)}
          >
            Enter
          </button>

          <button
            type="button"
            className="celestial-close-button"
            onClick={() => !travelingTo && setSelectedDestination(null)}
            disabled={Boolean(travelingTo)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )}
</aside>
    </div>
  );
}