import React, { useMemo  } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading } from '@plantswap-libs/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import { useVerticalGardens } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import VerticalGardenCard from './VerticalGardenCard'

const StyledNewVerticalGardens = styled.div`
  min-height: 250px;
`

const NewVerticalGardens = () => {
  const { account } = useWeb3React()
  const verticalGardens = useVerticalGardens(account)
  const TranslateString = useI18n()
  
  const [finishedVerticalGardens] = useMemo(
    () => partition(verticalGardens, (verticalGarden) => verticalGarden.displayOnHomePage),
    [verticalGardens],
  )
  return (
      <StyledNewVerticalGardens>
        <Heading size="xl" mb="24px">&nbsp;&nbsp;
            {TranslateString(542, 'New Vertical Gardens')}
        </Heading>
        <FlexLayout>
          {orderBy(finishedVerticalGardens, ['sortOrder']).map((verticalGarden) => (
            <VerticalGardenCard key={verticalGarden.vgId} verticalGarden={verticalGarden} />
          ))}
        </FlexLayout>
      </StyledNewVerticalGardens>
  )
}

export default NewVerticalGardens