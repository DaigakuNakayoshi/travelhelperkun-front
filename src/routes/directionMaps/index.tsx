import { createFileRoute } from "@tanstack/react-router";
import {
  APIProvider,
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/directionMaps/")({
  component: Index,
});

const API_KEY = import.meta.env.FRONTEND_GOOGLE_API_KEY;

export default function Index() {
  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          defaultZoom={9}
          gestureHandling={"greedy"}
          fullscreenControl={false}
        >
          <Directions />
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

// @see: https://developers.google.com/maps/documentation/javascript/directions?hl=ja
function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    // A->B
    directionsService
      .route({
        origin: "東京都新宿区西新宿2丁目8-1", // 都庁
        waypoints: [{ location: "東京都港区赤坂9-7-1", stopover: true }], // ミッドタウン
        destination: "東京都千代田区丸の内一丁目９番１号", // 東京駅
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;

    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary || "ルート"}</h2>

      {selected.legs.map((leg) => (
        <div key={`${leg.start_address}-${leg.end_address}`}>
          <p>
            {leg.start_address.split(",")[0]} → {leg.end_address.split(",")[0]}
          </p>
          <p>距離: {leg.distance?.text}</p>
          <p>所要時間: {leg.duration?.text}</p>
        </div>
      ))}
    </div>
  );
}
