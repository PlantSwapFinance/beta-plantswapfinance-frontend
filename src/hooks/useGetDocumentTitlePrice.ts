import { useEffect } from 'react'
import { usePriceCakeBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const plantPriceUsd = usePriceCakeBusd()

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
