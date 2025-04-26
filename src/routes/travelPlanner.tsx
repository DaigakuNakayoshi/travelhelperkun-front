import { BasicInfoForm } from "@/components/travel/BasicInfoForm";
import type { TravelFormData } from "@/components/travel/BasicInfoForm";
import { TravelThemeSelector } from "@/components/travel/TravelThemeSelector";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Button, Center, Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/travelPlanner")({
  component: RouteComponent,
});

function RouteComponent() {
  const buttonBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [formData, setFormData] = useState<TravelFormData>({
    departureLocation: "",
    destinationLocation: "",
    numberOfPeople: "",
    numberOfDays: "",
    travelTheme: "",
  });

  const handleInputChange = (field: keyof TravelFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleThemeSelect = (themeId: string) => {
    setFormData({ ...formData, travelTheme: themeId });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Container maxW="container.lg" py={6}>
      <BasicInfoForm formData={formData} onInputChange={handleInputChange} />
      <TravelThemeSelector
        formData={formData}
        onThemeSelect={handleThemeSelect}
      />

      <Center mt={8} mb={4}>
        <Button
          onClick={handleSubmit}
          size="md"
          px={10}
          bg={buttonBg}
          borderColor={borderColor}
          borderWidth="1px"
        >
          生成ボタン
        </Button>
      </Center>
    </Container>
  );
}
