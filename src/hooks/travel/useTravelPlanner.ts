import { agent } from "@/agents/travelPlanner";
import type { TravelFormData } from "@/components/travel/BasicInfoForm";
import { useState, useMemo } from "react";

export type TravelPlan = {
  title: string;
  description: string;
  steps: {
    stepPerDay: number;
    detailSteps: { time: string; description: string }[];
  }[];
  travel_cost: {
    total: string;
    transportation: string;
    accommodation: string;
    food: string;
    activities: string;
    other: string;
    total_per_person: string;
  };
  waypoints: { name: string; address: string }[];
  origin: { name: string; address: string };
  destination: { name: string; address: string };
  google_maps_waypoints: { name: string; address: string }[];
  google_maps_origin: { name: string; address: string };
  google_maps_destination: { name: string; address: string };
};

const initialFormData: TravelFormData = {
  departureLocation: "",
  destinationLocation: "",
  numberOfPeople: "",
  numberOfDays: "",
  travelTheme: "",
  selectedMonth: "",
  userInterest: "",
};

export function useTravelPlanner() {
  const [formData, setFormData] = useState<TravelFormData>(initialFormData);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = useMemo(() => {
    return (
      formData.departureLocation !== "" &&
      formData.destinationLocation !== "" &&
      formData.numberOfPeople !== "" &&
      formData.numberOfDays !== "" &&
      formData.travelTheme !== ""
    );
  }, [formData]);

  const handleInputChange = (field: keyof TravelFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleThemeSelect = (themeId: string) => {
    setFormData({ ...formData, travelTheme: themeId });
  };

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const additionalPromptInput = `出発地: ${formData.departureLocation}, 旅行先: ${formData.destinationLocation}, 人数: ${formData.numberOfPeople}, 日数: ${formData.numberOfDays}, テーマ: ${formData.travelTheme}, 旅行希望月: ${formData.selectedMonth}, ユーザーの興味関心: ${formData.userInterest}`;

      const result = await agent.invoke({
        input: additionalPromptInput,
      });
      setPlan(result?.plan);
    } catch (error) {
      console.error("Error generating travel plan:", error);
      // TODO: エラー処理を実装
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    plan,
    isLoading,
    isValid,
    handleInputChange,
    handleThemeSelect,
    generatePlan,
  };
}