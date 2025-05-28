import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import type { TravelFormData } from "./BasicInfoForm";

interface TravelThemeSelectorProps {
  formData: TravelFormData;
  onThemeSelect: (themeId: string) => void;
}

const travelThemes = [
  {
    id: "activity",
    name: "アクティビティ中心",
    imageUrl: "/images/activity.png",
  },
  {
    id: "relaxing",
    name: "ゆっくりのんびり旅",
    imageUrl: "/images/nonbiri.png",
  },
  {
    id: "luxury",
    name: "豪華リッチな旅",
    imageUrl: "/images/zeitaku.png",
  },
  {
    id: "budget",
    name: "賢く楽しむお得旅",
    imageUrl: "/images/sessei.png",
  },
  {
    id: "traditional",
    name: "日本の風情を味わう旅",
    imageUrl: "/images/kyoto.png",
  },
  {
    id: "gourmet",
    name: "美食を極める旅",
    imageUrl: "/images/food.png",
  },
  {
    id: "instagram",
    name: "SNS映え重視の旅",
    imageUrl: "/images/art.jpg",
  },
  {
    id: "history-culture",
    name: "歴史と文化を学ぶ旅",
    imageUrl: "/images/nara.png",
  },
  {
    id: "nature",
    name: "自然を満喫する旅",
    imageUrl: "/images/mtfuji.png",
  },
];

export function TravelThemeSelector({
  formData,
  onThemeSelect,
}: TravelThemeSelectorProps) {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const selectedBorderColor = "green.500";
  return (
    <Box mb={6}>
      <Heading
        as="h2"
        size="md"
        pb={2}
        borderBottom="1px"
        borderColor={borderColor}
        mb={4}
      >
        旅行のテーマ
        <Text as="span" color="red.500" ml={1}>
          *
        </Text>
      </Heading>

      <Box bg={headerBg} p={4} mb={4} textAlign="center" fontWeight="bold">
        好みのテーマ
      </Box>

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
            onClick={() => onThemeSelect(theme.id)}
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
  );
}
