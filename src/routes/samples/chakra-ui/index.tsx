import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  Progress,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { LuCheck, LuPackage, LuShip } from "react-icons/lu";

export const Route = createFileRoute("/samples/chakra-ui/")({
  component: Index,
});

export default function Index() {
  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Heading size="2xl" letterSpacing="tight">
          Welcome to Chakra UI v3 + Vite
        </Heading>

        <HStack gap="10">
          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>Checkbox</Checkbox.Label>
          </Checkbox.Root>

          <RadioGroup.Root display="inline-flex" defaultValue="1">
            <RadioGroup.Item value="1" mr="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </HStack>

        <Progress.Root width="300px" value={65} striped>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <HStack>
          <Button>Let's go!</Button>
          <Button variant="outline">bun install @chakra-ui/react</Button>
        </HStack>

        <HStack>
          <TimeLineSample />
        </HStack>
      </VStack>
    </Box>
  );
}

// https://www.chakra-ui.com/docs/components/timeline
const TimeLineSample = () => {
  return (
    <TimelineRoot maxW="400px">
      <TimelineItem>
        <TimelineConnector>
          <LuShip />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle>Product Shipped</TimelineTitle>
          <TimelineDescription>13th May 2021</TimelineDescription>
          <Text textStyle="sm">
            We shipped your product via <strong>FedEx</strong> and it should
            arrive within 3-5 business days.
          </Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <LuCheck />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle textStyle="sm">Order Confirmed</TimelineTitle>
          <TimelineDescription>18th May 2021</TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <LuPackage />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle textStyle="sm">Order Delivered</TimelineTitle>
          <TimelineDescription>20th May 2021, 10:30am</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  );
};
