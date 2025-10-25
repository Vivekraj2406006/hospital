import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const hospitals = [
  { name: "SR EMERGENCY Downtown", lat: 25.799529, lon: 85.908428 },
  // { name: "SR EMERGENCY Westside", lat: 25.799529, lon: 85.908428 },
  // { name: "SR EMERGENCY Valley", lat: 25.799529, lon: 85.908428 },
];

function ChangeView({ center, bounds }) {
  const map = useMap();
  if (bounds) map.fitBounds(bounds, { padding: [50, 50] });
  else if (center) map.setView(center, 13);
  return null;
}

const userIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
        <circle cx="12" cy="12" r="10" fill="#0891b2" stroke="#ffffff" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="#ffffff"/>
      </svg>
    `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});


function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds) {
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours} hr ${remaining} min`;
}

const Locations = () => {
  const [selectedHospitalIndex, setSelectedHospitalIndex] = useState(0);
  const [transportMode, setTransportMode] = useState("driving");
  const [userLocation, setUserLocation] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const selectedHospital = hospitals[selectedHospitalIndex];
  const hospitalCoords = [selectedHospital.lat, selectedHospital.lon];
  const bounds = userLocation ? [userLocation, hospitalCoords] : null;

  useEffect(() => {
    if (userLocation) getRoute();
  }, [userLocation, selectedHospitalIndex, transportMode]);

  const handleLocateMeClick = () => {
    if (!navigator.geolocation) {
      setStatusMessage("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    setStatusMessage("Locating you…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setStatusMessage("Location found! Fetching directions…");
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setIsLocating(false);
        setStatusMessage(
          err.code === err.PERMISSION_DENIED
            ? "Please allow location access to get directions."
            : "Could not get your location."
        );
      }
    );
  };

  const getRoute = async () => {
    if (!userLocation) return;
    setStatusMessage("Fetching directions…");
    setRouteData(null);

    const coords = `${userLocation[1]},${userLocation[0]};${selectedHospital.lon},${selectedHospital.lat}`;
    const url = `https://router.project-osrm.org/route/v1/${transportMode}/${coords}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data.routes?.length) {
        const route = data.routes[0];
        setRouteData(route.geometry);
        const dist = formatDistance(route.legs[0].distance);
        const dur = formatDuration(route.legs[0].duration);
        setStatusMessage(`Route found: ${dist}, approx. ${dur}.`);
      } else throw new Error("No route found.");
    } catch {
      setStatusMessage("Could not fetch directions.");
    }
  };

  return (
    <section id="locations" className="py-16 md:py-24 bg-surface">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">
          Find Our Locations
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Get directions to your nearest SR EMERGENCY facility.
        </p>
      </div>

      {/* Map & Controls Side by Side */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[40%_58%] gap-8 max-w-7xl">

        {/* Locate & Direct Me Controls */}
        <div className="bg-surface-variant p-6 rounded-2xl shadow-md flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-6 text-fg">
            Locate & Direct Me
          </h3>

          <div className="space-y-6">
            {/* Hospital Select */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                Select a Location
              </label>
              <select
                value={selectedHospitalIndex}
                onChange={(e) => setSelectedHospitalIndex(Number(e.target.value))}
                className="w-full px-4 py-3 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
              >
                {hospitals.map((h, i) => (
                  <option key={i} value={i}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Transport Mode */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                Transport Mode
              </label>
              <select
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
                className="w-full px-4 py-3 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
              >
                <option value="driving">Driving</option>
                <option value="walking">Walking</option>
              </select>
            </div>

            {/* Locate Button */}
            <button
              onClick={handleLocateMeClick}
              disabled={isLocating}
              className="w-full bg-[#07aec0] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-primary/90 transition flex items-center justify-center disabled:opacity-50"
            >
              <MapPin className="w-5 h-5 mr-2" />
              {isLocating ? "Locating…" : "Locate Me & Get Directions"}
            </button>

            <div className="text-center text-muted mt-4 h-6">
              {statusMessage}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-fg">Map View</h3>
          <div className="w-full relative rounded-2xl shadow-md border border-outline overflow-hidden">
            <MapContainer
              center={hospitalCoords}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "500px", width: "100%" }}
              // zoomControl={false}
            >
              <ChangeView center={hospitalCoords} bounds={bounds} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={hospitalCoords}>
                <Popup>{selectedHospital.name}</Popup>
              </Marker>
              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              {routeData && (
                <GeoJSON
                  data={routeData}
                  style={{ color: "#0891b2", weight: 5, opacity: 0.9 }}
                />
              )}
            </MapContainer>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Locations;
