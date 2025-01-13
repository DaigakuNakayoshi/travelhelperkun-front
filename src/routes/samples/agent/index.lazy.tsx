import { agent } from "@/agents/travelPlanner";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GoogleMapWithDirection } from "../../../components/samples/agent/GoogleMapWithDirection";

export const Route = createLazyFileRoute("/samples/agent/")({
  component: GeminiPage,
});

type TravelPlan = {
  title: string;
  description: string;
  steps: string[];
  travel_cost: string;
  waypoints: { name: string; address: string }[];
  origin: { name: string; address: string };
  destination: { name: string; address: string };
};

function GeminiPage() {
  const travelThemes = [
    "アクティビティ中心",
    "ゆっくりおだやかに",
    "豪遊旅",
    "コスパを求める旅行",
    "風情を楽しむ旅",
    "美食優先の旅",
    "SNS映えの旅",
    "歴史、文化を学ぶ旅",
  ];

  const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

  const [destination, setDestination] = useState(prefectures[0]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [days, setDays] = useState(1);
  const [theme, setTheme] = useState(travelThemes[0]);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const additionalPromptInput = `旅行先: ${destination}, 人数: ${numberOfPeople}人, 日数: ${days}日, テーマ: ${theme}`;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await agent.invoke({
        input: additionalPromptInput,
      });
      setPlan(result?.plan);
    } finally {
      setIsLoading(false);
    }
  };

  const DestinationSelection = () => (
    <>
      <Field label={"旅行先"} mb={4} required>
        <NativeSelectRoot size="sm" width="240px">
          <NativeSelectField
            placeholder="Select option"
            value={destination}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setDestination(e.currentTarget.value)
            }
          >
            {prefectures.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label={"人数"} mb={4}>
        <NumberInputRoot
          min={1}
          value={String(numberOfPeople)}
          onValueChange={(e) => setNumberOfPeople(Number(e.value))}
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
      <Field label={"日数"} mb={4}>
        <NumberInputRoot
          min={1}
          value={String(days)}
          onValueChange={(e) => setDays(Number(e.value))}
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
      <Field label={"旅行テーマを選択してください"} mb={4}>
        <NativeSelectRoot size="sm" width="240px">
          <NativeSelectField
            placeholder="Select option"
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTheme(e.currentTarget.value)
            }
          >
            {travelThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
    </>
  );

  return (
    <Box p={4}>
      <DestinationSelection />
      <Button type="button" onClick={handleClick} disabled={isLoading}>
        旅行プランを作成
      </Button>
      <Box mt={4}>
        {isLoading ? <Spinner /> : plan ? <PlanDetail plan={plan} /> : null}
      </Box>
    </Box>
  );
}

function PlanDetail({ plan }: { plan: TravelPlan }) {
  return (
    <Box>
      <Text fontWeight="bold">{plan.title}</Text>
      <Text>{plan.description}</Text>
      <Box mt={2}>
        {plan.steps.map((step: string) => (
          <Text key={step}>{step}</Text>
        ))}
      </Box>
      <Text mt={2}>旅費: {plan.travel_cost}</Text>
      <Text mt={2}>
        経由地: {plan.waypoints.map((waypoint) => waypoint.name).join(", ")}
      </Text>
      <GoogleMapWithDirection
        waypoints={plan.waypoints}
        origin={plan.origin}
        destination={plan.destination}
      />
    </Box>
  );
}
