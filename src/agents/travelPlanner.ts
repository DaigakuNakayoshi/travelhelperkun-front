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
    steps: z
      .array(
        z.object({
          stepPerDay: z.number().describe("day of the travel plan"),
          detailSteps: z
            .array(
              z.object({
                time: z.string().describe("time of the step"),
                description: z.string().describe("description of the step"),
              }),
            )
            .describe("steps of the day"),
        }),
      )
      .describe("steps of the travel plan, grouped by day, with time"),
    travel_cost: z
      .object({
        total: z.string().describe("total estimated travel cost"),
        transportation: z.string().describe("estimated transportation cost"),
        accommodation: z.string().describe("estimated accommodation cost"),
        food: z.string().describe("estimated food cost"),
        activities: z.string().describe("estimated activities cost"),
        other: z.string().describe("other estimated costs"),
        total_per_person: z
          .string()
          .describe("total estimated travel cost per person"),
      })
      .describe("estimated travel cost"),
    waypoints: z
      .array(
        z.object({
          name: z.string().describe("name of the waypoint"),
          address: z.string().describe("address of the waypoint"),
        }),
      )
      .describe("waypoints of the travel plan"),
    origin: z
      .object({
        name: z.string().describe("name of the starting point"),
        address: z.string().describe("address of the starting point"),
      })
      .describe("starting point of the travel plan"),
    destination: z
      .object({
        name: z.string().describe("name of the final destination"),
        address: z.string().describe("address of the final destination"),
      })
      .describe("final destination of the travel plan"),
    departure_location: z
      .string()
      .describe("departure location of the travel plan"),
    google_maps_waypoints: z
      .array(
        z.object({
          name: z.string().describe("name of the waypoint"),
          address: z.string().describe("address of the waypoint"),
        }),
      )
      .describe("waypoints for google maps directions"),
    google_maps_origin: z
      .object({
        name: z.string().describe("name of the starting point for google maps"),
        address: z
          .string()
          .describe("address of the starting point for google maps"),
      })
      .describe("starting point of the travel plan for google maps"),
    google_maps_destination: z
      .object({
        name: z
          .string()
          .describe("name of the final destination for google maps"),
        address: z
          .string()
          .describe("address of the final destination for google maps"),
      })
      .describe("final destination of the travel plan for google maps"),
  }),
});

const outputParser = StructuredOutputParser.fromZodSchema(planSchema);

const prompt = PromptTemplate.fromTemplate(
  `# 必要要件
  
  - あなたは旅行プランを考えるプランナーです。
  - 渡す情報は日程、出発地（都道府県）、目的地（空港、新幹線駅など）、希望する観光内容、コンセプト
  - 上記の情報を用いて、旅行プランを作成してください。出発地、最終目的地は、特別な理由（新幹線で到着して飛行機で帰るなど）がない限り、同じ場所か非常に近い場所になるようにしてください。経由地は、緯度経度変換させるので、住所を取得してください。もし、住所が不明な場合は、場所の正式名称を返却してください。「現在地」という文字列は使用しないでください。
  - 旅行プランの最後は出発地に戻るようにしてください。
  - 旅行費用は出発地から目的地までの往復費用を含めてください。現実的な価格で算出してください。
  - 旅行費用は一人当たりの費用も算出してください。total_per_personフィールドに記載してください。
  - 各移動手段の所要時間も考慮して、無理のない旅行プランを作成してください。
  - 過度に楽観的な旅行プランは避けてください。
  - Google Mapの経路は、旅行先の経由地のみを含めてください。出発地は含めないでください。
  - Google Mapの出発地と目的地は、旅行先の出発地と目的地のみを含めてください。
  - 検索内容は交通手段、宿泊施設、予算を含みます
  - ユーザーの興味関心を考慮して、旅行プランを作成してください。
  
  # 表示する内容

  - 出発地～目的地への旅行プランであること
  - 旅行プランの概要を100文字程度で簡潔に記載すること
    - 特に以下は考慮された概要にしてください
      - 何泊何日、何人の旅行か
      - 重要視したポイントはどこか
  - テーマがある場合は記載すること（贅沢な旅行や自然を楽しむ旅行など）
  - 各日程ごとに行く場所と時系列を大項目で、詳細な内容（目安の時間）などを小項目で記載すること
  - 日程と日程の間の移動手段は大項目で記載すること
  - そのほか、時間内は難しいがおすすめの観光地・食事があればその他欄として記載すること
  - 各項目を行う上での予算を別の見出しで記載すること
  - お店の紹介をする際は参考URLとして記載する
  
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
