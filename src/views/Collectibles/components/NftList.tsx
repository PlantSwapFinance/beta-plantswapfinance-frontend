import React, { useCallback, useEffect, useState } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import { useWeb3React } from '@web3-react/core'
import { getGardeningSchoolContract } from 'utils/contractHelpers'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

type State = {
  [key: string]: boolean
}

const gardeningSchoolContract = getGardeningSchoolContract()

const NftList = () => {
  const [claimableNfts, setClaimableNfts] = useState<State>({})
  const { nfts: nftTokenIds, refresh } = useGetWalletNfts()
  const { account } = useWeb3React()
  const { toastError } = useToast()
  
  const fetchClaimableStatuses = useCallback(
    async (walletAddress: string) => {
      try {
        const claimStatuses = (await makeBatchRequest(
          nfts.map((nft) => {
            return gardeningSchoolContract.methods.canClaimSingle(walletAddress, nft.gardenerId).call
          }),
        )) as boolean[]

        setClaimableNfts(
          claimStatuses.reduce((accum, claimStatus, index) => {
            return {
              ...accum,
              [nfts[index].gardenerId]: claimStatus,
            }
          }, {}),
        )
      } catch (error) {
        console.error(error)
        toastError('No claimable NFT') // Error checking NFT claimable status
      }
    },
    [setClaimableNfts, toastError],
  )

  const handleSuccess = () => {
    refresh()
    fetchClaimableStatuses(account)
  }

  useEffect(() => {
    if (account) {
      fetchClaimableStatuses(account)
    }
  }, [account, fetchClaimableStatuses])

  return (
    <NftGrid>
      {orderBy(nfts, 'sortOrder').map((nft) => {
        const tokenIds = nftTokenIds[nft.gardenerId] ? nftTokenIds[nft.gardenerId].tokenIds : []

        return (
          <div key={nft.name}>
            <NftCard nft={nft} canClaim={claimableNfts[nft.gardenerId]} tokenIds={tokenIds} onSuccess={handleSuccess} />
          </div>
        )
      })}
    </NftGrid>
  )
}

export default NftList
