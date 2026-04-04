import { Hono } from 'hono'
import { generateMnemonic } from '@scure/bip39'
import { wordlist as english } from '@scure/bip39/wordlists/english.js'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { createUnlinkClient } from '../lib/unlink.js'

const router = new Hono()

router.post('/', async (c) => {
  const unlinkMnemonic = generateMnemonic(english, 128)
  const evmPrivateKey = generatePrivateKey()
  const evmAddress = privateKeyToAccount(evmPrivateKey).address

  const unlink = createUnlinkClient(unlinkMnemonic, evmPrivateKey)
  await (unlink as any).ensureRegistered()

  return c.json({ unlinkMnemonic, evmPrivateKey, evmAddress })
})

export default router
