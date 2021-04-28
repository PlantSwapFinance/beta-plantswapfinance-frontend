import { useEffect } from 'react'
import { usePricePlantBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const plantPriceUsd = usePricePlantBusd()

  const plantPriceUsdString = plantPriceUsd.eq(0)
    ? ''
    : ` - $${plantPriceUsd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`

  useEffect(() => {
    document.title = `PlantSwap${plantPriceUsdString}`
  }, [plantPriceUsdString])
}
export default useGetDocumentTitlePrice
