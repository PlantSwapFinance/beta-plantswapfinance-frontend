import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@plantswap-libs/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import Plant from 'components/PLANTsmall'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  platform?: string
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  platform,
  farmImage,
  tokenSymbol,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
    <Image src="/images/platforms/plantswap.png" alt={platform} width={32} height={32} />
      {tokenSymbol === "PLANT" && (<Plant />)}
      {tokenSymbol !== "PLANT" && (<Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} />)}
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
