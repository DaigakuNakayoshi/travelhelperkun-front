import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Field, Heading, NativeSelect, Table } from "@chakra-ui/react";

export interface TravelFormData {
  departureLocation: string;
  destinationLocation: string;
  numberOfPeople: string;
  numberOfDays: string;
  travelTheme: string;
}

interface BasicInfoFormProps {
  formData: TravelFormData;
  onInputChange: (field: keyof TravelFormData, value: string) => void;
}

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
const daysOptions = [
  "日帰り",
  "1泊2日",
  "2泊3日",
  "3泊4日",
  "4泊5日",
  "5泊以上",
];

export function BasicInfoForm({ formData, onInputChange }: BasicInfoFormProps) {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
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
                      onInputChange("departureLocation", e.target.value)
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
                      onInputChange("destinationLocation", e.target.value)
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
                      onInputChange("numberOfPeople", e.target.value)
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
                      onInputChange("numberOfDays", e.target.value)
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
  );
}
