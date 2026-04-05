import { Hono } from 'hono'
import { unlinkMiddleware, type UnlinkVariables } from '../middleware/unlink.js'

const router = new Hono<{ Variables: UnlinkVariables }>()

router.post('/', unlinkMiddleware, async (c) => {
  const body = await c.req.json()
  const limit = body.limit ?? 20
  const unlink = c.get('unlink')

  const { transactions } = await unlink.getTransactions({ limit })
  return c.json({ transactions })
})

export default router
