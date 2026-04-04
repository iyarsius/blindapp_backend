import { Hono } from 'hono'
import { createPublicClient, http, erc20Abi } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import { createUnlinkClient } from '../lib/unlink.js'

const TOKEN = '0x7501de8ea37a21e20e6e65947d2ecab0e9f061a7'

const router = new Hono()

router.post('/address', async (c) => {
  const { unlinkMnemonic, evmPrivateKey } = await c.req.json()
  const unlink = createUnlinkClient(unlinkMnemonic, evmPrivateKey)
  console.log("unlink: ", unlink)
  const address = await unlink.getAddress()
  return c.json({ address })
})

router.post('/unlink', async (c) => {
  const { unlinkMnemonic, evmPrivateKey } = await c.req.json()
  const unlink = createUnlinkClient(unlinkMnemonic, evmPrivateKey)
  const { balances } = await unlink.getBalances()
  return c.json({ balances })
})

router.post('/public', async (c) => {
  const { evmPrivateKey } = await c.req.json()
  const account = privateKeyToAccount(evmPrivateKey as `0x${string}`)

  console.log(account)

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(process.env.RPC_URL),
  })

  const amount = await publicClient.readContract({
    address: TOKEN,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [account.address],
  })

  return c.json({
    address: account.address,
    token: TOKEN,
    amount: amount.toString(),
  })
})

export default router
