import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { CustomTool } from '../types'

export const registerMcpTool = <TInput, TOutput>(
  server: McpServer,
  tool: CustomTool<any, any>
) => {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
      outputSchema: tool.outputSchema,
    },
    async (input: any) => await tool.execute(input)
  )
}
