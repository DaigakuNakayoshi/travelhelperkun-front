import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/samples/about/')({
  component: Index,
})

function Index() {
  return <div className="p-2">Hello from About!</div>
}
