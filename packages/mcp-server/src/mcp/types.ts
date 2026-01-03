import z from 'zod'

export type CustomTool<
  TInput extends z.ZodTypeAny = z.ZodTypeAny,
  TOutput extends z.ZodTypeAny = z.ZodTypeAny,
> = {
  name: string
  title: string
  description: string
  inputSchema: TInput
  outputSchema: TOutput
  execute: (input: z.infer<TInput>) => Promise<{
    content: Array<{ type: 'text'; text: string }>
    structuredContent?: any
  }>
}
