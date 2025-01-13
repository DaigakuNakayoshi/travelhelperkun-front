import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.0-flash-exp",
  apiKey: import.meta.env.FRONTEND_GOOGLE_GEMINI_API_KEY,
});

const planSchema = z.object({
  plan: z.object({
    title: z.string().describe("title of the travel plan"),
    description: z.string().describe("description of the travel plan"),
    steps: z.array(z.string()).describe("steps of the travel plan"),
  }),
});

const outputParser = StructuredOutputParser.fromZodSchema(planSchema);

// TODO: プロンプトはチューニングが必要
const prompt = PromptTemplate.fromTemplate(
  `あなたは旅行プランナーです。ユーザーのリクエストに応じて、おすすめの旅行プランを提案してください。
  {format_instructions}
  ユーザーのリクエスト: {input}
  `,
);

export const agent = RunnableSequence.from([
  RunnablePassthrough.assign({
    input: (input: { input: string }) => input.input,
  }),
  RunnableLambda.from(() =>
    prompt.partial({
      format_instructions: outputParser.getFormatInstructions(),
    }),
  ),
  model,
  outputParser,
]);
