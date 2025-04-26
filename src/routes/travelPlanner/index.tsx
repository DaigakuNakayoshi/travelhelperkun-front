import { BasicInfoForm } from "@/components/travel/BasicInfoForm";
import { TravelPlanResult } from "@/components/travel/TravelPlanResult";
import { TravelThemeSelector } from "@/components/travel/TravelThemeSelector";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useTravelPlannerContext } from "@/contexts/TravelPlannerContext";
import { Button, Center, Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/travelPlanner/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    formData,
    plan,
    isLoading,
    isValid,
    handleInputChange,
    handleThemeSelect,
    generatePlan,
  } = useTravelPlannerContext();

  return (
    <Container maxW="container.lg" py={6}>
      <BasicInfoForm formData={formData} onInputChange={handleInputChange} />
      <TravelThemeSelector
        formData={formData}
        onThemeSelect={handleThemeSelect}
      />

      <Center mt={8} mb={4}>
        <Button
          onClick={generatePlan}
          size="md"
          px={10}
          borderWidth="1px"
          loading={isLoading}
          disabled={!isValid}
        >
          生成ボタン
        </Button>
      </Center>

      <TravelPlanResult plan={plan} isLoading={isLoading} />
    </Container>
  );
}
