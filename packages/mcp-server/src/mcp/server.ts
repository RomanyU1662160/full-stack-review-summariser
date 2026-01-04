import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { fetchReviewsTool } from './tools'
import { registerMcpTool } from './utils'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

export const mcpServer = new McpServer({
  name: 'E-commerce MCP Server',
  description: 'MCP server for e-commerce product reviews and summaries',
  version: '1.0.0',
})

registerMcpTool(mcpServer, fetchReviewsTool)

export const startMcpServer = async () => {
  try {
    const transport = new StdioServerTransport()
    await mcpServer.connect(transport)
    // Server is now running - don't log to stdout!
  } catch (error) {
    // Write errors to stderr, not stdout
    process.stderr.write(`Error starting MCP server: ${error}\n`)
    throw error
  }
}
