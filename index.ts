import { concurrently } from 'concurrently'

concurrently([
  {
    command: 'bun run dev',
    name: 'server',
    cwd: 'packages/server',
    prefixColor: 'blue',
  },
  // {
  //   command: 'bun run start:mysql',
  //   name: 'mysql',
  //   cwd: 'packages/server',
  //   prefixColor: 'yellow',
  // },
  {
    command: 'bun run dev',
    name: 'client',
    cwd: 'packages/client',
    prefixColor: 'green',
  },
])
