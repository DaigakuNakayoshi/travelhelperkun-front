import { agent } from '@/langchain/gemini'
import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/samples/agent/')({
  component: GeminiPage,
})

type Plan = {
  title: string
  description: string
  steps: string[]
}

function GeminiPage() {
  const [input, setInput] = useState('おすすめの旅行プラン')
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const result = await agent.invoke({ input: input })
      setPlan(result?.plan)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box p={4}>
      <Input
        placeholder="旅行のアイデアを入力してください"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        mb={4}
      />
      <Button type="button" onClick={handleClick} disabled={isLoading}>
        旅行プランを作成
      </Button>
      <Box mt={4}>
        {isLoading ? <Spinner /> : plan ? <Plan plan={plan} /> : null}
      </Box>
    </Box>
  )
}

function Plan({ plan }: { plan: Plan }) {
  return (
    <Box>
      <Text fontWeight="bold">{plan.title}</Text>
      <Text>{plan.description}</Text>
      <Box mt={2}>
        {plan.steps.map((step: string) => (
          <Text key={step}>{step}</Text>
        ))}
      </Box>
    </Box>
  )
}
