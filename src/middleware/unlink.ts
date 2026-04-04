import type { MiddlewareHandler } from 'hono'
import { createUnlinkClient } from '../lib/unlink.js'

export type UnlinkVariables = {
  unlink: ReturnType<typeof createUnlinkClient>
}

export const unlinkMiddleware: MiddlewareHandler<{ Variables: UnlinkVariables }> = async (c, next) => {
  const { unlinkMnemonic, evmPrivateKey } = await c.req.json()

  if (!unlinkMnemonic || !evmPrivateKey) {
    return c.json({ error: 'unlinkMnemonic and evmPrivateKey are required' }, 400)
  }

  const unlink = createUnlinkClient(unlinkMnemonic, evmPrivateKey)
  c.set('unlink', unlink)
  await next()
}
