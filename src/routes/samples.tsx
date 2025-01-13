import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createFileRoute("/samples")({
  component: SamplesLayout,
});

function SamplesLayout() {
  return (
    <>
      <div>
        <Link to="/samples">Home</Link> | <Link to="/samples/about">About</Link>{" "}
        |<Link to="/samples/chakra-ui">chakraUi</Link> |
        <Link to="/samples/maps">GoogleMap</Link> |
        <Link to="/samples/directionMaps">GoogleMap (direction)</Link> |{" "}
        <Link to="/samples/agent">Agent</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
