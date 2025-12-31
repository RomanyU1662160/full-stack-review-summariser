import OpenAI from 'openai'
import {
  reviewClassificationSchemaZ,
  reviewSummaryResponseSchemaZ,
} from '../agents/types'
import { zodTextFormat } from 'openai/helpers/zod'
import type { Review } from '../../generated/prisma/client'
// import { ReviewsService } from '../services/reviews.service'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5-nano'

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// const tools = [
//   {
//     type: 'function',
//     name: 'get_product_reviews',
//     description: 'Fetches product reviews from the database.',
//     parameters: {
//       type: 'object',
//       properties: {
//         product_id: {
//           type: 'number',
//           description: 'The ID of the product to fetch reviews for.',
//         },
//       },
//       required: ['product_id'],
//     },

//   },
// ]

// function get_product_reviews(args: { product_id: number }) {
//   return ReviewsService.getReviewsByProductId(args.product_id)
// }

const reviewClassificationInstruction = `You are an expert review classifier.
  Given a product reviews provided to you, classify its sentiment.
  Provide a brief reason for the classification for each review and a concise summary of the review, so that it can be used in a product review summary feature.
  Respond in the specified format.
`

export const openAIClient = {
  getClient: () => {
    return client
  },
  processReviewsClassification: async (
    reviews: Review[]
  ): Promise<OpenAI.Responses.Response> => {
    const response = await client.responses.create({
      model: OPENAI_MODEL,
      input: [
        { role: 'user', content: reviews.map((r) => r.content).join('\n\n') },
      ],
      store: true,
      instructions:
        'Classify the sentiment of the review as positive, negative, or neutral and provide a brief reason for the classification.',
      text: {
        format: zodTextFormat(
          reviewClassificationSchemaZ,
          'reviews_classification'
        ),
      },
    })
    return response
  },
  //   processReviewsClassification2: async (
  //     prompt: string
  //   ): Promise<ReviewSummaryResponseSchema> => {
  //     const completion = await client.chat.completions.parse({
  //       model: OPENAI_MODEL,
  //       messages: [{ role: 'user', content: prompt }],
  //       store: true,
  //       instruction:
  //         'Classify the sentiment of the review as positive, negative, or neutral and provide a brief reason for the classification.',
  //       response_format: zodResponseFormat(
  //         reviewSummaryResponseSchemaZ,
  //         'review_summary'
  //       ),
  //     })
  //     return completion.choices[0]?.message.parsed as ReviewSummaryResponseSchema
  //   },
  //   processMessageAsStream: async (
  //     prompt: string,
  //     lastResponseId: string
  //   ): Promise<ReadableStream> => {
  //     const stream = await client.responses.create({
  //       model: OPENAI_MODEL,
  //       previous_response_id: lastResponseId,
  //       input: [{ role: 'user', content: prompt }],
  //       store: true,
  //       stream: true,
  //     })
  //     console.log('stream:::>>>', stream)
  //     const readableStream = stream.toReadableStream()
  //     console.log('readableStream:::>>>', readableStream)
  //     readableStream
  //       .getReader()
  //       .read()
  //       .then(({ done, value }) => {
  //         console.log('stream chunk:::>>>', { done, value })
  //       })
  //     return readableStream
  //   },
}
