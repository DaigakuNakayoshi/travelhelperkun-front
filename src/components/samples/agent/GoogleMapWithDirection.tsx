import { Box } from "@chakra-ui/react";
import {
  APIProvider,
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type Waypoint = { name: string; address: string };
type Location = { name: string; address: string };

interface DirectionsProps {
  waypoints?: Waypoint[];
  origin?: Location;
  destination?: Location;
}

export function GoogleMapWithDirection({
  waypoints,
  origin,
  destination,
}: {
  waypoints: Waypoint[];
  origin: Location;
  destination: Location;
}) {
  const API_KEY = import.meta.env.FRONTEND_GOOGLE_API_KEY;
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          defaultZoom={8}
          gestureHandling={"greedy"}
          fullscreenControl={false}
        >
          <Directions
            waypoints={waypoints}
            origin={origin}
            destination={destination}
          />
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

// @see: https://developers.google.com/maps/documentation/javascript/directions?hl=ja
function Directions({ waypoints, origin, destination }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex] = useState(0);
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
    if (
      !directionsService ||
      !directionsRenderer ||
      !waypoints ||
      !origin ||
      !destination
    )
      return;

    const waypointsForDirections = waypoints.map((waypoint) => ({
      location: waypoint.address,
      stopover: true,
    }));

    directionsService
      .route({
        origin: origin.address || origin.name,
        waypoints: waypointsForDirections,
        destination: destination.address || destination.name,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        avoidHighways: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, waypoints, origin, destination]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;

    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      shadow="lg"
      maxW="sm"
      maxH="80vh"
      overflowY="auto"
      fontSize={10}
    >
      <div className="directions">
        <h2>{selected.summary || "ルート"}</h2>

        {selected.legs.map((leg, index) => (
          <div key={`${leg.start_address}-${leg.end_address}`}>
            <p>
              {index === 0 ? origin?.name : waypoints?.[index]?.name} (
              {routes.length > 0 && index === 0 ? "Start" : "Waypoint"}
              )
              <br />
              {leg.start_address.split(",")[0]}
              <br />→{" "}
              {index === selected.legs.length - 1
                ? destination?.name
                : waypoints?.[index + 1]?.name}{" "}
              (
              {routes.length > 0 && index === selected.legs.length - 1
                ? "End"
                : "Waypoint"}
              )
              <br />
              {leg.end_address.split(",")[0]}
            </p>
            <p>距離: {leg.distance?.text}</p>
            <p>所要時間: {leg.duration?.text}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}
