import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Center,
  Container,
  Field,
  Grid,
  GridItem,
  Heading,
  Image,
  NativeSelect,
  RadioGroup,
  Table,
  Text,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export const Route = createFileRoute("/travelPlanner")({
  component: RouteComponent,
});

interface TravelFormData {
  departureLocation: string;
  destinationLocation: string;
  numberOfPeople: string;
  numberOfDays: string;
  travelTheme: string;
}

// TODO: いい感じの写真を持ってくる
const travelThemes = [
  {
    id: "first-kyoto",
    name: "はじめての京都旅",
    imageUrl: "/images/kyoto.png",
  },
  {
    id: "history-culture",
    name: "歴史・文化を感じる旅",
    imageUrl: "/images/kyoto.png",
  },
  { id: "family", name: "家族で楽しむ旅", imageUrl: "/images/family.png" },
  { id: "art", name: "芸術に触れる旅", imageUrl: "/images/art.jpg" },
  {
    id: "food",
    name: "食を味わう旅",
    imageUrl: "/images/food.png",
  },
  {
    id: "kyoto-craft",
    name: "京土産を探す旅",
    imageUrl: "/images/kyoto.png",
  },
  {
    id: "arashiyama",
    name: "嵐山エリア快適観光の旅",
    imageUrl: "/images/kyoto.png",
  },
  {
    id: "higashiyama",
    name: "東山エリア快適観光の旅",
    imageUrl: "/images/kyoto.png",
  },
  {
    id: "activity",
    name: "アクティビティ",
    imageUrl: "/images/activity.png",
  },
];

// 都道府県のリスト
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

const peopleOptions = ["1人", "2人", "3人", "4人", "5人", "6人以上"];

// 日数オプション
const daysOptions = [
  "日帰り",
  "1泊2日",
  "2泊3日",
  "3泊4日",
  "4泊5日",
  "5泊以上",
];

function RouteComponent() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const selectedBorderColor = "green.500";
  const buttonBg = useColorModeValue("gray.100", "gray.600");

  const handleInputChange = (field: keyof TravelFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleThemeSelect = (themeId: string) => {
    setFormData({ ...formData, travelTheme: themeId });
    console.log(themeId);
    console.log(formData);
  };

  const resetTheme = () => {
    setFormData({ ...formData, travelTheme: "" });
  };

  const handleSubmit = () => {
    // onSubmit関数が定義されていないため、console.logで確認します
    console.log(formData);
  };

  const [formData, setFormData] = useState<TravelFormData>({
    departureLocation: "",
    destinationLocation: "",
    numberOfPeople: "",
    numberOfDays: "",
    travelTheme: "",
  });

  return (
    <Container maxW="container.lg" py={6}>
      <Box mb={6}>
        <Heading
          as="h2"
          size="md"
          textAlign="center"
          pb={2}
          borderBottom="1px"
          borderColor={borderColor}
          mb={4}
        >
          基本情報の入力
        </Heading>

        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell fontWeight="bold" textAlign="right" width="30%">
                出発地点
              </Table.Cell>
              <Table.Cell>
                <Field.Root>
                  <NativeSelect.Root width="200px">
                    <NativeSelect.Field
                      value={formData.departureLocation}
                      onChange={(e) =>
                        handleInputChange("departureLocation", e.target.value)
                      }
                    >
                      <option value="">都道府県を選択▼</option>
                      {prefectures.map((prefecture) => (
                        <option key={prefecture} value={prefecture}>
                          {prefecture}
                        </option>
                      ))}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell fontWeight="bold" textAlign="right">
                旅行地点
              </Table.Cell>
              <Table.Cell>
                <Field.Root>
                  <NativeSelect.Root width="200px">
                    <NativeSelect.Field
                      value={formData.destinationLocation}
                      onChange={(e) =>
                        handleInputChange("destinationLocation", e.target.value)
                      }
                    >
                      <option value="">都道府県を選択▼</option>
                      {prefectures.map((prefecture) => (
                        <option key={prefecture} value={prefecture}>
                          {prefecture}
                        </option>
                      ))}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell fontWeight="bold" textAlign="right">
                人数
              </Table.Cell>
              <Table.Cell>
                <Field.Root>
                  <NativeSelect.Root width="200px">
                    <NativeSelect.Field
                      value={formData.numberOfPeople}
                      onChange={(e) =>
                        handleInputChange("numberOfPeople", e.target.value)
                      }
                    >
                      <option value="">人数を選択▼</option>
                      {peopleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell fontWeight="bold" textAlign="right">
                日数
              </Table.Cell>
              <Table.Cell>
                <Field.Root>
                  <NativeSelect.Root width="200px">
                    <NativeSelect.Field
                      value={formData.numberOfDays}
                      onChange={(e) =>
                        handleInputChange("numberOfDays", e.target.value)
                      }
                    >
                      <option value="">日数を選択▼</option>
                      {daysOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>

      <Box mb={6}>
        <Heading
          as="h2"
          size="md"
          pb={2}
          borderBottom="1px"
          borderColor={borderColor}
          mb={4}
        >
          旅行のテーマ（※下から選択）
        </Heading>

        <Box bg={headerBg} p={4} mb={4} textAlign="center" fontWeight="bold">
          好みのテーマ
        </Box>

        {formData.travelTheme === "kyoto-food" && (
          <Text textAlign="center" mb={4} fontSize="sm">
            「京都の食を味わう旅」を選択される場合は、下の「基本情報の設定」から「出発時間」を指定してください。
          </Text>
        )}

        <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6}>
          {travelThemes.map((theme) => (
            <GridItem
              key={theme.id}
              position="relative"
              border="1px"
              borderColor={
                formData.travelTheme === theme.id
                  ? selectedBorderColor
                  : borderColor
              }
              borderWidth={formData.travelTheme === theme.id ? "2px" : "1px"}
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              onClick={() => handleThemeSelect(theme.id)}
            >
              <Box position="relative" h="150px">
                <Image
                  src={theme.imageUrl}
                  alt={theme.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  w="100%"
                  bg="blackAlpha.600"
                  color="white"
                  p={2}
                  textAlign="center"
                >
                  {theme.name}
                </Box>
                {formData.travelTheme === theme.id && (
                  <Box position="absolute" top={1} left={1} zIndex={99}>
                    <AiFillCheckCircle size={"40px"} color="green" />
                  </Box>
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>

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
