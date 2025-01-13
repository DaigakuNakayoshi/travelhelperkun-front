import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { agent } from "@/langchain/gemini";
import {
  Box,
  Button,
  Spinner,
  Text,
  createListCollection,
} from "@chakra-ui/react";
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
  origin: { name: string; address: string };
  destination: { name: string; address: string };
};

function GeminiPage() {
  const travelThemes = [
    "アクティビティ中心",
    "ゆっくりおだやかに",
    "豪遊旅",
    "コスパを求める旅行",
    "風情を楽しむ旅",
    "美食優先の旅",
    "SNS映えの旅",
    "歴史、文化を学ぶ旅",
  ];

  const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

  const [destination, setDestination] = useState(prefectures[0]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [days, setDays] = useState(1);
  const [theme, setTheme] = useState(travelThemes[0]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const additionalPromptInput = `旅行先: ${destination}, 人数: ${numberOfPeople}人, 日数: ${days}日, テーマ: ${theme}`;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await agent.invoke({
        input: additionalPromptInput,
      });
      setPlan(result?.plan);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Field label={"旅行先"} mb={4} required>
        <SelectRoot
          collection={createListCollection({
            items: prefectures.map((prefecture) => ({
              label: prefecture,
              value: prefecture,
            })),
          })}
          value={[destination]}
          onValueChange={(e) => setDestination(e.value[0])}
        >
          <SelectTrigger>
            <SelectValueText placeholder="例: 北海道" />
          </SelectTrigger>
          <SelectContent>
            {prefectures.map((item) => (
              <SelectItem key={item} item={{ label: item, value: item }}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field>
      <Field label={"人数"} mb={4}>
        <NumberInputRoot
          min={1}
          value={String(numberOfPeople)}
          onValueChange={(e) => setNumberOfPeople(Number(e.value))}
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
      <Field label={"日数"} mb={4}>
        <NumberInputRoot
          min={1}
          value={String(days)}
          onValueChange={(e) => setDays(Number(e.value))}
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
      <Field label={"旅行テーマを選択してください"} mb={4}>
        <SelectRoot
          collection={createListCollection({
            items: travelThemes.map((theme) => ({
              label: theme,
              value: theme,
            })),
          })}
          value={[theme]}
          onValueChange={(e) => setTheme(e.value[0])}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {travelThemes.map((theme) => (
              <SelectItem key={theme} item={{ label: theme, value: theme }}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field>
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
