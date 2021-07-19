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
        <Heading size="xl" mb="24px">
            <FlexFull>&nbsp;&nbsp;
          <a href="/verticalGardens">
            {TranslateString(542, 'New Vertical Gardens')}</a>
            </FlexFull>
            <LabelRight>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/verticalGardens">See all Vertical Gardens</a>
            </LabelRight>
        </Heading>
        <FlexLayout>
          {orderBy(finishedVerticalGardens, ['sortOrder']).map((verticalGarden) => (
            <VerticalGardenCard key={verticalGarden.vgId} verticalGarden={verticalGarden} />
          ))}
        </FlexLayout>
      </StyledNewVerticalGardens>
  )
}

const FlexFull = styled.div`
  flex: 1;
`

const LabelRight = styled.div`
align-items: right;
font-size: 14px;
font-weight: bold;
color: ${(props) => props.theme.colors.text};
`

export default NewVerticalGardens