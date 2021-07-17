import React from 'react'
import { Text, Modal } from '@plantswap-libs/uikit'
import styled  from 'styled-components'
import useI18n from 'hooks/useI18n'

interface DepositModalProps {
  tokenName?: string
  onDismiss?: () => void
}

const TextCenter = styled(Text)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
`

const DepositModal: React.FC<DepositModalProps> = ({ onDismiss }) => {
  const TranslateString = useI18n()


  return (
    <Modal title={`${TranslateString(316, 'Buy/Sell $PLANT token via PancakeSwap')}`} onDismiss={onDismiss}>
      <TextCenter>$PLANT Token Contract Address: 0x58BA5Bd8872ec18BD360a9592149daed2fC57c69</TextCenter>
      <br />
      <iframe title="Snapshot Voting" src="https://exchange.pancakeswap.finance/#/swap?inputCurrency=BNB&outputCurrency=0x58BA5Bd8872ec18BD360a9592149daed2fC57c69" width="100%" height="500px"> </iframe>
    </Modal>
  )
}

export default DepositModal
