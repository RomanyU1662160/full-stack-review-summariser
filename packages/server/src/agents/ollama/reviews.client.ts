import { Ollama } from 'ollama'
import { OLLAMA_PROMPT } from './prompt'
import type { Review } from '../../../generated/prisma/browser'
import { ReviewsService } from '../../services/reviews.service'
import type { ChatResponse } from 'ollama'

const OllamaClient = new Ollama()

const classifyAndSummarize = async (reviews: Review[]) => {
  const content = {
    numberOfReviews: reviews.length,
    content: reviews.map((r) => r.content).join('\n'),
  }

  const response = await OllamaClient.chat({
    model: 'tinyllama',
    messages: [
      { role: 'system', content: OLLAMA_PROMPT },
      { role: 'user', content: JSON.stringify(content) },
    ],
  })

  // Strip markdown code blocks if present
  const cleanedContent = response.message.content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()

  // Remove any text after the closing brace
  const jsonMatch = cleanedContent.match(/\{[\s\S]*?\}/)
  const jsonString = jsonMatch ? jsonMatch[0] : cleanedContent

  try {
    const parsedResult = JSON.parse(jsonString)
    return parsedResult
  } catch (error) {
    console.error('Failed to parse HG response:', error)
    console.error('Attempted to parse:', jsonString)
    throw new Error('Failed to parse HG response as JSON')
  }
}

export const Ollama_ReviewsAgent = {
  summarizeReviews: async (productId: number): Promise<ChatResponse> => {
    const reviews = await ReviewsService.getReviewsByProductId(productId)

    const result = await classifyAndSummarize(reviews)
    return result
  },
}
