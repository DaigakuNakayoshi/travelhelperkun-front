import { GoogleMapWithDirection } from "@/components/samples/agent/GoogleMapWithDirection";
import type { TravelPlan } from "@/hooks/travel/useTravelPlanner";
import { Box, Text } from "@chakra-ui/react";

interface TravelPlanResultProps {
  plan: TravelPlan | null;
  isLoading: boolean;
}

export function TravelPlanResult({ plan, isLoading }: TravelPlanResultProps) {
  if (isLoading) {
    return <></>;
  }

  if (!plan) {
    return null;
  }

  return (
    <Box mt={4}>
      <Text fontWeight="bold" fontSize="2xl">
        {plan.title}
      </Text>
      <Text fontSize="lg">{plan.description}</Text>
      <Box mt={2}>
        {plan.steps.map((step, stepIndex) => (
          <Box key={`${stepIndex}-${step.stepPerDay}`} mt={2}>
            <Text fontWeight="bold">{step.stepPerDay}日目:</Text>
            {step.detailSteps.map((detailStep, detailStepIndex) => (
              <Text key={`${detailStepIndex}-${detailStep.description}`} mt={1}>
                {detailStep.time} {detailStep.description}
              </Text>
            ))}
          </Box>
        ))}
      </Box>
      <Text mt={2} fontWeight="bold">
        旅費:
      </Text>
      <Text mt={1}>合計: {plan.travel_cost.total}</Text>
      <Text mt={1}>一人当たり: {plan.travel_cost.total_per_person}</Text>
      <Text mt={1}>交通費: {plan.travel_cost.transportation}</Text>
      <Text mt={1}>宿泊費: {plan.travel_cost.accommodation}</Text>
      <Text mt={1}>食費: {plan.travel_cost.food}</Text>
      <Text mt={1}>アクティビティ費: {plan.travel_cost.activities}</Text>
      <Text mt={1}>その他: {plan.travel_cost.other}</Text>

      <Box mt={4}>
        <GoogleMapWithDirection
          waypoints={plan.google_maps_waypoints}
          origin={plan.google_maps_origin}
          destination={plan.google_maps_destination}
        />
      </Box>
    </Box>
  );
}
