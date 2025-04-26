import { TravelPlannerProvider } from "@/contexts/TravelPlannerContext";
import { Box, Container } from "@chakra-ui/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createFileRoute("/travelPlanner")({
  component: TravelPlannerLayout,
});

function TravelPlannerLayout() {
  return (
    <TravelPlannerProvider>
      <Container maxW="container.lg" py={6}>
        <Box mb={4}>
          <Link to="/travelPlanner">Top</Link> |{" "}
          {/* 将来的に追加される可能性のあるページへのリンク */}
          {/* <Link to="/travelPlanner/history">履歴</Link> |{" "}
          <Link to="/travelPlanner/saved">保存済みプラン</Link> */}
        </Box>
        <hr />
        <Box mt={4}>
          <Outlet />
        </Box>
        <TanStackRouterDevtools />
      </Container>
    </TravelPlannerProvider>
  );
}
