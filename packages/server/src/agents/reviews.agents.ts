import { Agent, tool, run } from '@openai/agents'
import { ReviewsService } from '../services/reviews.service'
import { z } from 'zod'
import { logger } from '../utils'
import {
  reviewClassificationResponseSchemaZ,
  reviewSummaryResponseSchemaZ,
} from './types'

const reviewClassificationInstructions = `You are an expert review classifier.
  Given a product reviews provided to you, classify its sentiment.
  Provide a brief reason for the classification for each review and a concise summary of each review, so that it can be used in a product review summary feature.
  After classifying all reviews, hand off the classified reviews to the "Reviews Summarizer Agent" for final summarization.
`
const reviewSummarizationInstructions = `You are an expert review summarizer.
  You will be provided by a classified product reviews from the classifierAgent agent, you task is to generate a concise summary that captures the overall sentiment and key points mentioned in the reviews.
  to help users quickly understand the general opinion about the product. use simple language and be concise. Don't  include specific review details, focus on the overall sentiment and common themes.
`

const tools = tool({
  name: 'fetch_reviews',
  description: 'Fetch reviews from the database.',
  parameters: z.object({ product_id: z.number() }),
  async execute({ product_id }) {
    const reviews = await ReviewsService.getReviewsByProductId(product_id)
    return reviews.slice(0, 20) // Limit to first 20 reviews for processing
  },
})

export const classifierAgent = new Agent({
  name: 'Reviews Classifier Agent',
  instructions: reviewClassificationInstructions,
  tools: [tools],
  outputType: reviewClassificationResponseSchemaZ,
})

export const summarizerAgent = new Agent({
  name: 'Reviews Summarizer Agent',
  instructions: reviewSummarizationInstructions,
  outputType: reviewSummaryResponseSchemaZ,
})

// Using the Agent.create method to ensures type safety for the final output
export const managerAgent = Agent.create({
  name: 'Manager Agent',
  instructions: `You are a manager agent that coordinates review classification and summarization.
    When given a product ID:
    1. Hand off to the "Reviews Classifier Agent" to fetch and classify the reviews
    2. Once classification is complete, hand off the output to the "Reviews Summarizer Agent"
    3. The summarizer will generate the final summary
    Do not do any work yourself - just hand off to the Reviews Classifier Agent to start the process.
    make sure to follow the handoff process carefully, and ensure that the final output is from the Reviews Summarizer Agent.
    `,
  tools: [
    classifierAgent.asTool({
      toolName: 'Reviews Classifier Agent',
      toolDescription: 'Classifies product reviews based on sentiment.',
    }),
    summarizerAgent.asTool({
      toolName: 'Reviews Summarizer Agent',
      toolDescription: 'Summarizes classified product reviews.',
    }),
  ],
  outputType: reviewSummaryResponseSchemaZ,
})

export const ReviewsAgent = {
  classifyReviews: async (productId: number) => {
    const result = await run(
      classifierAgent,
      'Classify reviews for product ID: ' + productId
    )
    return result
  },
  summarizeClassifiedReviews: async (productId: number) => {
    const result = await run(
      managerAgent,
      'Summarize the classified reviews for product ID: ' + productId
    )
    return result
  },
}

managerAgent.on('agent_handoff', (ctx, agent) => {
  logger.info(`Handing off to agent: ${agent.name}`)
  console.log(`Handing off to agent: ${agent.name}`)
  console.log('ctx.usage.totalTokens:::>>>', ctx.usage.totalTokens)
})

managerAgent.on('agent_tool_start', (ctx, tool) => {
  logger.info(`Starting tool: ${tool.name}`)
  console.log(`Starting tool: ${tool.name}`)
  console.log('ctx.usage.totalTokens:::>>>', ctx.usage.totalTokens)
})

managerAgent.on('agent_tool_end', (ctx, tool) => {
  logger.info(`Finished tool: ${tool.name}`)
  console.log(`Finished tool: ${tool.name}`)
  console.log('ctx.usage.totalTokens:::>>>', ctx.usage.totalTokens)
})
