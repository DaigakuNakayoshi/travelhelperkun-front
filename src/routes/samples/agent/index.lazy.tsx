import { agent } from "@/langchain/gemini";
import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  APIProvider,
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/samples/agent/")({
  component: GeminiPage,
});

type Plan = {
  title: string;
  description: string;
  steps: string[];
  travel_cost: string;
  waypoints: { name: string; address: string }[];
  origin: { name: string; address: string; };
  destination: { name: string; address: string; };
};

function GeminiPage() {
  const [input, setInput] = useState("おすすめの旅行プラン");
  const [plan, setPlan] = useState<Plan | null>(null);
  console.log(plan);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await agent.invoke({ input: input });
      setPlan(result?.plan);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Input
        placeholder="旅行のアイデアを入力してください"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        mb={4}
      />
      <Button type="button" onClick={handleClick} disabled={isLoading}>
        旅行プランを作成
      </Button>
      <Box mt={4}>
        {isLoading ? <Spinner /> : plan ? <Plan plan={plan} /> : null}
      </Box>
    </Box>
  );
}

const API_KEY = import.meta.env.FRONTEND_GOOGLE_API_KEY;

function Plan({ plan }: { plan: Plan }) {
  return (
    <Box>
      <Text fontWeight="bold">{plan.title}</Text>
      <Text>{plan.description}</Text>
      <Box mt={2}>
        {plan.steps.map((step: string) => (
          <Text key={step}>{step}</Text>
        ))}
      </Box>
      <Text mt={2}>Travel Cost: {plan.travel_cost}</Text>
      <Text mt={2}>
        Waypoints: {plan.waypoints.map((waypoint) => waypoint.name).join(", ")}
      </Text>
      <div style={{ width: "100%", height: "500px" }}>
        <APIProvider apiKey={API_KEY}>
          <GoogleMap
            defaultZoom={8}
            gestureHandling={"greedy"}
            fullscreenControl={false}
          >
            <Directions
              waypoints={plan.waypoints}
              origin={plan.origin}
              destination={plan.destination}
            />
          </GoogleMap>
        </APIProvider>
      </div>
      <Directions
        waypoints={plan.waypoints}
        origin={plan.origin}
        destination={plan.destination}
      />
    </Box>
  );
}

// @see: https://developers.google.com/maps/documentation/javascript/directions?hl=ja
function Directions({
  waypoints,
  origin,
  destination,
}: {
  waypoints?: { name: string; address: string }[];
  origin?: { name: string; address: string };
  destination?: { name: string; address: string };
}) {
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
              {routes.length > 0 && index === 0
                ? "Start"
                : "Waypoint"}
              )
              <br />
              {leg.start_address.split(",")[0]}
              <br />→ {index === selected.legs.length - 1 ? destination?.name : waypoints?.[index+1]?.name} (
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
