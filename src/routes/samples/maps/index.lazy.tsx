import { createLazyFileRoute } from "@tanstack/react-router";
import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
} from "@vis.gl/react-google-maps";

export const Route = createLazyFileRoute("/samples/maps/")({
  component: Index,
});

const API_KEY = import.meta.env.FRONTEND_GOOGLE_API_KEY;

export default function Index() {
  const position = { lat: 35.689501375244, lng: 139.69173371705 };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          defaultCenter={position}
          defaultZoom={14}
          mapId={"DEMO_MAP_ID"}
          style={{ width: "100%", height: "100%" }}
        >
          <AdvancedMarker position={position} />
        </GoogleMap>
      </APIProvider>
    </div>
  );
}
