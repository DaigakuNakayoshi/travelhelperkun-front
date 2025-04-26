import { Box, Container, Heading, Text Heading, chakra-uirom '@ui/react'
import { createFileRoutetack/reacttanstack-router

export const Route = createFileRoute('/travelPlanner/result/')({
  component: TravelPlannerResult,
})

function TravelPlannerResult() {
  const { state } = Route.useSearch()
  const plan = state?.plan

  if (!plan) {
    return (
      <Container maxW="container.lg" py={6}>
        <Text>プランが見つかりません</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.lg" py={6}>
      <Heading as="h1" size="lg" mb={4}>
        旅行プラン詳細
      </Heading>
      <Box>
        {/* プランの内容を表示 */}
        <pre>{JSON.stringify(plan, null, 2)}</pre>
      </Box>
    </Container>
  )
}