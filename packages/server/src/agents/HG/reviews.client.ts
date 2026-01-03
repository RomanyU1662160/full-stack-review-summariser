import { InferenceClient } from '@huggingface/inference'
import { HG_PROMPT } from './prompt'
import type { Review } from '../../../generated/prisma/client'
import { ReviewsService } from '../../services/reviews.service'

const HG_client = new InferenceClient(process.env.HF_TOKEN)

export const classifyAndSummarize = async (reviews: Review[]) => {
  const content = {
    numberOfReviews: reviews.length,
    content: reviews.map((r) => r.content).join('\n'),
  }

  const chatCompletion = await HG_client.chatCompletion({
    model: 'Avik08/llama-3.2-1b-instruct-app-reviews:featherless-ai',
    messages: [
      { role: 'system', content: HG_PROMPT },
      {
        role: 'user',
        content: JSON.stringify(content),
      },
    ],
  })

  console.log('Raw HG Response:', JSON.stringify(chatCompletion, null, 2))

  // Extract the response content
  const responseContent = chatCompletion.choices[0]?.message?.content || ''

  // Strip markdown code blocks if present
  const cleanedContent = responseContent
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

export const HG_ReviewsAgent = {
  summarizeReviews: async (productId: number) => {
    const reviews = await ReviewsService.getReviewsByProductId(productId)
    const result = await classifyAndSummarize(reviews)
    return result
  },
}
