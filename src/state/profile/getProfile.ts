import Cookies from 'js-cookie'
import { getProfileContract, getPlantswapGardenersContract } from 'utils/contractHelpers'
import { Nft } from 'config/constants/types'
import { Profile } from 'state/types'
import { getTeam } from 'state/teams/helpers'
import nfts from 'config/constants/nfts'
import { transformProfileResponse } from './helpers'

const profileContract = getProfileContract()
const gardenersContract = getPlantswapGardenersContract()

export interface GetProfileResponse {
  hasRegistered: boolean
  profile?: Profile
}

const getUsername = async (address: string): Promise<string> => {
  const username = address
  return username
}

const getProfile = async (address: string): Promise<GetProfileResponse> => {
  try {
    const hasRegistered = (await profileContract.methods.hasRegistered(address).call()) as boolean

    if (!hasRegistered) {
      return { hasRegistered, profile: null }
    }

    const profileResponse = await profileContract.methods.getUserProfile(address).call()
    const { userId, points, teamId, tokenId, accountTypeId, nftAddress, isActive } = transformProfileResponse(profileResponse)
    const team = await getTeam(teamId)
    const username = await getUsername(address)

    // If the profile is not active the tokenId returns 0, which is still a valid token id
    // so only fetch the nft data if active
    let nft: Nft
    if (isActive) {
      const gardenerId = await gardenersContract.methods.getGardenerId(tokenId).call()
      nft = nfts.find((nftItem) => nftItem.gardenerId === Number(gardenerId))

      // Save the preview image in a cookie so it can be used on the exchange
      Cookies.set(
        `profile_${address}`,
        {
          username,
          avatar: `https://plantswap.finance/images/nfts/${nft.images.sm}`,
        },
        { domain: 'plantswap.finance', secure: true, expires: 30 },
      )
    }

    const profile = {
      userId,
      points,
      teamId,
      tokenId,
      accountTypeId,
      username,
      nftAddress,
      isActive,
      nft,
      team,
    } as Profile

    return { hasRegistered, profile }
  } catch (error) {
    return null
  }
}

export default getProfile
