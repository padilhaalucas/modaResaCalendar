import { ApolloServer } from 'apollo-server'

import { schema } from './schema'

import { prisma } from './context'
import { context } from './context'

const startServer = (): any => {

  const server = new ApolloServer({
    schema, context
  })

  const port = 4000
  server.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

startServer()?.catch((e) => {
  throw e
}).finally(async () => {
  await prisma.$disconnect()
})

