import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |
        <Link to="/chakra-ui">chakraUi</Link> |<Link to="/maps">GoogleMap</Link>{" "}
        |<Link to="/directionMaps">GoogleMap (direction)</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
