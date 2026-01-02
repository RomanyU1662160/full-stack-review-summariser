import axios from 'axios'
import type { SummaryResponse } from '@/types/summary'

export const AISummaryApi = {
  fetchSummary: async (productId: number) => {
    const result = await axios.get<SummaryResponse>(
      `/api/review-summaries/${productId}`
    )
    return result.data
  },
}
