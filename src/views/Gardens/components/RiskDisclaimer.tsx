import React, { useState } from 'react'
import {
  Text,
  Button,
  Flex,
  InjectedModalProps,
  Checkbox,
  Heading,
  Box,
  Modal, 
} from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

interface RiskDisclaimerProps extends InjectedModalProps {
  onSuccess: () => void
}

const RiskDisclaimer: React.FC<RiskDisclaimerProps> = ({ onSuccess, onDismiss }) => {
  const [acknowledgeRisk, setAcknowledgeRisk] = useState(false)
  const [acknowledgeBeta, setAcknowledgeBeta] = useState(false)
  const TranslateString = useI18n()

  const handleSetAcknowledgeRisk = () => {
    setAcknowledgeRisk(!acknowledgeRisk)
  }

  const handleSetAcknowledgeBeta = () => {
    setAcknowledgeBeta(!acknowledgeBeta)
  }

  const handleConfirm = () => {
    onSuccess()
    onDismiss()
  }

  return (
    <Modal title={TranslateString(999, 'Welcome to the Farm!')} minWidth="320px">
          <Heading size="lg">{TranslateString(556, "Let's start with a disclaimer")}
          <br /></Heading>
        <Box maxHeight="300px" overflowY="auto">
          <Heading as="h3" mb="24px">
          <br />
            {TranslateString(999, "Thank you for helping the planet!.")}
          </Heading>

          <Text as="p" color="textSubtle" mb="24px">
            {TranslateString(999, "The development team behind this project want to make sure that anyone that enter a position/stake capital on this platform is fully aware that as much as we want to see this project succeed and will keep working at it no matter the obstacles that come along the way, this remain a 'dev in prod' type of project as many in the DeFi space. Furthermore, the core mission of the project is to help and donate to nonprofits that help protect the earth, plant trees and other ecological causes. So we don't consider this project as a 'get rich quick scheme', and we don't advise anyone to invest any amount they don't feel comfortable losing, or in this case going to an ecological foundation.")}
          </Text>

          <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <div style={{ flex: 'none' }}>
                <Checkbox id="checkbox" scale="sm" checked={acknowledgeRisk} onChange={handleSetAcknowledgeRisk} />
              </div>
              <Text ml="8px">
                {TranslateString(
                  999,
                  'I understand that I am using this product at my own risk. Any losses incurred due to my actions are my own responsibility.',
                )}
              </Text>
            </Flex>
          </label>
          <label htmlFor="checkbox1" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <div style={{ flex: 'none' }}>
                <Checkbox id="checkbox1" scale="sm" checked={acknowledgeBeta} onChange={handleSetAcknowledgeBeta} />
              </div>
              <Text ml="8px">
                {TranslateString(
                  999,
                  'I understand that this product is still in beta. I am participating at my own risk',
                )}
              </Text>
            </Flex>
          </label>
        </Box>
        <Button width="100%" onClick={handleConfirm} disabled={!acknowledgeRisk || !acknowledgeBeta}>
          {TranslateString(999, 'Continue')}
        </Button>
    </Modal>
  )
}

export default RiskDisclaimer