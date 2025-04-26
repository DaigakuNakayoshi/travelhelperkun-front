import { agent } from "@/agents/travelPlanner";
import type { TravelFormData } from "@/components/travel/BasicInfoForm";
import type { TravelPlan } from "@/hooks/travel/useTravelPlanner";
import { createContext, useContext, useMemo, useState } from "react";

interface TravelPlannerContextType {
  formData: TravelFormData;
  plan: TravelPlan | null;
  isLoading: boolean;
  isValid: boolean;
  handleInputChange: (field: keyof TravelFormData, value: string) => void;
  handleThemeSelect: (themeId: string) => void;
  generatePlan: () => Promise<void>;
}

const TravelPlannerContext = createContext<
  TravelPlannerContextType | undefined
>(undefined);

const initialFormData: TravelFormData = {
  departureLocation: "",
  destinationLocation: "",
  numberOfPeople: "",
  numberOfDays: "",
  travelTheme: "",
  selectedMonth: "",
  userInterest: "",
};

export function TravelPlannerProvider({
  children,
}: { children: React.ReactNode }) {
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

  const value = {
    formData,
    plan,
    isLoading,
    isValid,
    handleInputChange,
    handleThemeSelect,
    generatePlan,
  };

  return (
    <TravelPlannerContext.Provider value={value}>
      {children}
    </TravelPlannerContext.Provider>
  );
}

export function useTravelPlannerContext() {
  const context = useContext(TravelPlannerContext);
  if (context === undefined) {
    throw new Error(
      "useTravelPlannerContext must be used within a TravelPlannerProvider",
    );
  }
  return context;
}
