import { Hono } from 'hono'
import { type UnlinkVariables } from '../middleware/unlink.js'

const router = new Hono<{ Variables: UnlinkVariables }>()

// TODO: POST /withdraw
// router.post('/', unlinkMiddleware, async (c) => { ... })

export default router
