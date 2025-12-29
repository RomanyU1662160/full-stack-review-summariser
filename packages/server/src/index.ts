import express from 'express'
import type { Request, Response } from 'express'
import { healthRouter } from './routes/health'
import { requestLogger, notFoundHandler, errorHandler } from './middleware'

const app = express()
app.use(express.json())
app.use(requestLogger)

const PORT = process.env.PORT || 3000

app.use('/api', healthRouter)

app.all('/', (_req: Request, res: Response) => {
  res.redirect('/api/health')
})

// 404 must be after all routes
app.use(notFoundHandler)

// Error handler must be last
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
