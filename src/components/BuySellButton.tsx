import React from 'react'
import { Button } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const BuySellButton = (props) => {
  const TranslateString = useI18n()

  return (
    <Button onclick="window.location.href='https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x58BA5Bd8872ec18BD360a9592149daed2fC57c69'" {...props}>
      {TranslateString(292, 'Buy PLANT')}
    </Button>
  )
}

export default BuySellButton
