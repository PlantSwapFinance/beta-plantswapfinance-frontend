import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberPlantToReactivate: new BigNumber(0),
    numberPlantToRegister: new BigNumber(0),
    numberPlantToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberPlantToReactivate, numberPlantToRegister, numberPlantToUpdate] = await makeBatchRequest([
          profileContract.methods.numberPlantToReactivate().call,
          profileContract.methods.numberPlantToRegister().call,
          profileContract.methods.numberPlantToUpdate().call,
        ])

        setCosts({
          numberPlantToReactivate: new BigNumber(numberPlantToReactivate as string),
          numberPlantToRegister: new BigNumber(numberPlantToRegister as string),
          numberPlantToUpdate: new BigNumber(numberPlantToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve PLANT costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
