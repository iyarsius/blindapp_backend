import { createUnlink, unlinkAccount, unlinkEvm } from '@unlink-xyz/sdk'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'

export function createUnlinkClient(mnemonic: string, evmPrivateKey: string) {
  const evmAccount = privateKeyToAccount(evmPrivateKey as `0x${string}`)
  const walletClient = createWalletClient({
    account: evmAccount,
    chain: baseSepolia,
    transport: http(process.env.RPC_URL),
  })
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(process.env.RPC_URL),
  })
  return createUnlink({
    engineUrl: 'https://staging-api.unlink.xyz',
    apiKey: process.env.UNLINK_API_KEY!,
    account: unlinkAccount.fromMnemonic({ mnemonic }),
    evm: unlinkEvm.fromViem({ walletClient, publicClient }),
  })
}
