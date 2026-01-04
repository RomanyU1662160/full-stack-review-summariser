// import 'dotenv/config'
import { startMcpServer } from './mcp/server'

startMcpServer(4000).catch((error) => {
  console.error('Failed to start MCP server:', error)
})
