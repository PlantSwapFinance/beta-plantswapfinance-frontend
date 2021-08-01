import { useWeb3React } from '@web3-react/core'
import { useEffect, useReducer } from 'react'
import { getPlantswapGardenersContract } from 'utils/contractHelpers'

const plantswapGardenersContract = getPlantswapGardenersContract()

export type NftMap = {
  [key: number]: {
    tokenUri: string
    tokenIds: number[]
  }
}

type Action = { type: 'set_nfts'; data: NftMap } | { type: 'reset' } | { type: 'refresh'; timestamp: number }

type State = {
  isLoading: boolean
  nfts: NftMap
  lastUpdated: number
}

const initialState: State = {
  isLoading: true,
  nfts: {},
  lastUpdated: Date.now(),
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_nfts':
      return {
        ...initialState,
        isLoading: false,
        nfts: action.data,
      }
    case 'refresh':
      return {
        ...initialState,
        lastUpdated: action.timestamp,
      }
    case 'reset':
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

const useGetWalletNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWeb3React()
  const { lastUpdated } = state

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await plantswapGardenersContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndGardenersId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, getGardenerId, tokenURI } = plantswapGardenersContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const gardenerId = await getGardenerId(tokenId).call()
              const tokenUri = await tokenURI(tokenId).call()

              return [Number(gardenerId), Number(tokenId), tokenUri]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndGardenersId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [gardenerId, tokenId, tokenUri] = association

            return {
              ...accum,
              [gardenerId]: {
                tokenUri,
                tokenIds: accum[gardenerId] ? [...accum[gardenerId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, lastUpdated, dispatch])

  const refresh = () => dispatch({ type: 'refresh', timestamp: Date.now() })

  return { ...state, refresh }
}

export default useGetWalletNfts
